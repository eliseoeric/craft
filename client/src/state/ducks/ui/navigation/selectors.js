const isMobileMenuOpen = (state) => state.ui.navigation.mobileActive

const getActiveTeamMemberIndex = (state) =>
  state.ui.navigation.activeTeamMemberIndex

const isLoginModalOpen = (state) => state.ui.navigation.loginModalActive

const isHeaderFixed = (state) => state.ui.navigation.stateFixed

const getDrawer = (state) => state.ui.navigation.drawer

export default {
  isMobileMenuOpen,
  getActiveTeamMemberIndex,
  isLoginModalOpen,
  isHeaderFixed,
  getDrawer,
}
