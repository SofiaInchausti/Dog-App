const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors=require('cors')
const server = express();

server.name = 'API';
server.use(express.json())
server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ extended: true, limit: '50mb' }))


server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

//SI NO AGREGO ESTAS COSAS DEPENDE EL BROWSER VA A TIRAR ERRO
server.use(cors(
  {
    origin:'*',
    methods:['GET','POST'],
    allowedHeaders:['Content-Type','Authorization']
  }
))

server.use('/', routes);

//CONTROL CENTRALIZADO DE ERRORES
// Error catching endware.
server.use((err, req, res) => { // eslint-disable-line no-unused-vars
  var error = {}
  error.msg = err.msg || err
  error.status = err.status || 500;
  res.status.send(error)
  // //500 error servidor
  
  // const status = err.status || 500;
  // const message = err.message || err;
  // console.error("soy errro");
  // // res.status(status).send(message);
});

// var error = {}
//     error.msg = err.msg || err
//     error.status = err.status || 500;
//     res.send(error.msg)
// });
module.exports = server;
