import Service from '@Services/Service'

const BASE_URI = '/.netlify/functions'

class CartService extends Service {
  createCart = (items = []) => {
    const cart = {
      line_items: items.map(({ quantity, bigcommerce_id }) => {
        return {
          quantity,
          product_id: bigcommerce_id, //todo maybe just keep this as product_id?
        }
      }),
    }
    return this.post(`${BASE_URI}/cart`, cart)
  }

  getCart = (id) => {
    return this.get(`${BASE_URI}/cart?id=${id}`)
  }

  addItemToCart = (cartId, item) => {
    const { quantity, product_id } = item
    const line_items = [
      {
        quantity,
        product_id,
      },
    ]
    return this.post(`${BASE_URI}/items?id=${cartId}`, line_items) // todo this route isnt working
  }

  updateCartItem = (cartId, item) => { 
    return this.put(`${BASE_URI}/items?id=${cartId}`, item)
  }

  removeItemFromCart = (cartId, item) => {
    return this.delete(`${BASE_URI}/items?cartId=${cartId}&itemId=${item.id}`)
  }

  updateCustomerId = (cartId, customerId) => {
    return this.put(`${BASE_URI}/cart`, {
      cart_id: cartId,
      customer_id: customerId
    })
  }
}

export default new CartService()
