//Interface of a blockchain
import Block from './Block';
import { Interface } from 'readline';

/**
 * @typedef {interface} 
 * @property {Array<Block>} chain   La cadena de bloques que formará el blockchain'
 * @property {Array<object>} pendingTransactions El array que formará la lista de las transacciones que están pendientes de ser añadidas a un bloque
 * @property {string} currentNodeUrl La dirección del nodo de uno mismo
 * @property {Array<string>} networkNodes Array con todas las direcciones de todos los nodos activos
 */
interface Iblockchain {
    chain: Block[];
    pendingTransactions: object[];
    currentNodeUrl: string;
    networkNodes: string[];

    creacionGenesisBlock(): Block;

    createNewBlock(nonce: number, previousBlockHash: string, hash: string): Block;
    
    getLastBlock(): Block;
    
    
    addTransactionToPendingTransactions(transactionObj: object): object[];
    
    hashBlock(previousBlockHash: string, currentBlockData: object, nonce: number): string;
    
    proofOfWork(previousBlockHash: string, currentBlockData: object): number;
    
    getBlock(blockHash: string): Block;
    
    getTransaction(transactionId: string): object;
    
    getAddressData(address: string): object;

}

export default Iblockchain;