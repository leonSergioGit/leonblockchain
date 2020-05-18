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

//Static files




app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send(leonChain);
}); 





app.use(express.static(__dirname + '/public'));

const server = app.listen(5000, () => {
    console.log("Server running")
})



//MINAR EN LA TRANSACCIÓN



//ADD TRASACTIONS
app.post('/transaction', (req, res) => {

   const newTransaction3 = leonChain.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    const blockIndex = leonChain.addTransactionToPendingTransactions(newTransaction3);
    
    if(leonChain.pendingTransactions.length > 9){
        console.log("Longitud apta para bloque")

        leonChain.createNewBlock(1, "previousBlockHash", "asdasd")
        res.json({ aviso: "Más de 10 transacciones"})
    }
    

    res.json({  note: `Transaction will be added in block ` });
    console.log(leonChain.pendingTransactions);


});
/*
app.get('/getPendingTransactions', (req, res) => {
  res.send(leonChain.pendingTransactions)
 });
*/

app.get('/mine', (req: Request, res: Response, next: NextFunction) => {
    //SOCKETS

    res.send("<h1>Welcome to the mining room</h1>");

    //MINING
    /*
    

    res.send(hash + "  " + nonce)
    */


   const io = socket(server);



   io.on('connection', (socket) => {
       console.log("connection" + socket.id)
   
      /* socket.emit('message', 'Welcome to mining room' + socket.id);
   
       //Broadcast when a user connects. This emits a message to everybody except the user that connects
       socket.broadcast.emit('message', 'A user has joined the chat');
   
       if(leonChain.pendingTransactions.length > 0){
           let nonce = 0;
           let hash = sha256("hola").toString()
   
   
   
           if(leonChain.pendingTransactions.length > 0){
               while(hash.substring(0, 5) !== '00000'){
                   nonce++;
                   hash = sha256("hola" + nonce).toString();
               }
   
               if(hash.substring(0, 5) === '00000'){
                   leonChain.pendingTransactions = [];
                   socket.emit('message', 'Has minado un bloque. Has ganado' + socket.id);
                   console.log(nonce)
               }
               
           } else {
               socket.emit('message', 'Demasiado lento. No te ha dado tiempo' + socket.id);
           }
   
   
           //Listen for chat message
           socket.on('chatMessage', (msg) => {
               io.emit('message', msg);
           })
           
       } else {
           socket.emit('message', 'No hay transacciones para minar' + socket.id);
       }
        
       */
       

       
       //Deberíamos elegir un cliente y ejecutar la minería en el lado del cliente. Quizás con axios se podría hacer
       /*var srvSockets = Object.keys(io.sockets.sockets);
       console.log(srvSockets);
   
       io.to(srvSockets[2]).emit('minar', "comenzando la minería. Has ganado")
       */
   })
});