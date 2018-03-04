/* eslint-env mocha */
import request from 'supertest'
import { expect } from 'chai'
import app from '../app'

const wallets = [
  {
    'address': '0xDe0Fb1a893F84f79CaafB3644FbFa85c944a327B',
    'privateKey': '0x9c0269dbd981d48b188c2630dc6438a2c9e3af6f14dc81781aa200333f7ad503'
  },
  {
    'address': '0xC5be62D73FbC070059B596B5F2fc4df128fB2a70',
    'privateKey': '0x24a9c665650afcf2a9b9db86e1d3ce01b9f1bc48178479a6bc607016d0026d15'
  }
]

describe('GET /createWallet', () => {
  it('creates a new wallet', () =>
    request(app)
      .get('/createWallet')
      .expect(200)
      .then(({ body }) => {
        expect(body).to.have.property('privateKey').to.be.a('string')
        expect(body).to.have.property('address').to.be.a('string')
      }))
})

describe('GET /getBalance/:privateKey', () => {
  it('gets the balance of a wallet', () =>
    request(app)
      .get(`/getBalance/${wallets[0].privateKey}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).to.have.property('balance').to.be.a('string')
      }))
})

describe('POST /transaction', () => {
  it('transfers ethers from a wallet to another', () =>
    request(app)
      .post('/transaction')
      .send({
        privateKey: wallets[0].privateKey,
        destination: wallets[1].address,
        amount: '0.01'
      })
      .expect(200)
      .then(({ body }) => {
        expect(body).to.have.property('transaction').to.be.an('object')
      }))
})
