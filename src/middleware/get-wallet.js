import Wallet from '../lib/Wallet'

/**
 * Get wallet middleware. Searchs for a private key in the request. If found, creates a new instance of a
 * `Wallet` an put it in `req.wallet`. Useful for routes that needs to operate with a `Wallet`.
 */
export default function getWallet (req, res, next) {
  const privateKey = req.params.privateKey || req.body.privateKey
  if (!privateKey) {
    res.status(400).send({ error: 'You must send the private key in order to use your wallet' })
  }

  req.wallet = new Wallet(privateKey)
  next()
}
