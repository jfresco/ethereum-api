import { Router } from 'express';
import Wallet from '../lib/Wallet';
import getWallet from '../middleware/get-wallet';

const api = Router();

api.get('/createWallet', function (req, res) {
  try {
    const { address, privateKey } = Wallet.create();
    res.send({ address, privateKey });
  } catch (err) {
    next(err);
  }
});

api.get('/getBalance/:privateKey', getWallet, async function ({ wallet }, res, next) {
  try {
    const balance = await wallet.getBalance()
    res.send({ balance });
  } catch (err) {
    next(err)
  }
})

api.post('/transaction', getWallet, async function ({ wallet, body: { destination, amount } }, res, next) {
  try {
    const transaction = await wallet.createTransaction(destination, amount);
    res.send({ transaction });
  } catch (err) {
    next(err);
  }
});

export default api;
