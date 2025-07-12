import { Request, Response } from 'express';
import { GET_USER_BY_EMAIL, GET_USER_BY_ID } from '../mysql/queries';
import { pool } from '../mysql/connection';
import { INSERT_USER_STATEMENT } from '../mysql/mutations';
import bcrypt from 'bcrypt';
import {
  generateJWTToken,
  saveRefreshTokenToRedis,
} from '../token/jwt-token-manager';
import { encryptData } from '../encryption';

const getUserBy = async (by: 'email' | 'id', value: string) => {
  try {
    const connection = await pool.getConnection();
    const result = await connection.query(
      by === 'email' ? GET_USER_BY_EMAIL : GET_USER_BY_ID,
      [value]
    );
    //@ts-ignore
    const user = result[0][0];
    console.log('user retrieved:', user);
    return user;
  } catch (error) {
    console.error('Error retrieving user by:', error);
    throw error;
  }
};

const setCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string
) => {
  res.clearCookie('accessToken', {
    domain: 'localhost',
    httpOnly: true,
    path: '/',
  }); // Clear existing access token cookie
  res.clearCookie('refreshToken', {
    domain: 'localhost',
    httpOnly: true,
    path: '/',
  }); // Clear existing refresh token cookie
  const expiryAccessToken = new Date(new Date().getTime() + 60 * 60 * 1000); // 1 hour
  const expiryRefreshToken = new Date(
    new Date().getTime() + 7 * 24 * 60 * 60 * 1000
  ); // 7 days
  res.cookie('access-token', accessToken, {
    domain: 'localhost',
    httpOnly: true,
    path: '/',
    expires: expiryAccessToken,
    sameSite: 'lax',
  }); // Set new access token cookie

  res.cookie('refresh-token', refreshToken, {
    domain: 'localhost',
    httpOnly: true,
    path: '/',
    expires: expiryRefreshToken,
    sameSite: 'lax',
  }); // Set new refresh token cookie

  console.log('Cookies set successfully');
  return;
};

const setAuthToken = async (id: string, email: string, res: Response) => {
  try {
    const accessToken = generateJWTToken(id, email, 'access');
    const refreshToken = generateJWTToken(id, email, 'refresh');
    // we will now store these tokens un redis then send them to the client
    //Note: refresh token should be encrypted before storing
    const encryptedToken = encryptData(refreshToken);
    await saveRefreshTokenToRedis(refreshToken, encryptedToken);
    setCookies(res, accessToken, encryptedToken); // Set cookies in the response
  } catch (error) {
    console.error('Error setting auth tokens:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    if (!userId || isNaN(Number(userId))) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    const user = await getUserBy('id', userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({
      message: 'User retrieved successfully',
      user,
    });
  } catch (error) {
    console.error('Error retrieving user:', error);
    return res.status(500).json({
      error: 'An error occurred while retrieving the user',
    });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(422)
        .json({ error: 'Name, email, and password are required' });
    }
    const user = await getUserBy('email', email);
    if (user) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const connection = await pool.getConnection();
    const result = await connection.query(INSERT_USER_STATEMENT, [
      name,
      email,
      hashedPassword,
    ]);
    //@ts-ignore
    const insertId = result[0].insertId as number;
    await setAuthToken(String(insertId), email, res); // Set auth tokens and cookies

    return res.status(201).json({
      message: 'User created successfully',
      user: result[0],
    });
  } catch (error) {
    console.error('Error retrieving user:', error);
    return res.status(500).json({
      error: 'An error occurred while retrieving the user',
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(422)
        .json({ error: 'email, and password are required' });
    }

    const user = await getUserBy('email', email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    // Set Token or session here if needed
    await setAuthToken(String(user.id), email, res); // Set auth tokens and cookies
    return res.status(200).json({
      message: 'Login successful',
      user,
    });
  } catch (error) {
    console.error('Error retrieving user:', error);
    return res.status(500).json({
      error: 'An error occurred while retrieving the user',
    });
  }
};
