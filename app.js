const config = require('./config');
const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes');
const port = config.PORT;
const ip = config.ADDRESS;
const cookieParser = require('cookie-parser');

const publicPath = path.join(__dirname, 'public')

app.use(express.json());
app.use(express.static(publicPath))
app.use('/assets', express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());

app.use('/api', routes);

app.get('/*', (req, res)=>{
  res.sendFile(path.resolve('src','public', 'index.html'));//aqui
})



app.listen(port, () => {
  console.log(`Servidor rodando em http://${ip}:${port}`);
});