const sha256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.hashBlock();
    }
    
    hashBlock() {
        return sha256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

module.exports = Block;