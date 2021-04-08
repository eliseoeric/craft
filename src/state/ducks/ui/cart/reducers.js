import InitialState from '@State/config/initialState'
import types from '@State/ducks/ui/cart/types'

export default function cart(state = InitialState.ui.cart, action) {
  const { type, payload } = action

  switch (type) {
    case types.CART__TOGGLE_QUICK_CART: {
      return !state.quickCartActive
    }

    default:
      return state
  }
}
