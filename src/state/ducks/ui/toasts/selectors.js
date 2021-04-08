const getToasts = (state) =>
  state.ui.toasts.allIds.map((id) => state.ui.toasts.byId[id])

const getToastsById = (state) => state.ui.toasts.byId

const getToastCount = (state) => state.ui.toasts.allIds.length

export default {
  getToastCount,
  getToastsById,
  getToasts,
}
