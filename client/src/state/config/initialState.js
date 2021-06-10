const initialState = {
  ui: {
    navigation: {
      mobileActive: false,
      loginModalActive: false,
      stateFixed: false,
      drawer: {
        isOpen: false,
        template: null,
        slug: null,
      }
    },
    toasts: {
      allIds: [],
      byId: {},
    },
  },
}

export default initialState
