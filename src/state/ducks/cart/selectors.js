const getAllCartItems = (state) => {
  return state.cart.items.allIds.map((id) => state.cart.items.byId[id]);
}

const getCartId = (state) => {
  return state.cart.id;
}

const getCartTotal = (state) => {
  return state.cart.cart_amount;
}


const getCartSubTotal = (state) => {
  return state.cart.base_amount;
}

const getCartItemCount = (state) => {
  return state.cart.items.allIds.length ?? 0;
}

// tax
// delivery fee?
// discount amount

export default {
  getAllCartItems,
  getCartId,
  getCartTotal,
  getCartSubTotal,
getCartItemCount,
}