const initialState = {
  ui: {
    navigation: {
      mobileActive: false,
      loginModalActive: false,
      stateFixed: false,
    },
    cart: {
      quickCartActive: false,
    },
    menu: {
      filters: {},
    },
    toasts: {
      allIds: [],
      byId: {},
    },
  },
  cart: {
    base_amount: 0,
    cart_amount: 0,
    coupons: [],
    customer_id: null,
    email: null,
    id: null,
    items: {
      allIds: [],
      byId: {},
    },
  },
  groups: {
    allIds: [],
    byId: {},
  },
  user: {
    store: {},
    customer: {},
  },
}

export default initialState
