import { Router } from 'express';
import Wallet from '../lib/Wallet';
import getWallet from '../middleware/get-wallet';

const api = Router();

/**
 * GET /createWallet
 * Creates a wallet and returns its address and private key
 */
api.get('/createWallet', function (req, res, next) {
  try {
    const { address, privateKey } = Wallet.create();
    res.send({ address, privateKey });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /getBalance/{privateKey}
 * Gets the balance of a wallet
 * @param {string} privateKey - wallet's private key
 */
api.get('/getBalance/:privateKey', getWallet, async function ({ wallet }, res, next) {
  try {
    const balance = await wallet.getBalance()
    res.send({ balance });
  } catch (err) {
    next(err)
  }
})

/**
 * POST /transaction
 * Sends ethers from a wallet to another and returns the transaction status
 * @param {string} body.privateKey The address of the destination wallet
 * @param {string} body.destination The address of the destination wallet
 * @param {string} body.amount The amount to transfer, in ethers
 */
api.post('/transaction', getWallet, async function ({ wallet, body: { destination, amount } }, res, next) {
  try {
    const transaction = await wallet.createTransaction(destination, amount);
    res.send({ transaction });
  } catch (err) {
    next(err);
  }
});

export default api;
