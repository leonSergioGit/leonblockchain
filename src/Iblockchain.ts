//Interface of a blockchain
import Block from './Block';

interface Iblockchain {
    chain: Block[];
    pendingTransactions: object[];
    currentNodeUrl: string;
    networkNodes: string[];


    createNewBlock(nonce: number, previousBlockHash: string, hash: string): Block;
    
    getLastBlock(): number;
    
    createNewTransaction(amount: number, sender: string, recipient: string): object; 
    
    addTransactionToPendingTransactions(transactionObj: object): Block;
    
    hashBlock(previousBlockHash: string, currentBlockData: object, nonce: number): string;
    
    proofOfWork(previousBlockHash: string, currentBlockData: object): number;
    
    getBlock(blockHash: string): Block;
    
    getTransaction(transactionId: string): object;
    
    getAddressData(address: string): object;

}

export default Iblockchain;