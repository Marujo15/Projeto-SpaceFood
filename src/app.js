const config = require('./config');
const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes');
const port = config.PORT;
const cookieParser = require('cookie-parser');
const cors = require('cors');

const corsOptions = {
  origin: `http://192.168.0.9:${port}`,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", `http://localhost:${port}`);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

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
  console.log(`Servidor rodando em http://192.168.0.9:${port}`);
});