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

    case types.NAVIGATION_SET_TEAM_MEMBER_MODAL: {
      return {
        ...state,
        activeTeamMemberIndex: action.payload,
      }
    }

    case types.NAVIGATION_TOGGLE_LOGIN_MODAL: {
      return {
        ...state,
        loginModalActive: !state.loginModalActive,
      }
    }

    case types.NAVIGATION_SUCCESS_OPEN_DRAWER: {
      const { template, slug } = payload
      return {
        ...state,
        drawer: {
          isOpen: true,
          template,
          slug,
        },
      }
    }

    case types.NAVIGATION_SUCCESS_CLOSE_DRAWER: {
      return {
        ...state,
        drawer: {
          isOpen: false,
          template: null,
          slug: null,
          invertPalette: null,
        },
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
