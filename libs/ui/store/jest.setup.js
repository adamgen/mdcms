// TODO install axios
const axios = require('axios');

export default async function () {
  let res;
  while (res?.data.message !== 'Welcome to file-server!') {
    try {
      res = await axios('http://localhost:4200/api');
    } catch (e) {
      // TODO make single prompt instead of the infinite messages
      console.log('\n\ncant connect, make sure to run the server first.');
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}
