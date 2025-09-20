// test.js
const axios = require('axios');

axios.get('https://api.github.com')
  .then(response => console.log(response.status))
  .catch(error => console.error(error));
