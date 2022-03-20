import { app } from './app/app';
import { environment } from './environments/environment';

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  if (!environment.production) {
    console.log(`Listening at http://localhost:${port}/api`);
  }
});
server.on('error', console.error);
