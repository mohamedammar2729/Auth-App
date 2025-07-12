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

const setAuthToken = async (id: string, email: string, res: Response) => {
  try {
    const accessToken = generateJWTToken(id, email, 'access');
    const refreshToken = generateJWTToken(id, email, 'refresh');
    // we will now store these tokens un redis then send them to the client
    //Note: refresh token should be encrypted before storing
    await saveRefreshTokenToRedis(refreshToken);
  } catch (error) {
    console.error('Error setting auth token:', error);
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
    console.log('Query result (user created):', result);

    return res.status(201).json({
      message: 'User created successfully',
      user: result,
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
