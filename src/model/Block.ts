


/**
 * Este archivo comprende la clase Block y que consistirá en el bloque que formará la cadena de bloques Blockchain
 * @file
 */

/**
 * Clase Block que serán los bloques de los cuales estará formado el blockchain.
 * @class 
 * @property {number} index   Index del bloque.
 * @property {Date} timestamp Fecha de creación del bloque.
 * @property {object} transactions Conjunto de las transacciones incluidas en el bloque.
 * @property {number} nonce Numero que se intenta resolver para la minería.
 * @property {string} hash Hash codificación mediante el algoritmo sha256 del bloque.
 * @property {string} previousBlockHash Hash del anterior bloque.
 */
class Block {
    index: number;
    timestamp: number;
    transactions: object;
    nonce: number;
    hash: string;
    previousBlockHash: string;

    /**
     * @constructs
     * @param index Index del bloque.
     * @param timestamp Fecha de creación del bloque.
     * @param transactions Conjunto de las transacciones incluidas en el bloque.
     * @param nonce Numero que se intenta resolver para la minería.
     * @param hash Hash codificación mediante el algoritmo sha256 del bloque.
     * @param previousBlockHash Hash del anterior bloque.
     */
    constructor(index: number, timestamp: number, transactions: object, nonce: number, hash: string, previousBlockHash: string) {
        this.index = index;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.nonce = nonce;
        this.hash = hash;
        this.previousBlockHash = previousBlockHash;
    }

}


export default Block;