import { combineReducers } from 'redux'
import ui from '@State/ducks/ui'
import cart from '@State/ducks/cart'
import user from '@State/ducks/user'
import groups from '@State/ducks/groups'

export default combineReducers({
  ui,
  cart,
  user,
  groups,
})
