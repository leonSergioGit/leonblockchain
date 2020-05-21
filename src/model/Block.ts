
/**
 * @typedef {class}
 * @property {number} index   La cadena de bloques que formará el blockchain'
 * @property {Date} timestamp array que formará la lista de las transacciones que están pendientes de ser añadidas a un bloque
 * @property {object} transactions La dirección del nodo de uno mismo
 * @property {number} nonce Array con todas las direcciones de todos los nodos activos
 * @property {string} hash La dirección del nodo de uno mismo
 * @property {string} previousBlockHash Array con todas las direcciones de todos los nodos activos
 */
class Block {
    index: number;
    timestamp: number;
    transactions: object;
    nonce: number;
    hash: string;
    previousBlockHash: string;

    /**
     * 
     * @param index 
     * @param timestamp 
     * @param transactions 
     * @param nonce 
     * @param hash 
     * @param previousBlockHash 
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