import GraphqlService from '@Services/GraphqlService'
import TokenService from '@Services/TokenService'

class AuthService extends GraphqlService {
  authenticateCustomer = async ({ email, password }) => {
    let { token } = await TokenService.getToken()

    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`

    return await this.post(`/graphql`, {
      operationName: 'Login',
      variables: { email: email, pass: password },
      query:
        'mutation Login($email: String!, $pass: String!) {login(email: $email, password: $pass) {result}}',
    })
      .then(({ data }) => {
        const { errors, login } = data
        if (errors) {
          throw new Error(`${data.errors[0].message}. Authentication Failed`)
        }

        return {
          statusCode: 200,
          error: 0,
          body: login,
        }
      })
  }

  getCurrentUser = async () => {
    let { token } = await TokenService.getToken()
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`

    return await this.post(`/graphql`, {
      query: `
        query CustomersByEmail {
          customer {
            email
            entityId
            customerGroupId
            firstName
            lastName
            phone
            addressCount
          }
        }
      `,
    })
      .then(({ data }) => {
        const { errors, customer } = data
        if (errors) {
          throw new Error(`${data.errors[0].message}. Get Customer Failed`)
        }

        return {
          statusCode: 200,
          error: 0,
          body: customer,
        }
      })
      
  }
}

export default new AuthService()
