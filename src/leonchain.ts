//watch file constantly tsc file -w
//tsc --init to create a typescript config file
//typescript files should be in the src
/*
const greeting: string = 'Hello';
const numbers: number[] = [1, 2, 3];
*/

import express, { Application, Request, Response, NextFunction} from 'express';
import Block from './Block';
import Iblockchain from './Iblockchain';


class LeonChain implements Iblockchain {
    chain: Block[];
    pendingTransactions: object[];
    currentNodeUrl: string;
    networkNodes: string[];

    constructor(chain: Block[], pendingTransactions: object[], currentNodeUrl: string, networkNodes: string[]){
        this.chain = chain;
        this.pendingTransactions = pendingTransactions;
        this.currentNodeUrl = currentNodeUrl;
        this.networkNodes = networkNodes;

    }
    createNewBlock(nonce: number, previousBlockHash: string, hash: string): Block {
        throw new Error("Method not implemented.");
    }
    getLastBlock(): number {
        throw new Error("Method not implemented.");
    }
    createNewTransaction(amount: number, sender: string, recipient: string): object {
        throw new Error("Method not implemented.");
    }
    addTransactionToPendingTransactions(transactionObj: object): Block {
        throw new Error("Method not implemented.");
    }
    hashBlock(previousBlockHash: string, currentBlockData: object, nonce: number): string {
        throw new Error("Method not implemented.");
    }
    proofOfWork(previousBlockHash: string, currentBlockData: object): number {
        throw new Error("Method not implemented.");
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

const app: Application = express();


/*
let blocks = new Block(10, new Date(), {asfaf: "adf"}, 30, "fadsfdfs", "asdfasdf");



const blockChain = new LeonChain([blocks], [{faf: "hola"}], "asdfasdf", ["sdfasfaf"]);

console.log(blockChain.chain[0].transactions)


*/
/*


const add = (a: number, b: number): number => a + b;

let result = add(10, 20);

console.log(result); */

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello');
});


app.listen(5000, () => {
    console.log("Server running")
})