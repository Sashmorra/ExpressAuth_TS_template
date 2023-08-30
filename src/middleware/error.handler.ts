import { Request, Response } from 'express';
import { ApiError } from '../errors/ApiError.js';
const ErrorHandler = (err: unknown, req: Request, res: Response) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(err);
  }
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: 'Непредвиденная ошибка' });
};

export default ErrorHandler;
