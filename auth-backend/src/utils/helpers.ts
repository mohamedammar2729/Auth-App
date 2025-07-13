import { decryptData } from '../encryption';
import { getCache } from '../redis/actions';
import { verifyAndDecode } from '../token/jwt-token-manager';

type TokenInfo = {
  id: string;
  email: string;
  exp: number;
  iat: number;
};

export const generateRedisKey = (userId: string) => {
  return 'user-' + userId;
};

export const generateTTL = (tokenExp: number) => {
  const currentTime = Math.floor(Date.now() / 1000);
  const secondsToExpire = tokenExp - currentTime;
  return secondsToExpire > 0 ? secondsToExpire : 0;
};

export const validateAccessToken = async (token: string) => {
  try {
    const decryptedData = await verifyAndDecode(token);
    if (decryptedData) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log('Unable to validate access token');
    console.log(error);
    return false;
  }
};

export const validateRefreshToken = async (encryptedToken: string) => {
  try {
    const jwtToken = decryptData(encryptedToken);
    const decodedJwtData = (await verifyAndDecode(
      jwtToken
    )) as TokenInfo | null;
    if (!decodedJwtData) {
      console.log('User token not valid');
      return false;
    }
    // get the encrypted token from Redis cache
    const encryptedTokenFromCache = await getCache(
      generateRedisKey(decodedJwtData.id)
    );

    if (!encryptedTokenFromCache) {
      console.log('Token not found in memory.');
      return false;
    }
    // then decrypt the token from cache
    const decryptedTokenFromCache = decryptData(encryptedTokenFromCache);
    // finally verify the decrypted token from cache
    const decodedJwtDataFromCache = (await verifyAndDecode(
      decryptedTokenFromCache
    )) as TokenInfo | null;

    if (
      encryptedToken !== encryptedTokenFromCache ||
      decryptedTokenFromCache !== jwtToken
    ) {
      console.log('Token malfunctioned');
      return false;
    }
    // check if the token is expired
    const ttl = generateTTL(decodedJwtDataFromCache!.exp);
    if (ttl <= 0) {
      console.log('token is expired in memory');
      return false;
    }

    return { ...decodedJwtDataFromCache };
  } catch (error) {
    console.log('unexpected error during refresh token validation', error);
    return false;
  }
};
