//Mediante express creamos un servidor. 
import express, { Application, Request, Response, NextFunction} from 'express';
import sha256 from 'crypto-js/sha256';
import LeonChain from './model/leonchain';
import Block from './model/Block';
import socket from 'socket.io';
import bodyParser from 'body-parser';

var cors = require('cors')



const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())


const leonChain = new LeonChain();
leonChain.creacionGenesisBlock();


const newTransaction = leonChain.createNewTransaction("Severo ochoa", "Spain", "Teruyo", "A little bit dirty");
const newTransaction2 = leonChain.createNewTransaction("Severo ochoa", "Spain", "Teruyo", "A little bit dirty");


leonChain.addTransactionToPendingTransactions(newTransaction)
leonChain.addTransactionToPendingTransactions(newTransaction2)


const server = app.listen(5000, () => {
    console.log("Server running")
})

const io = socket(server);

io.on('connection', (socket) => { 
    console.log("new connection")
    

})

app.get('/', (req: Request, res: Response, next: NextFunction) => {
   
    res.send(leonChain.chain);
}); 


//ADD TRASACTIONS
app.post('/transaction', (req, res) => {
    const newTransaction3 = leonChain.createNewTransaction(req.body.hospital, req.body.country, req.body.patientInfo, req.body.symptoms);
    const blockIndex = leonChain.addTransactionToPendingTransactions(newTransaction3);
    
    if(leonChain.pendingTransactions.length > 10){
        leonChain.createNewBlock(2, "3434", "dsfadf")
        io.emit("updateChain", leonChain.chain)
    }
    

    res.json({  idTransaction: `${newTransaction3.transactionId} ` });
    console.log(leonChain.pendingTransactions);


});

/*
app.get('/getPendingTransactions', (req, res) => {
  res.send(leonChain.pendingTransactions)
 });
*/

app.get('/minar', (req: Request, res: Response, next: NextFunction) => {
    //It works more or less, but we should find a way with socket to just send the mining request to just one client
    let newBlock = leonChain.createNewBlock(2, "3434", "dsfadf");
});
