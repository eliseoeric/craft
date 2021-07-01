import { all, fork, call, takeLatest, cancel, spawn } from 'redux-saga/effects'
import { navigationOperations } from '@State/ducks/ui/navigation'
import { contentOperations } from '@State/ducks/content'

function* mainSaga() {
  const sagas = [
    fork(navigationOperations.rootFlow),
    fork(contentOperations.rootFlow),
  ].map(forkWrapper)

  yield all(sagas)
}

/**
 * The root saga is the mainSaga wrapped with timeline effects control
 */
export default function* rootSaga() {
  yield fork(mainSaga)
}

/**
 * Spawn keeps any individual saga/fork from crashing the root saga
 * TODO: restart on failure
 *
 * @param f
 */
function forkWrapper(effect) {
  return spawn(function* () {
    return yield effect
  })
}
