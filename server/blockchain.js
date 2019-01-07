const axios = require('axios');
const sha256 = require('crypto-js/sha256');
const Block = require('./block');

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, Date.now(), 'Genesis Block', '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.hashBlock();
        this.chain.push(newBlock);
    }

    nextBlock(lastBlock) {
        console.log(lastBlock);
        let index = lastBlock.index + 1;
        let timestamp = Date.now();
        let data = "Hey! I'm block " + String(index);
        let hash = lastBlock.hash;

        return new Block(index, timestamp, data, hash);
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash != currentBlock.hashBlock()) {
                return false;
            }

            if (currentBlock.previousHash != previousBlock.hash) {
                return false;
            }

            return true;
        }
    }

    proofOfWork(lastProof) {
        if (!lastProof) {
            lastProof = 1000;
        }

        // Create a variable that we will use to find our next proof of work
        let incrementor = lastProof + 1;

        // Keep incrementing the incrementor until it's equal to a number 
        // divisible by 9 and the proof of work of the previous block in the 
        // chain
        while (!(incrementor % 9 == 0 && incrementor % lastProof == 0)) {
            incrementor++;
        }
        
        // Once that number is found, we can return it as a proof of our work
        return incrementor
    }

    findNewChains(peerNodes) {
        // Get the blockchains of every other node
        let otherChains = [];
        for (let nodeUrl in peerNodes) {
            // Get their chains using a GET request
            const getData = async url => {
                try {
                    const response = await axios.get(url);
                    const data = response.data;
                    console.log(data);
                } catch (error) {
                    console.log(error);
                }
            };
            block = getData(url);

            // Convert the JSON object to a Python dictionary
            block = JSON.loads(block);
            // Add it to our list
            otherChains.push(block);
        }
        return otherChains;
    }
  
    consensus(peerNodes) {
        // Get the blocks from other nodes
        otherChains = findNewChains(peerNodes);
        // If our chain isn't longest, then we store the longest chain
        longestChain = blockchain;
        for (let chain in otherChains) {
            if (longestChain.length < chain.length) {
                longestChain = chain;
            }
        }
        // If the longest chain wasn't ours, then we set our chain to the longest
        blockchain = longestChain;
    }
}

module.exports = Blockchain;