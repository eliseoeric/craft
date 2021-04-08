require('dotenv').config()
const BigCommerce = require('node-bigcommerce')

class BigCommerceService {
  constructor() {
    const bigCommerce = new BigCommerce({
      clientId: process.env.BIG_COMMERCE_API_CLIENT_ID,
      secret: process.env.BIG_COMMERCE_API_SECRET,
      accessToken: process.env.BIG_COMMERCE_API_TOKEN,
      storeHash: process.env.BIG_COMMERCE_API_STORE_HASH,
      responseType: 'json',
    })

    this.client = bigCommerce
  }

  // verify = () => {
  //   this.bigCommerce
  //     .get('/products')
  //     .then((data) => {
  //       console.log({ data })
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //     })
  // }
}

module.exports = BigCommerceService;
