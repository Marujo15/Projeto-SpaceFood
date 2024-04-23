const config = require('./config');
const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes');
const port = config.PORT;
const ip = config.ADDRESS;
const cookieParser = require('cookie-parser');
const loginPage = require('./public/login');
const registerPage = require('./public/register');
const homePage = require('./public/home');

app.use(express.json());
app.use('/static', express.static(path.resolve(__dirname, 'public', 'static')))
app.use('/assets', express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());

app.get('/', loginPage)
app.get('/login', loginPage)
app.get('/register', registerPage)
app.get('/home', homePage)

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://${ip}:${port}`);
});