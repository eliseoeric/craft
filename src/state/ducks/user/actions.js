import types from '@State/ducks/user/types'

const setUserLocation = (data) => ({
  type: types.USER__SET_STORE,
  payload: data,
})

const requestCreateCustomer = (data) => ({
  type: types.USER__REQUEST_CREATE_CUSTOMER,
  payload: data,
})

const successCreateCustomer = (data) => ({
  type: types.USER__SUCCESS_CREATE_CUSTOMER,
  payload: data,
})

const errorCreateCustomer = (data) => ({
  type: types.USER__ERROR_CREATE_CUSTOMER,
  payload: data,
})

const requestGetCustomer = (data) => ({
  type: types.USER__REQUEST_GET_CUSTOMER,
  payload: data,
})

const successGetCustomer = (data) => ({
  type: types.USER__SUCCESS_GET_CUSTOMER,
  payload: data,
})

const errorGetCustomer = (data) => ({
  type: types.USER__ERROR_GET_CUSTOMER,
  payload: data,
})

const requestLoginCustomer = (data) => ({
  type: types.USER__REQUEST_LOGIN_CUSTOMER,
  payload: data,
})

const successLoginCustomer = (data) => ({
  type: types.USER__SUCCESS_LOGIN_CUSTOMER,
  payload: data,
})

const errorLoginCustomer = (data) => ({
  type: types.USER__ERROR_LOGIN_CUSTOMER,
  payload: data,
})

export default {
  setUserLocation,
  requestCreateCustomer,
  successCreateCustomer,
  errorCreateCustomer,
  requestLoginCustomer,
  successLoginCustomer,
  errorLoginCustomer,
  requestGetCustomer,
  successGetCustomer,
  errorGetCustomer,
}
