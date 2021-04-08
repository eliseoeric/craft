import InitialState from '@State/config/initialState'
import types from '@State/ducks/cart/types'

export default function cart(state = InitialState.cart, action) {
  const { type, payload } = action

  switch (type) {
    case types.CART__SUCCESS_GET_CART:
    case types.CART__SUCCESS_UPDATE_CART:
    case types.CART__SUCCESS_UPDATE_ITEM:
    case types.CART__SUCCESS_UPDATE_CUSTOMER_ID:
    case types.CART__SUCCESS_CREATE_CART: {

      // if a success action has been dispatched, but the cart is an empty object,
      // we can assume this is because the getCart returned an empty cart, after the
      // final item in the cart was deleted - so let's reset the cart state.
      if (!payload.id) {
        return {
          ...state,
          ...InitialState.cart
        }
      }

      const {
        base_amount,
        cart_amount,
        coupons,
        id,
        email,
        customer_id,
        line_items,
      } = payload

      // note this assumes we are not using digital_items, gift_certs or custom_items
      let byId = {}
      let lineItemIds = line_items.physical_items.map((item) => item.id)

      line_items.physical_items.map((item) => {
        byId[item.id] = item
      })

      return {
        ...state,
        base_amount,
        cart_amount,
        coupons,
        customer_id, // todo scrub customer_id because this can be hacked
        email,
        id,
        items: {
          allIds: lineItemIds,
          byId,
        },
      }
    }

    // case types.CART__SUCCESS_ADD_ITEM: {
    //   let item = {
    //     ...payload.item,
    //   }
    //   let prevQuantity = 0;

    //   // shallow copy state
    //   let allIds = state.items.allIds;
    //   let byId = state.items.byId;

    //   // update the quantity
    //   if (byId[item.id] !== undefined) {
    //     prevQuantity = byId[item.id].quantity;
    //   }
    //   item.quantity = prevQuantity + payload.quantity;

    //   // todo if item.quantity === 0, remove

    //   return {
    //     ...state,
    //     items: {
    //       allIds:
    //         allIds.indexOf(item.id) === -1
    //           ? [...allIds, item.id]
    //           : allIds,
    //       byId: {
    //         ...byId,
    //         [item.id]: item,
    //       },
    //     },
    //   }
    // }

    default:
      return state
  }
}
