//Mediante express creamos un servidor.
import express, { Application, Request, Response, NextFunction} from 'express';
import sha256 from 'crypto-js/sha256';
import LeonChain from './model/leonchain';
import Block from './model/Block';
import socket from 'socket.io';
import bodyParser from 'body-parser';

const cors = require('cors')


/**
 * @typedef {PORT} PORT El puerto que escuchará el servidor. Se pone un OR porque para que en el caso en que se esté en el modo desarrollo, escuchará el puerto 5000, pero en producción escuchará el puerto correspondiente.
 */
const PORT = process.env.PORT || 5000;


/**
 * Archivo en el que inicializamos el servidor con todas las dependencias necesarias. 
 * @file
 */

/**
 * Constante global en la que se crea el servidor Express.
 * @typedef {Application} 
 */
const app: Application = express();

/**
 * El body parser que nos sirve para poder convertir los datos de la api en formato JSON
 * @typedef {middleware} Bodyparser
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())


/**
 * Variable que consiste en la inicialización del blockchain.
 * @typedef {LeonChain} 
 */
const leonChain = new LeonChain();

//Creación del genesis block
leonChain.creationGenesisBlock();



/**
 * Inicializamos el servidor
 * @typedef {server}
 */
const server = app.listen(PORT, () => {
    console.log("Server running")
})

/**
 * Inicializamos el socket io del servidor el cual nos permitirá comunicación en tiempo real con el cliente
 * @typedef {socket}
 */
const io = socket(server);

io.on('connection', (socket) => { 
    console.log("new connection");
})

/**
 * Las rutas y las diferentes funcionalidades de la API
 * @module Rutas
 * @requires express
 */

/**
 * Ruta que devuelve el blockchain en su totalidad
 * @name /
 * @function
 */
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send(leonChain.chain);
}); 


/**
 * Ruta del tipo POST en la cual enviamos una transacción a través del body para que se añadida a las transacciones pendientes y que posteriormente será añadida a un bloque
 * 
 * @name /transaction
 * @function
 * @param {string} hospital Se envía a través del body
 * @param {string} country Se envía a través del body
 * @param {string} patientInfo Se envía a través del body
 * @param {string} symptoms Se envía a través del body
 */
app.post('/transaction', (req, res) => {
    const newTransaction3 = leonChain.createNewTransaction(req.body.hospital, req.body.country, req.body.patientInfo, req.body.symptoms);
    const blockIndex = leonChain.addTransactionToPendingTransactions(newTransaction3);
    
    if(leonChain.pendingTransactions.length > 10){
        leonChain.createNewBlock()
        io.emit("updateChain", leonChain.chain)
    }
    
    res.json({  idTransaction: `${newTransaction3.transactionId} ` });
});

/*
app.get('/minar', (req: Request, res: Response, next: NextFunction) => {
    //It works more or less, but we should find a way with socket to just send the mining request to just one client
    let newBlock = leonChain.createNewBlock();
});
*/