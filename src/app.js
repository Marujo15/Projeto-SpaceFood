const config = require('./config');
const express = require('express');
const app = express();
const port = config.PORT;
const cookieParser = require('cookie-parser');

app.use(express.json());

app.use(cookieParser());

const routes = require('./routes');
app.use('/api', routes);

app.use('/login', function (req, res, next) {
  res.clearCookie('session_id');
  next();
}, routes);

app.use('/home', function (req, res, next) {
  if (req.cookies.session_id) {
    next();
  } else {
    res.redirect('/');
  }
}, routes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://45.63.13.91:${port}`);
});