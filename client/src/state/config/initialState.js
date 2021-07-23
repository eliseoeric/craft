import { DRAWER_STATUS } from '@Utils/enums'

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
        status: DRAWER_STATUS.CLOSED,
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
