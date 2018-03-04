import ethers from 'ethers'
import config from '../config.json'

/** Entity that represents a wallet. Abstracts `ethers` and the access to the provider. */
export default class Wallet {
  /**
   * Instantiates a Wallet
   * @param {string} privateKey - the wallet's private key
   */
  constructor (privateKey) {
    // The network to use can be configured in `config.json`
    const network = ethers.providers.networks[config.network]

    // Instantiate the wallet and set the provider
    const wallet = new ethers.Wallet(privateKey)
    wallet.provider = ethers.providers.getDefaultProvider(network)

    // Keep "private" `ethers.Wallet` instance
    this._wallet = wallet

    // Public properties
    this.address = wallet.address
    this.privateKey = wallet.privateKey
  }

  /**
   * Gets wallet's balance
   * @return {Promise<string>} The balance
   */
  async getBalance () {
    const balance = await this._wallet.getBalance()
    return ethers.utils.formatEther(balance)
  }

  /**
   * Creates a transaction of ether from the current wallet to another
   * @param {string} destination - destination wallet address
   * @param {string} amount - the amount in ethers to transfer
   * @return {Promise<ethers.Transaction>} An object representing the transaction state
   */
  createTransaction (destination, amount) {
    // The amount should be in wei
    const amountWei = ethers.utils.parseEther(amount)
    return this._wallet.send(destination, amountWei)
  }
}

/**
 * Creates a new wallet and returns a `Wallet` object
 * @return {Wallet} the new wallet instance
 */
Wallet.create = function () {
  const { privateKey } = ethers.Wallet.createRandom()
  return new Wallet(privateKey)
}
