import { ASYNC_STATUS } from '@Utils/enums'
const initialState = {
  content: {
    posts: {
      byId: {},
      allIds: [],
    },
    roles: {
      byId: {},
      allIds: [],
    },
    caseStudies: {
      byId: {},
      allIds: [],
    }
  },
  ui: {
    
    navigation: {
      mobileActive: false,
      loginModalActive: false,
      stateFixed: false,
      drawer: {
        isOpen: false,
        template: null,
        slug: null,
        invertPalette: null,
      },
    },
    toasts: {
      allIds: [],
      byId: {},
    },
  },
}

export default initialState
