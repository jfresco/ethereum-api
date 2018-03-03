import Wallet from '../lib/Wallet'

export default function getWallet (req, res, next) {
  const privateKey = req.params.privateKey || req.body.privateKey
  if (!privateKey) {
    res.status(400).send({ error: 'You must send the private key in order to use your wallet' })
  }

  req.wallet = new Wallet(privateKey);
  next()
}
