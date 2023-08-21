import { NextFunction, Request, Response } from 'express';
import { TokenService } from '../service/token.service.js';
import { UnauthorizedError } from '../errors/ApiError.js';

const tokenService = new TokenService();

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(UnauthorizedError());
    }

    const userData = tokenService.validateToken(accessToken);
    if (!userData) {
      return next(UnauthorizedError());
    }

    next();
  } catch (e) {
    return next(UnauthorizedError());
  }
};

export { AuthMiddleware };
