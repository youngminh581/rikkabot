const Express = require('express');
const server = Express();


server.all('/', (req,res) => {
  res.send('Rikka is working');
});

const keepAlive = () => {
  server.listen(3000,() => {
    console.log('WORKING');
  })
}

module.exports = keepAlive;