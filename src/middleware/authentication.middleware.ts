import { Request, Response, NextFunction } from 'express';
import userRepo from '../repositories/user.repository';

export const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.headers['x-user-id'] as string;

  if (!userId) {
    return res.status(401).json({
      data: null,
      error: {
        message: 'Header x-user-id is missing or no user with such id'
      }
    });
  }

  const user = userRepo.findById(userId);
  if (!user) {
    return res.status(401).json({
      data: null,
      error: {
        message: 'Header x-user-id is missing or no user with such id'
      }
    });
  }

  req['userId'] = userId
  next();
};


export const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Ooops, something went wrong';

  console.error(`[${ new Date().toISOString() }] ${ err.stack || err }`);

  return res.status(statusCode).json({
    data: null,
    error: {
      message: message
    }
  });
};
