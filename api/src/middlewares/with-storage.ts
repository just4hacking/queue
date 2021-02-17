import { Request, Response, NextFunction } from 'express';
import { Storage, TextItem, storage } from '../storage'

declare global {
  namespace Express {
    interface Request {
      storage?: Storage<TextItem>;
    }
  }
}

export const withStorage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.storage = storage
  next();
};
