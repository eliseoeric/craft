import { combineReducers } from 'redux'
import ui from '@State/ducks/ui'
import content from '@State/ducks/content'

export default combineReducers({
  ui,
  content
})
