import InitialState from '@State/config/initialState'
import types from '@State/ducks/ui/navigation/types'
import { DRAWER_STATUS } from '@Utils/enums'

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
          status: DRAWER_STATUS.OPEN,
          template,
          slug,
        },
      }
    }

    case types.NAVIGATION_SUCCESS_CLOSE_DRAWER: {
      return {
        ...state,
        drawer: {
          status: DRAWER_STATUS.CLOSED,
          template: null,
          slug: null,
          invertPalette: null,
        },
      }
    }

    case types.NAVIGATION_REQUEST_CLOSE_DRAWER: {
      return {
        ...state,
        drawer: {
          ...state.drawer,
          status: DRAWER_STATUS.CLOSING,
        },
      }
    }

    case types.NAVIGATION_REQUEST_OPEN_DRAWER: {
      return {
        ...state,
        drawer: {
          ...state.drawer,
          status: DRAWER_STATUS.OPENING,
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
