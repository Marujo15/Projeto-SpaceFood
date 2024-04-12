const config = require('./config');
const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes');
const port = config.PORT;
const cookieParser = require('cookie-parser');

app.use(express.json());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', (req, res) => {
  res.clearCookie('session_id');
  res.sendFile(path.join(__dirname, 'public/login/index.html'));
});

app.get('/register', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/register/index.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/home/index.html'));
});

// Rota padrão para a página inicial
app.get('/', function(req, res) {
  res.redirect("/login");
});

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://45.63.13.91:${port}`);
});