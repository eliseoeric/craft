import InitialState from '@State/config/initialState'
import types from '@State/ducks/ui/menu/types'

export default function menu(state = InitialState.ui.menu, action) {
  const { type, payload } = action

  switch (type) {
    case types.MENU_APPLY_NEW_FILTER: {
      const { filter, value } = payload
      let filters = {
        ...state.filters,
      }
      return {
        ...state,
        filters: {
          ...filters,
          [filter]: Array.from(
            new Set(filters[filter] ? [...filters[filter], value] : [value])
          ),
        },
      }
    }

    case types.MENU_REMOVE_FILTER: {
      const { filter, value } = payload
      let filters = {
        ...state.filters,
      }

      return {
        ...state,
        filters: {
          ...filters,
          [filter]: filters[filter].filter((item) => item !== value),
        },
      }
    }

    default:
      return state
  }
}
