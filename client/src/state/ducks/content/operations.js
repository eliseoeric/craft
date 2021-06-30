import { all, put, call, select, takeLatest } from 'redux-saga/effects'
import actions from '@State/ducks/content/actions'
import types from '@State/ducks/content/types'
import selectors from '@State/ducks/content/selectors'
import ContentfulService from '@Services/ContentfulService'
import { ASYNC_STATUS } from '@Utils/enums'

function* rootFlow() {
  // todo will probably need to fetch all orders for a given customer
  yield all([
    takeLatest(types.POSTS__REQUEST_GET_ALL, getAllPosts),
  ])
}

function* getAllPosts(action) {
  
  try {
    const posts = yield call(ContentfulService.getAllPosts)
    yield put(actions.successGetAllPosts({ posts }))
  } catch (error) {
    console.error('[DEBUG] Error getting all posts', error)
    yield put(actions.errorGetAllPosts(error))
  }
}

export default {
  rootFlow,
}
