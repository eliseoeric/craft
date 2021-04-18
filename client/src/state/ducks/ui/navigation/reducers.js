import InitialState from '@State/config/initialState'
import types from '@State/ducks/ui/navigation/types'

export default function navigation(state = InitialState.ui.navigation, action) {
  const { type, payload } = action

  switch (type) {
    case types.NAVIGATION_TOGGLE_MOBILE_MENU: {
      return {
        ...state,
        mobileActive: !state.mobileActive,
      }
    }

    case types.NAVIGATION_TOGGLE_LOCATION_MODAL: {
      return {
        ...state,
        locationModalActive: !state.locationModalActive,
      }
    }

    case types.NAVIGATION_TOGGLE_LOGIN_MODAL: {
      return {
        ...state,
        loginModalActive: !state.loginModalActive,
      }
    }

    case types.NAVIGATION_SET_FIXED_STATE: {
      const { stateFixed } = payload

      return {
        ...state,
        stateFixed: stateFixed,
      }
    }
    default:
      return state
  }
}
