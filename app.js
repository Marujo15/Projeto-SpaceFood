const config = require('./src/config');
const express = require('express');
const path = require('path');
const app = express();
const routes = require('./src/routes');
const port = config.PORT;
const ip = config.ADDRESS;
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));

app.use('/api', routes);

app.get('/*', (req, res) => {
  res.sendFile(path.resolve('public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://${ip}:${port}`);
});