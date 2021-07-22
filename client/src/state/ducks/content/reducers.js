import InitialState from '@State/config/initialState'
import { ASYNC_STATUS } from '@Utils/enums'
import types from '@State/ducks/content/types'

const contentStateFromGraphql = (data) => {
  let byId = {}
  let allIds = []
  const entities = data.edges
    .map((edge) => {
      return {
        ...edge.node,
        next: edge.next ?? {}
      }
    })
    .forEach((post) => {
      byId[post.slug] = post
      allIds.push(post.slug)
    })

  return {
    byId,
    allIds,
  }
}

export default function content(state = InitialState.content, action) {
  const { type, payload } = action

  switch (type) {
    case types.POSTS__REQUEST_GET_ALL: {
      return {
        ...state,
        asyncStatus: ASYNC_STATUS.REQUESTING,
      }
    }

    case types.POSTS__ERROR_GET_ALL: {
      return {
        ...state,
        asyncStatus: ASYNC_STATUS.ERROR,
      }
    }

    case types.POSTS__SUCCESS_GET_ALL: {
      const { posts, roles, caseStudies } = payload

      const _posts = contentStateFromGraphql(posts)
      const _roles = contentStateFromGraphql(roles)
      const _caseStudies = contentStateFromGraphql(caseStudies)

      return {
        ...state,
        posts: _posts,
        roles: _roles,
        caseStudies: _caseStudies,
      }
      
    }
    default:
      return state
  }
}
