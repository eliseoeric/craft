import InitialState from '@State/config/initialState'
import types from '@State/ducks/ui/toasts/types'

export default function navigation(state = InitialState.ui.toasts, action) {
  const { type, payload } = action

  switch (type) {
    case types.TOAST_ADD_NEW: {
      const { title, message, variant } = payload.data
      let toast = {
        title,
        message,
        variant,
      }

      if (typeof payload.data === 'string') {
        toast = { message: payload.data, variant: 'info' }
      }

      const existingIds = state.allIds.map((id) => +id.split('-')[1])
      const newId = Math.max(...existingIds, 0) + 1

      const toastId = `toast-${newId}`
      toast.id = toastId

      // byId is object where ids are key
      let byId = { ...state.byId }
      byId[toastId] = toast

      return {
        ...state,
        allIds: [...state.allIds, toastId],
        byId,
      }
    }

    case types.TOAST_DISMISS: {
      const { id } = payload

      const allIdIndex = state.allIds.findIndex((val) => val === id)
      const newAllIds = [
        ...state.allIds.slice(0, allIdIndex),
        ...state.allIds.slice(allIdIndex + 1),
      ]

      return {
        ...state,
        allIds: newAllIds,
      }
    }

    default:
      return state
  }
}
