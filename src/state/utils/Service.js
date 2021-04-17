const axios = require('axios');

class LambdaService {
  constructor() {
    let client = axios.create()
    this.interceptor = client.interceptors.response.use(
      this.handleSuccess,
      this.handleError
    )
    this.client = client
  }

  getHeaders = () => {
    let headers = {
      'X-Client-Type': 'Craft Gatsby',
      'X-Client-Name': 'gatsby-craft-netlify',
    }

    return headers;
  }

  handleSuccess = (response) => {
    return response.data
  }

  handleError = (error) => {
    console.log('[DEBUG] Error called from Lambda Service', error)
    return Promise.reject(error)
  }

  get(url, options = {}) {
    options.headers = this.getHeaders();
    return this.client.get(url, options)
  }

  post(url, payload) {
    let options = {
      method: 'POST',
      url: url,
      data: payload,
      headers: this.getHeaders(),
    }

    return this.client.request(options)
  }

  put(url, payload) {
    let options = {
      method: 'PUT',
      url: url,
      data: payload,
      headers: this.getHeaders(),
    }

    return this.client.request(options)
  }

  delete(url) {
    let options = {
      method: 'DELETE',
      url: url,
      headers: this.getHeaders(),
    }

    return this.client.request(options)
  }
}

module.exports = LambdaService;