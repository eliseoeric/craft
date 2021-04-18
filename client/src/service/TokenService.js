import Service from '@Services/Service'

const BASE_URI = '/.netlify/functions'

class TokenService extends Service {

  // get the customer by email address
  getToken = () => {
    return this.get(`${BASE_URI}/token`)
  }
}

export default new TokenService()
