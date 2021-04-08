import { all, put, call, fork, takeLatest, select } from 'redux-saga/effects'
import { retrieveFromStorage, persistToStorage } from '@Utils/storage'
import actions from '@State/ducks/cart/actions'
import selectors from '@State/ducks/cart/selectors'
import types from '@State/ducks/cart/types'
import CartService from '@Services/CartService'
import { toastsOperations } from '@State/ducks/ui/toasts'

const CART_STORAGE_KEY = 'kitch_big_commerce_cart_id'

function* rootFlow() {
  yield all([
    call(initializeCart),
    takeLatest(types.CART__REQUEST_ADD_ITEM, addItemToCart),
    takeLatest(types.CART__REQUEST_UPDATE_ITEM, updateCartItem),
    takeLatest(types.CART__REQUEST_REMOVE_ITEM, removeItemFromCart),
    takeLatest(types.CART__REQUEST_UPDATE_CUSTOMER_ID, updateCustomerId),
  ])
}

/**
 * Retrieves a cart from the API if the user has one stored in their local storage,
 * this allows users to re-visit carts from previous sessions
 * @param {*} action
 */
function* initializeCart(action) {
  // attempt to get cart from storage
  // don't create it if it doesn't exist though, we don't need a cart per visit
  try {
    yield put(actions.requestInitiateCart())
    const maybeCart = retrieveFromStorage(CART_STORAGE_KEY, null)

    if (maybeCart) {
      // get the cart, and sync with state
      yield call(getCart, { id: maybeCart })

      yield put(actions.successInitiateCart())
    }
  } catch (error) {
    console.error(error)
    yield put(actions.errorInitiateCart(error))
  }
}

/**
 * Adds an item to the cart; If the user does not have a cart yet,
 * it will add it
 * @param {*} action
 */
function* addItemToCart(action) {
  // todo add a loading status
  const { item } = action.payload
  try {
    // get the cart first
    let cartId = yield select(selectors.getCartId)
    // if no cart, create it
    if (!cartId) {
      yield call(createCart, { payload: [item] })
    } else {
      yield call(updateCart, { payload: { cartId, item } })
    }

    yield put(actions.successAddToCart())

    yield put(
      toastsOperations.addNewToast({
        title: 'Item Added to Cart',
        message: `${item.name} has been to your cart.`,
        variant: 'success',
      })
    )
  } catch (error) {
    yield put(actions.errorAddToCart(error))
    console.error(error, action)
    // toast indicating failure
    yield put(
      toastsOperations.addNewToast({
        title: 'Could not add Item to Cart',
        message: `${item.name} was unable to be added to your cart. Please try again shortly.`,
        variant: 'error',
      })
    )
  }
}

function* removeItemFromCart(action) {
  const { item } = action.payload
  try {
    let cartId = yield select(selectors.getCartId)
    // dont remove from cart, if cart doesn't exist
    if (!cartId) {
      return
    }
    yield call(CartService.removeItemFromCart, cartId, item)
    yield call(getCart, { id: cartId })

    yield put(actions.successRemoveCartItem())
  } catch (error) {
    yield put(actions.errorRemoveCartItem(error))
    console.error(error, action)
    // toast indicating failure
    yield put(
      toastsOperations.addNewToast({
        title: 'Could not remove Item from Cart',
        message: `Unable to be update to your cart. Please try again shortly.`,
        variant: 'error',
      })
    )
  }
}

function* updateCart(action) {
  const { cartId, item } = action.payload
  try {
    let cart = yield call(CartService.addItemToCart, cartId, item)
    yield put(actions.successUpdateCart(cart))
  } catch (error) {
    yield put(actions.errorUpdateCart(error))
    console.error(error)
  }
}

function* updateCartItem(action) {
  const { item } = action.payload

  try {
    let cartId = yield select(selectors.getCartId)
    let cart = yield call(CartService.updateCartItem, cartId, item)
    yield put(actions.successUpdateCartItem(cart))
  } catch (error) {
    console.error(error)
    yield put(actions.errorUpdateCartItem(error))
  }
}

function* getCart(action) {
  const { id } = action
  try {
    yield put(actions.requestGetCart())
    let cart = yield call(CartService.getCart, id)
    yield put(actions.successGetCart(cart))
  } catch (error) {
    console.error('[DEBUG] Error getting cart', error)
    yield put(actions.errorGetCart(error))
  }
}

function* createCart(action) {
  const { payload } = action
  yield put(actions.requestCreateCart()) // to create event listern for this (register w/takelatest)
  try {
    let cart = yield call(CartService.createCart, payload)
    persistToStorage(CART_STORAGE_KEY, cart.id)
    yield put(actions.successCreateCart(cart))
    return cart
  } catch (error) {
    console.error('[DEBUG] Error creating cart', error)
    yield put(actions.errorCreateCart(error))
  }
}

function* updateCustomerId(action) {
  const { customerId } = action.payload
  let cartId = yield select(selectors.getCartId)
  try {
    let cart = yield call(CartService.updateCustomerId, cartId, customerId)
    yield put(actions.successUpdateCustomerId(cart))
  } catch (error) {
    console.error('[DEBUG] Error updating customer id for cart')
    yield put(actions.errorUpdateCustomerId(error))
  }
}

export default {
  rootFlow,
  addItemToCart,
  removeItemFromCart,
}
