//Mediante express creamos un servidor. 
import express, { Application, Request, Response, NextFunction} from 'express';
import sha256 from 'crypto-js/sha256';
import LeonChain from './leonchain';
import Block from './Block';
import socket from 'socket.io';
import bodyParser from 'body-parser';

var cors = require('cors')



const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

/*
let blocks = new Block(10, new Date(), {asfaf: "adf"}, 30, "fadsfdfs", "asdfasdf");



const leonChain = new LeonChain([blocks], [{faf: "hola"}], "asdfasdf", ["sdfasfaf"]);

*/

const leonChain = new LeonChain();
leonChain.creacionGenesisBlock();

const newTransaction = leonChain.createNewTransaction(3000, "Sergio", "Teruyo");
const newTransaction2 = leonChain.createNewTransaction(3000, "Sergio", "Teruyo");


leonChain.addTransactionToPendingTransactions(newTransaction)
leonChain.addTransactionToPendingTransactions(newTransaction2)


const server = app.listen(5000, () => {
    console.log("Server running")
})

const io = socket(server);

io.on('connection', (socket) => { 
   
    socket.emit('entireBlockchain', JSON.stringify(leonChain));

})

app.get('/', (req: Request, res: Response, next: NextFunction) => {
   
    res.send(JSON.stringify(leonChain));
}); 


//ADD TRASACTIONS
app.post('/transaction', (req, res) => {
    const newTransaction3 = leonChain.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    const blockIndex = leonChain.addTransactionToPendingTransactions(newTransaction3);
    
    if(leonChain.pendingTransactions.length > 10){
        io.emit('diezTransacciones', "Hay que minar");
    }
    

    res.json({  note: `Transaction will be added in block ` });
    console.log(leonChain.pendingTransactions);


});

/*
app.get('/getPendingTransactions', (req, res) => {
  res.send(leonChain.pendingTransactions)
 });
*/

app.get('/minar', (req: Request, res: Response, next: NextFunction) => {
    //It works more or less, but we should find a way with socket to just send the mining request to just one client
    leonChain.createNewBlock(2, "3434", "dsfadf");
    res.send(leonChain.chain);
});