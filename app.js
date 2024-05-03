const config = require('./src/config');
const express = require('express');
const app = express();
const routes = require('./src/routes');
const port = config.PORT;
const ip = config.ADDRESS;
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://${ip}:${port}`);
});