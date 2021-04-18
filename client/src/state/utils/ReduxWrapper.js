import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore as reduxCreateStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '@State/rootReducer'

import createSagaMiddleware from 'redux-saga'

import rootSaga from '@State/rootSaga'
export default ({ element }) => {
  const middleware = createSagaMiddleware()
  const store = reduxCreateStore(rootReducer, composeWithDevTools(applyMiddleware(middleware)))
  
  middleware.run(rootSaga)

  return <Provider store={store}>{element}</Provider>
}
