import jwt from 'jsonwebtoken';
import { setCache } from '../redis/actions';
import { generateRedisKey, generateTTL } from '../utils/helpers';
import { encryptData } from '../encryption';

export const generateJWTToken = (
  id: string,
  email: string,
  tokenType: 'access' | 'refresh'
) => {
  const token = jwt.sign({ id, email }, process.env.JWT_SECRET_KEY!, {
    expiresIn: tokenType === 'access' ? '15m' : '7d',
  });
  return token;
};

export const saveRefreshTokenToRedis = async (refreshToken: string) => {
  try {
    const decodedData = jwt.decode(refreshToken, { json: true });
    if (!decodedData) {
      throw new Error('Invalid refresh token, unable to decode token');
    }

    const key = generateRedisKey(decodedData.id);
    const ttl = generateTTL(decodedData.exp!);
    await setCache(key, encryptData(refreshToken), ttl); // Set cache with 7 days expiration
    console.log(`Refresh token saved to Redis for user ID: ${decodedData.id}`);

  } catch (error) {
    console.error('Error saving refresh token to Redis:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};
