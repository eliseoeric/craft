import axios from 'axios'

export default class Service {
  constructor() {
    let client = axios.create()
    this.interceptor = client.interceptors.response.use(
      this.handleSuccess,
      this.handleError
    )
    this.client = client
    this.cache = {} // url : data
  }

  handleSuccess = (response) => {
    return response.data
  }

  handleError = (error) => {
    console.log('[DEBUG] error called from service')
  }

  get(url, options = {}) {
    return this.client.get(url, options)
  }

  all(urls) {
    return axios.all(urls)
  }

  post(url, payload) {
    let options = {
      method: 'POST',
      url: url,
      data: payload,
    }

    return this.client.request(options)
  }

  put(url, payload) {
    let options = {
      method: 'PUT',
      url: url,
      data: payload,
    }

    return this.client.request(options)
  }

  delete(url) {
    let options = {
      method: 'DELETE',
      url: url,
    }

    return this.client.request(options)
  }
}
