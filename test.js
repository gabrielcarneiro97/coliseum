const axios = require('axios');

axios.get('http://localhost:8080/Test')
  .then(res => console.log(res))
  .catch((err) => {
    throw err;
  });

axios.delete('http://localhost:8080/Test')
  .then(res => console.log(res))
  .catch((err) => {
    throw err;
  });

axios.put('http://localhost:8080/Test')
  .then(res => console.log(res))
  .catch((err) => {
    throw err;
  });

axios.post('http://localhost:8080/Test')
  .then(res => console.log(res))
  .catch((err) => {
    throw err;
  });
