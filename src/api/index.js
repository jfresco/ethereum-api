import { Router } from 'express';
import { Wallet, providers, utils } from 'ethers';

async function createTransaction (wallet, destination, amount) {
  // We must pass in the amount as wei (1 ether = 1e18 wei), so we use
  // this convenience function to convert ether to wei.
  const amountWei = utils.parseEther(amount);
  return wallet.send(destination, amountWei);
}

async function getBalance (wallet) {
  const balance = await wallet.getBalance();
  return utils.formatEther(balance);
}

function createWallet () {
  return Wallet.createRandom();
}

export default ({ config, db }) => {
	const api = Router();

  function getWallet (req, res, next) {
    const network = providers.networks[config.network];
    const wallet = new Wallet(req.params.privateKey || req.body.privateKey);
    wallet.provider = providers.getDefaultProvider(network);

    req.wallet = wallet;
    next()
  }

  api.get('/createWallet', function (req, res) {
    const { address, privateKey } = createWallet();
    res.send({ address, privateKey });
  });

  api.get('/getBalance/:privateKey', getWallet, async function (req, res, next) {
    try {
      const balance = await getBalance(req.wallet)
      res.send({ balance });
    } catch (err) {
      next(err)
    }
  })

  api.post('/transaction', getWallet, async function (req, res, next) {
    const { destination, amount } = req.body;
    try {
      const transaction = await createTransaction(req.wallet, destination, amount);
      res.send({ transaction });
    } catch (err) {
      next(err);
    }
  });

	return api;
}
