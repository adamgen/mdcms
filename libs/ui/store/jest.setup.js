const fetch = require('node-fetch');
const logUpdate = require('log-update');

process.env['BASE_URL'] = 'http://localhost:4200/api';

const frames = ['-', '\\', '|', '/'];
let index = 0;

export default async function () {
  let res;
  // These 2 lines make the spinner not delete nx's message
  console.log('');
  logUpdate.done();
  while (res?.message !== 'Welcome to file-server!') {
    try {
      res = await fetch('http://localhost:4200/api').then((response) =>
        response.json()
      );
    } catch (e) {
      const frame = frames[(index = ++index % frames.length)];

      logUpdate(`

      ${frame} cant connect, make sure to run the server first...

      `);

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    logUpdate.clear();
  }
}
