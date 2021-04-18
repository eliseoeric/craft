import types from '@State/ducks/ui/toasts/types'

const addNewToast = (data) => ({ type: types.TOAST_ADD_NEW, payload: { data } })

const dismissToast = (id) => ({ type: types.TOAST_DISMISS, payload: { id } })

export default {
  addNewToast,
  dismissToast,
}
