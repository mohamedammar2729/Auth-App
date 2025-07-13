import { NextFunction, Request, Response } from 'express';
import { validateRefreshToken } from '../utils/helpers';

export const validateAuthTokens = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //@ts-ignore
    const [_, refresh] = req!.headers!.authorization?.split(' ,');

    const refreshToken = refresh.split('=')[1];

    const decryptedRefreshToken = await validateRefreshToken(refreshToken);

    if (!decryptedRefreshToken) {
      console.log('Data not decrypted properly');
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.locals.jwtData = decryptedRefreshToken;
    return next();
  } catch (error) {
    console.log(error);
    return res.json({ message: 'Something went wrong' });
  }
};
