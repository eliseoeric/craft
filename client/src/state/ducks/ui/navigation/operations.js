import actions from '@State/ducks/ui/navigation/actions'
import types from '@State/ducks/ui/navigation/types'
import { all, put, call, fork, takeLatest, select } from 'redux-saga/effects'

const {
  toggleMobileMenu,
  setActiveTeamMemberIndex,
  toggleLoginModal,
  setFixedState,
} = actions

function* rootFlow() {
  yield all([takeLatest(types.NAVIGATION_REQUEST_OPEN_DRAWER, openDrawer), takeLatest(types.NAVIGATION_REQUEST_CLOSE_DRAWER, closeDrawer)])
}

function* openDrawer(action) {
  const { template, slug } = action.payload
  try {
    yield put(actions.successOpenDrawer({ template, slug }))
  } catch (error) {
    console.error(error)
    yield put(actions.errorOpenDrawer(error))
  }
}

function* closeDrawer(action) {
  try {
    yield put(actions.successCloseDrawer())
  } catch (error) {
    console.error(error)
    yield put(actions.errorCloseDrawer(error))
  }
}

export default {
  toggleMobileMenu,
  setActiveTeamMemberIndex,
  toggleLoginModal,
  setFixedState,
  rootFlow,
}
