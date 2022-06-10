/* eslint-disable @typescript-eslint/no-unused-vars */
// import { Express } from 'express';
import { FileController } from './app/FileController';

declare global {
  namespace Express {
    interface Request {
      api: FileController;
    }
  }
}
