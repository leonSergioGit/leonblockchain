class Block {
    index: number;
    timestamp: Date;
    transactions: object;
    nonce: number;
    hash: string;
    previousBlockHash: string;

    constructor(index: number, timestamp: Date, transactions: object, nonce: number, hash: string, previousBlockHash: string) {
        this.index = index;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.nonce = nonce;
        this.hash = hash;
        this.previousBlockHash = previousBlockHash;
    }

}


export default Block;