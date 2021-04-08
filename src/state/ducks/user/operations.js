import { all, put, call, fork, takeLatest, select } from 'redux-saga/effects'
import actions from '@State/ducks/user/actions'
import types from '@State/ducks/user/types'
import CustomerService from '@Services/CustomerService'
import AuthService from '@Services/AuthService'
import { toastsOperations } from '@State/ducks/ui/toasts'
import { cartActions } from '@State/ducks/cart'
import { isValidUrl } from '@Utils/string'

const { setUserLocation } = actions

function* rootFlow() {
  yield all([
    call(initializeUser),
    takeLatest(types.USER__REQUEST_CREATE_CUSTOMER, createNewCustomer),
    // takeLatest(types.USER__REQUEST_GET_CUSTOMER, getCustomerByEmail),
    takeLatest(types.USER__REQUEST_LOGIN_CUSTOMER, loginUser),
  ])
}

function* initializeUser(action) {
  try {
    // todo this could be cleaned up
    const userResponse = yield call(AuthService.getCurrentUser)
    const { body } = userResponse

    if (body === null) {
      return;
    }

    yield put(actions.successLoginCustomer(body))
    // // yield call()
    yield put(
      toastsOperations.addNewToast({
        title: `Welcome back, ${body.firstName}`,
        message: `Logged in Successfully as ${body.email}.`,
        variant: 'success',
      })
    )

    // sync cart/attach cart to customer
    yield put(
      cartActions.requestUpdateCustomerId({
        customerId: body.entityId,
      })
    )

    // attach customer to cart
  } catch (error) {
    console.error(error)
    yield put(actions.errorLoginUser(error))
  }
}

function* createNewCustomer(action) {
  const customer = action.payload
  try {
    let response = yield call(CustomerService.createCustomer, customer)
    // todo need to successfully log the user in and send a toast
    yield put(actions.successCreateCustomer(response))
    yield put(
      toastsOperations.addNewToast({
        title: 'Account Created Successfully',
        message: `New account was successfully created for ${response[0].email}.`,
        variant: 'success',
      })
    )
  } catch (error) {
    console.error(error)
    yield put(actions.errorCreateCustomer(error))
  }
}

function* loginUser(action) {
  const { payload } = action
  try {
    let authResponse = yield call(AuthService.authenticateCustomer, payload)

    // todo this could be cleaned up
    if (authResponse.error === 0 && authResponse.body.result === 'success') {
      const userResponse = yield call(AuthService.getCurrentUser)
      const { body } = userResponse

      yield put(actions.successLoginCustomer(body))
      // // yield call()
      yield put(
        toastsOperations.addNewToast({
          title: `Welcome back, ${body.firstName}`,
          message: `Logged in Successfully as ${body.email}.`,
          variant: 'success',
        })
      )

      // sync cart/attach cart to customer
      yield put(
        cartActions.requestUpdateCustomerId({
          customerId: body.entityId,
        })
      )
    }

    // attach customer to cart
  } catch (error) {
    console.error(error)
    yield put(actions.errorLoginUser(error))
  }
}

export default {
  setUserLocation,
  rootFlow,
}
