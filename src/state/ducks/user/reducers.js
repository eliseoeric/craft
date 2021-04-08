import InitialState from '@State/config/initialState'
import types from '@State/ducks/user/types'

export default function cart(state = InitialState.user, action) {
  const { type, payload } = action

  switch (type) {
    case types.USER__SET_STORE: {
      const { store } = payload
      return {
        ...state,
        store,
      }
    }

    case types.USER__SUCCESS_LOGIN_CUSTOMER: {

      return {
        ...state,
        customer: { ...payload },
      }
    }

    case types.USER__SUCCESS_CREATE_CUSTOMER: {
      return {
        ...state,
        customer: payload[0], // todo fix this so its not [0]
      }
    }

    case types.USER__SUCCESS_GET_CUSTOMER: {
      const { user } = payload // todo fix this, should be customer

      return {
        ...state,
        customer: user,
      }
    }

    default:
      return state
  }
}
