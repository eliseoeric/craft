import InitialState from '@State/config/initialState'
import { ASYNC_STATUS } from '@Utils/enums'
import types from '@State/ducks/content/types'

export default function content(state = InitialState.content, action) {
  const { type, payload } = action

  switch (type) {
    case types.POSTS__REQUEST_GET_ALL: {
      return {
        ...state,
        asyncStatus: ASYNC_STATUS.REQUESTING,
      }
    }

    case types.POSTS__ERROR_GET_ALL: {
      return {
        ...state,
        asyncStatus: ASYNC_STATUS.ERROR,
      }
    }

    case types.POSTS__SUCCESS_GET_ALL: {
      const { posts } = payload

      return {
        ...state
      }
      // let byId = {
      //   ...state.byId,
      // }

      // byId[order.id] = {
      //   ...order,
      // }

      // return {
      //   ...state,
      //   asyncStatus: ASYNC_STATUS.SUCCESS,
      //   byId,
      //   allIds:
      //     state.allIds.indexOf(order.id) == -1
      //       ? [...state.allIds, order.id]
      //       : state.allIds,
      // }
    }
    default:
      return state
  }
}
