import types from '@State/ducks/ui/navigation/types'

const toggleMobileMenu = (data) => ({
  type: types.NAVIGATION_TOGGLE_MOBILE_MENU,
})

const setActiveTeamMemberIndex = (data) => ({
  type: types.NAVIGATION_SET_TEAM_MEMBER_MODAL,
  payload: data,
})

const toggleLoginModal = (data) => ({
  type: types.NAVIGATION_TOGGLE_LOGIN_MODAL,
})

const setFixedState = (data) => ({
  type: types.NAVIGATION_SET_FIXED_STATE,
  payload: { stateFixed: data },
})

const requestOpenDrawer = (data) => ({
  type: types.NAVIGATION_REQUEST_OPEN_DRAWER,
  payload: data,
})

const successOpenDrawer = (data) => ({
  type: types.NAVIGATION_SUCCESS_OPEN_DRAWER,
  payload: data,
})

const errorOpenDrawer = (data) => ({
  type: types.NAVIGATION_ERROR_OPEN_DRAWER,
  payload: data,
})

const requestCloseDrawer = (data) => ({
  type: types.NAVIGATION_REQUEST_CLOSE_DRAWER,
  payload: data,
})

const successCloseDrawer = (data) => ({
  type: types.NAVIGATION_SUCCESS_CLOSE_DRAWER,
  payload: data,
})

const errorCloseDrawer = (data) => ({
  type: types.NAVIGATION_ERROR_CLOSE_DRAWER,
  payload: data,
})

export default {
  toggleMobileMenu,
  setActiveTeamMemberIndex,
  toggleLoginModal,
  setFixedState,
  requestOpenDrawer,
  successOpenDrawer,
  errorOpenDrawer,
  requestCloseDrawer,
  successCloseDrawer,
  errorCloseDrawer,
}
