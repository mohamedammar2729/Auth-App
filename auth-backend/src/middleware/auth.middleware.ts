import { Request, Response } from 'express';
import { validateAccessToken, validateRefreshToken } from '../utils/helpers';
import {
  generateJWTToken,
  saveRefreshTokenToRedis,
} from '../token/jwt-token-manager';
import { encryptData } from '../encryption';
import { setCookies } from '../handlers/user-handler';


export const validateAuthMiddleware = async (req: Request, res: Response) => {
  const [access, refresh] = req!.headers!.authorization!.split(' ,');
  const accessToken = access && access.split('=')[1];
  console.log('Access token:', accessToken);
  const refreshToken = refresh.split('=')[1];
console.log('Refresh token:', refreshToken);

  const isAccessTokenValid = await validateAccessToken(accessToken);
  console.log('Access valid');

  const decodedRefreshToken = await validateRefreshToken(refreshToken);
  console.log('Refresh valid');

  if (isAccessTokenValid && decodedRefreshToken) {
    console.log('Access token, refresh tokens are valid.');
    return res.status(200).json({ message: 'Authorized', success: true });
  } else if (!isAccessTokenValid && decodedRefreshToken) {
    // regenerate new token
    const newAccessToken = generateJWTToken(
      decodedRefreshToken!.id!,
      decodedRefreshToken.email!,
      'access'
    );

    const newRefreshToken = generateJWTToken(
      decodedRefreshToken!.id!,
      decodedRefreshToken.email!,
      'refresh'
    );
    const newEcncryptedRefreshToken = encryptData(newRefreshToken);

    await saveRefreshTokenToRedis(newRefreshToken, newEcncryptedRefreshToken);

    setCookies(newAccessToken, newEcncryptedRefreshToken, res);

    return res.status(200).json({ message: 'Authorized', success: true });
  } else {
    res.status(401).json({ message: 'Not Authorized', success: false });
  }
};
