//Interface of a blockchain
import Block from './Block';
import { Interface } from 'readline';

/**
 * Este archivo comprende la interfaz IBlockchain la cual será implementada en cualquier blockchain que quisieramos crear. 
 * @file
 */

/**
 * @typedef
 * @property {Array<Block>} chain   La cadena de bloques que formará el blockchain'
 * @property {Array<object>} pendingTransactions El array que formará la lista de las transacciones que están pendientes de ser añadidas a un bloque.
 * @property {string} currentNodeUrl La dirección del nodo de uno mismo
 * @property {Array<string>} networkNodes Array con todas las direcciones de todos los nodos activos
 */
interface Iblockchain {
    chain: Block[];
    pendingTransactions: object[];
    currentNodeUrl: string;
    networkNodes: string[];


    /**
     * Crea lo que se conoce como el "genesis block" el cual es el primer bloque de la cadena y lo devuelve.
     * @function
     */
    creationGenesisBlock(): Block;

    /**
     * Crea un nuevo bloque y lo añade a la cadena.
     * @function 
     * 
     */
    createNewBlock(): Block;
    
    /**
     * Devuelve el último bloque de la cadena.
     * @function
     */
    getLastBlock(): Block;
    
    /**
     * Añade una nueva transacción a las transacciones pendientes en espera de ser añadidas a un bloque.
     * @function
     * @param transactionObj 
     */
    addTransactionToPendingTransactions(transactionObj: object): object[];
    
    /**
     * Codifica el bloque mediante el algoritmo sha256.
     * @function
     * @param {string} previousBlockHash Hash del bloque anterior.
     * @param {object} currentBlockData Datos del bloque actual.
     * @param {number} nonce Nonce del bloque actual.
     */
    hashBlock(previousBlockHash: string, currentBlockData: object, nonce: number, index: number, timestamp: number): string;
    
    /**
     * @function
     * @param previousBlockHash Hash del bloque anterior.
     * @param currentBlockData  Datos del bloque actual.
     */
    proofOfWork(previousBlockHash: string, currentBlockData: object): number;
    
    /**
     * Busca y devuelve un bloque a partir de su hash.
     * @function 
     * @param blockHash El hash del bloque que se quiere obtener.
     */
    getBlock(blockHash: string): Block;
    

    /**
     * Devuelve una transacción a partir de su id.
     * @function
     * @param {string} transactionId Id de la trasacción que queremos obtener.
     */
    getTransaction(transactionId: string): object;
}

/**
 * @exports
 */
export default Iblockchain;