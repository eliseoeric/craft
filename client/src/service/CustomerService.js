import Service from '@Services/Service'

const BASE_URI = '/.netlify/functions'

class CustomerService extends Service {
  createCustomer = (_customer = {}) => {
    const { password, ...customerFields } = _customer

    const customer = {
      ...customerFields,
      authentication: {
        new_password: password,
      },
    }

    return this.post(`${BASE_URI}/customer`, { customer })
  }

  // get the customer by email address
  getCustomer = (email = '') => {
    return this.get(`${BASE_URI}/customer?email=${email}`)
  }
}

export default new CustomerService()
