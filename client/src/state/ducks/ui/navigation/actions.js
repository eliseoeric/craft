import types from '@State/ducks/ui/navigation/types'

const toggleMobileMenu = (data) => ({
  type: types.NAVIGATION_TOGGLE_MOBILE_MENU,
})

const toggleLocationModal = (data) => ({
  type: types.NAVIGATION_TOGGLE_LOCATION_MODAL,
})

const toggleLoginModal = (data) => ({
  type: types.NAVIGATION_TOGGLE_LOGIN_MODAL,
})

const setFixedState = (data) => ({
  type: types.NAVIGATION_SET_FIXED_STATE,
  payload: { stateFixed: data },
})

export default {
  toggleMobileMenu,
  toggleLocationModal,
  toggleLoginModal,
  setFixedState,
}
