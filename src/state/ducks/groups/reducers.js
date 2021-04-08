import InitialState from '@State/config/initialState'
import types from '@State/ducks/groups/types'

export default function groups(state = InitialState.groups, action) {
  const { type, payload } = action;

  switch (type) {
    case types.GROUP__SUCCESS_GET_ALL: {
      const {groups} = payload;
      let byId = {}
      let allIds = groups.map((group) => group.id)

      groups.foreach((group) => {
        byId[group.id] = group;
      })
      
      return {
        ...state,
        allIds,
        byId,
      }
    }

    default: 
      return state;
  }
}