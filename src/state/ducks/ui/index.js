/* UNCLASSIFIED */
import { combineReducers } from 'redux'
import navigation from '@State/ducks/ui/navigation'
import cart from '@State/ducks/ui/cart'
import menu from '@State/ducks/ui/menu'
import toasts from '@State/ducks/ui/toasts'

export default combineReducers({
  navigation,
  cart,
  menu,
  toasts,
})
