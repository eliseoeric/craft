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

export default {
  toggleMobileMenu,
  setActiveTeamMemberIndex,
  toggleLoginModal,
  setFixedState,
}
