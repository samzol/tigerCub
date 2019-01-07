const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const url = require('url');

const Block = require('./block');
const Blockchain = require('./blockchain');

let blockchain = new Blockchain();

let wallets = [
    { name: 'Wallet 1', address: 'q3nf394hjg-random-miner-address-34nf3i4nflkn3oi', balance: 0 },
    { name: 'Wallet 2', address: '93j4ivnqiopvh43-random-public-key-b-qjrgvnoeirbnferinfo', balance: 0 },
    { name: 'Wallet 3', address: '71238uqirbfh894-random-public-key-a-alkjdflakjfewn204ij', balance: 0 }
];

 // let wallets = JSON.stringify(walletArray);

let thisNodeTransactions = [];

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// setting CORS
app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', 'http://specific-site.com'); // only http://specific-site.com has access
  // res.header('Access-Control-Allow-Headers', '*'); // all headers
  res.header('Access-Control-Allow-Origin', '*'); // * gives access to any origin
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); // what we support for our API
    return res.status(200).json({});
  }
  next();
});

// ROUTES that handle requests

app.get('/mine', (req, res) => {

    let minerAddress = url.parse(req.url, true).query.address;

    if (minerAddress) {
        // Get the last proof of work
        let lastBlock = blockchain.getLatestBlock();
        let lastProof = lastBlock.data['proof-of-work'];

        // console.log(lastProof);
    
        // Find the proof of work for the current block being mined
        // Note: The program will hang here until a new proof of work is found
        proof = blockchain.proofOfWork(lastProof);
    
        // Once we find a valid proof of work, we know we can mine a block so 
        // we reward the miner by adding a transaction
        thisNodeTransactions.push({
            'type': 'mining',
            'from': 'network',
            'to': minerAddress,
            'amount': 1,
            'timestamp': Date.now()
        });

        // Update Wallet
        wallets.forEach( wallet => {
            if (wallet.address == minerAddress) {
                wallet.balance = wallet.balance + 1;
            }
        });

        // Now we can gather the data needed to create the new block
        let newBlockData = {
            'proof-of-work': proof,
            'transactions': thisNodeTransactions
        };

        let newBlockIndex = lastBlock.index + 1;
        let newBlockTimestamp = Date.now();
        let lastBlockHash = lastBlock.hash;
    
        // Empty transaction list
        // thisNodeTransactions = [];
    
        // Now create the new block!
        let minedBlock = new Block(
            newBlockIndex,
            newBlockTimestamp,
            newBlockData,
            lastBlockHash
        );
        blockchain.chain.push(minedBlock);
    
        // Let the client know we mined a block
        res.status(200).json({
            'index': newBlockIndex,
            'timestamp': newBlockTimestamp.toString(),
            'data': newBlockData,
            'hash': lastBlockHash
        });
    }  else {
        res.status(404).json({
            message: 'No miner address'
        });
    } 
    
});

app.get('/blocks', (req, res) => {
    let chainToSend = blockchain.chain;

    res.status(200).json(chainToSend);
});

app.get('/trans', (req, res) => {
    let trans = thisNodeTransactions;

    res.status(200).json(trans);
});

app.post('/trans', (req, res) => {
    let trans = {
        'type': req.body.type,
        'from': req.body.from,
        'to': req.body.to,
        'amount': req.body.amount,
        'timestamp': req.body.timestamp
    }
    
    thisNodeTransactions.push(trans);

    if (req.body.amount) {
        let amount = Number(req.body.amount);
        // Update Wallet
        wallets.forEach( wallet => {
            if (wallet.address == req.body.from) {
                wallet.balance = wallet.balance - amount;
            }
            if (wallet.address == req.body.to) {
                wallet.balance = wallet.balance + amount;
            }
        });
    }
    res.status(200).json(trans);
});

app.get('/wallets', (req, res) => {
    res.status(200).json(wallets);
});

// ERROR HANDLING
// 404 error
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// handle errors (404 or any other error from app) (no route ^ was able to handle req)
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
        message: error.message
        }
    });
});

module.exports = app;