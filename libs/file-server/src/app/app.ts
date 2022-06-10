import * as express from 'express';
import { filesRouter } from './filesRouter';
import { FileController } from './FileController';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.api = new FileController();
  next();
});

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to file-server!' });
});

app.use('/api/files', filesRouter);

export { app };
