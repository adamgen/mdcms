import * as express from 'express';
import { filesRouter } from './filesRouter';

const app = express();

app.use(express.json());

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to file-server!' });
});

app.use('/api/files', filesRouter);

export { app };
