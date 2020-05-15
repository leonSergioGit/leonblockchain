"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Block {
    constructor(index, timestamp, transactions, nonce, hash, previousBlockHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.nonce = nonce;
        this.hash = hash;
        this.previousBlockHash = previousBlockHash;
    }
}
exports.default = Block;
