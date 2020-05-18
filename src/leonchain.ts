//watch file constantly tsc file -w
//tsc --init to create a typescript config file
//typescript files should be in the src
/*
const greeting: string = 'Hello';
const numbers: number[] = [1, 2, 3];
*/

//Importamos la clase block que formará cada uno de los elementos del blockchain
import Block from './Block';
//Interfaz blockchain que se implementa en la clase LeonChain.
import Iblockchain from './Iblockchain';
import { v4 as uuid } from 'uuid';
import sha256 from 'crypto-js/sha256';


class LeonChain implements Iblockchain {
    chain: Block[];
    pendingTransactions: object[];
    currentNodeUrl: string;
    networkNodes: string[];

    
    
    constructor(){
        this.chain = []
        this.pendingTransactions = [];
        this.currentNodeUrl = "";
        this.networkNodes = [];
    } 
    

    
    

    //Implementación de los métodos del interfaz Iblockchain

    creacionGenesisBlock(){
        const genesisBlock = new Block(0, Date.now(), {GenesisBlock: "Welcome to my blockchain. I did it my way"}, 0, "BlockHash", "PreviousBlockHash");

        this.chain.push(genesisBlock);
        return genesisBlock;
    }
    
    createNewBlock(nonce: number, previousBlockHash: string, hash: string): Block {
       const newBlock = new Block(this.chain.length + 1, Date.now(), this.pendingTransactions, nonce, previousBlockHash, hash)
       
        //Tras llenar el nuevo bloque con todas las transacciones pendientes, vaciamos el array de transacciones pendientes
        this.pendingTransactions = [];
        
        //Añadimos el bloque al blockchain
        this.chain.push(newBlock);

        //Devolvemos el bloque
        return newBlock
    }

    getLastBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    createNewTransaction(amount: number, sender: string, recipient: string): object {
        const newTransaction = {
            amount: amount,
            sender: sender,
            recipient: recipient,
            transactionId: uuid().split('-').join('')
        }
        
        return newTransaction;
    }

    addTransactionToPendingTransactions(transactionObj: object): object[] {
        this.pendingTransactions.push(transactionObj);

        return this.pendingTransactions;
    }

    hashBlock(previousBlockHash: string, currentBlockData: object, nonce: number): string {
        const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
        const hash = JSON.stringify(sha256(dataAsString));
    
        return hash;
    }

    proofOfWork(previousBlockHash: string, currentBlockData: object): number {
        let nonce = 0;
        let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);

        while(hash.substring(0, 4) !== '0000'){
            nonce++;
            hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
        }

        return nonce
    }
    getBlock(blockHash: string): Block {
        throw new Error("Method not implemented.");
    }
    getTransaction(transactionId: string): object {
        throw new Error("Method not implemented.");
    }
    getAddressData(address: string): object {
        throw new Error("Method not implemented.");
    }
}




/*
let blocks = new Block(10, new Date(), {asfaf: "adf"}, 30, "fadsfdfs", "asdfasdf");



const blockChain = new LeonChain([blocks], [{faf: "hola"}], "asdfasdf", ["sdfasfaf"]);

console.log(blockChain.chain[0].transactions)


*/
/*


const add = (a: number, b: number): number => a + b;

let result = add(10, 20);

console.log(result); */


export default LeonChain;