import { all, put, call, fork, takeLatest, select } from 'redux-saga/effects'
import actions from '@State/ducks/groups/actions'
import types from '@State/ducks/groups/types'
import GroupService from '@Services/GroupService'

function* rootFlow() {
  yield all([
    call(getAllGroups),
  ])
}

function* getAllGroups(action) {
  yield put(actions.requestGetAll())
  try {
    const response = yield call(GroupService.getAllGroups)
    debugger
    yield put(actions.successGetAll({groups: response}))
  } catch(error) {
    console.error({error})
    yield put(actions.errorGetAll(error))
  }
}

export default {
  rootFlow
}