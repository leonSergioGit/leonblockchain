//watch file constantly tsc file -w
//tsc --init to create a typescript config file
//typescript files should be in the src
/*
const greeting: string = 'Hello';
const numbers: number[] = [1, 2, 3];
*/

//Importamos la clase block que formará cada uno de los elementos del blockchain
import Block from './Block';
import Transaction from './Transaction';
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
        const genesisBlock = new Block(0, Date.now(), ["Welcome to my blockchain. I did it my way"], 0, "BlockHash", "PreviousBlockHash");

        this.chain.push(genesisBlock);
        return genesisBlock;
    }
    
    createNewBlock(nonce: number, previousBlockHash: string, hash: string): Block {

        let transacciones = [];
        let newBlock: Block;
        if(this.pendingTransactions.length > 10){
            for(let i = 0; i < 10; i++){
                transacciones.push(this.pendingTransactions.shift())
            }
             newBlock = new Block(this.chain.length + 1, Date.now(), transacciones, nonce, previousBlockHash, hash)

                //Añadimos el bloque al blockchain
            this.chain.push(newBlock);

            //Devolvemos el bloque
            return newBlock
        }

        return new Block(0, Date.now(), [], 0, "afadsf", "!afd");
    }

    getLastBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    createNewTransaction(hospital: string, country: string, patientInfo: string, symptoms: string): Transaction {
        let idTransaction = uuid().split('-').join('');
        const newTransaction = new Transaction(hospital, country, patientInfo, symptoms, idTransaction); 
      
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



export default LeonChain;