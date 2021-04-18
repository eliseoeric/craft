/* UNCLASSIFIED */
import { combineReducers } from 'redux'
import navigation from '@State/ducks/ui/navigation'
import toasts from '@State/ducks/ui/toasts'

export default combineReducers({
  navigation,
  toasts,
})
