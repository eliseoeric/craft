import types from '@State/ducks/cart/types'

const requestAddToCart = (data) => ({
  type: types.CART__REQUEST_ADD_ITEM,
  payload: data,
})

const successAddToCart = (data) => ({
  type: types.CART__SUCCESS_ADD_ITEM,
  payload: data,
})

const errorAddToCart = () => ({
  type: types.CART__ERROR_ADD_ITEM,
})

const requestUpdateCartItem = (data) => ({
  type: types.CART__REQUEST_UPDATE_ITEM,
  payload: data,
})

const successUpdateCartItem = (data) => ({
  type: types.CART__SUCCESS_UPDATE_ITEM,
  payload: data,
})

const errorUpdateCartItem = () => ({
  type: types.CART__ERROR_UPDATE_ITEM,
})

const requestRemoveCartItem = (data) => ({
  type: types.CART__REQUEST_REMOVE_ITEM,
  payload: data,
})

const successRemoveCartItem = (data) => ({
  type: types.CART__SUCCESS_REMOVE_ITEM,
  payload: data,
})

const errorRemoveCartItem = () => ({
  type: types.CART__ERROR_REMOVE_ITEM,
})

const requestCreateCart = (data) => ({
  type: types.CART__REQUEST_CREATE_CART,
  payload: data,
})

const successCreateCart = (data) => ({
  type: types.CART__SUCCESS_CREATE_CART,
  payload: data,
})

const errorCreateCart = (data) => ({
  type: types.CART__ERROR_CREATE_CART,
  payload: data,
})

const requestGetCart = (data) => ({
  type: types.CART__REQUEST_GET_CART,
  payload: data,
})

const successGetCart = (data) => ({
  type: types.CART__SUCCESS_GET_CART,
  payload: data,
})

const errorGetCart = (data) => ({
  type: types.CART__ERROR_GET_CART,
  payload: data,
})

const requestUpdateCart = (data) => ({
  type: types.CART__REQUEST_UPDATE_CART,
  payload: data,
})

const successUpdateCart = (data) => ({
  type: types.CART__SUCCESS_UPDATE_CART,
  payload: data,
})

const errorUpdateCart = (data) => ({
  type: types.CART__ERROR_UPDATE_CART,
  payload: data,
})

const requestInitiateCart = (data) => ({
  type: types.CART__REQUEST_INITIATE,
  payload: data,
})

const successInitiateCart = (data) => ({
  type: types.CART__SUCCESS_INITIATE,
  payload: data,
})

const errorInitiateCart = (data) => ({
  type: types.CART__ERROR_INITIATE,
  payload: data,
})

const requestUpdateCustomerId = (data) => ({
  type: types.CART__REQUEST_UPDATE_CUSTOMER_ID,
  payload: data,
})

const successUpdateCustomerId = (data) => ({
  type: types.CART__SUCCESS_UPDATE_CUSTOMER_ID,
  payload: data,
})

const errorUpdateCustomerId = (data) => ({
  type: types.CART__ERROR_UPDATE_CUSTOMER_ID,
  payload: data,
})

export default {
  requestAddToCart,
  successAddToCart,
  errorAddToCart,
  requestRemoveCartItem,
  successRemoveCartItem,
  errorRemoveCartItem,
  requestUpdateCartItem,
  successUpdateCartItem,
  errorUpdateCartItem,
  requestCreateCart,
  successCreateCart,
  errorCreateCart,
  requestGetCart,
  successGetCart,
  errorGetCart,
  requestInitiateCart,
  successInitiateCart,
  errorInitiateCart,
  requestUpdateCart,
  successUpdateCart,
  errorUpdateCart,
  requestUpdateCustomerId,
  successUpdateCustomerId,
  errorUpdateCustomerId,
}
