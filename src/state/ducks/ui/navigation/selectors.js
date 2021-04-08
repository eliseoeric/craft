const isMobileMenuOpen = (state) => state.ui.navigation.mobileActive

const isLocationModalOpen = (state) => state.ui.navigation.locationModalActive

const isLoginModalOpen = (state) => state.ui.navigation.loginModalActive

const isHeaderFixed = (state) => state.ui.navigation.stateFixed

export default {
  isMobileMenuOpen,
  isLocationModalOpen,
  isLoginModalOpen,
  isHeaderFixed,
}
