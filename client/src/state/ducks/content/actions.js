import types from '@State/ducks/content/types'

const requestGetAllPosts = (data) => ({
  type: types.POSTS__REQUEST_GET_ALL,
  payload: data,
})

const successGetAllPosts = (data) => ({
  type: types.POSTS__SUCCESS_GET_ALL,
  payload: data,
})

const errorGetAllPosts = (data) => ({
  type: types.POSTS__ERROR_GET_ALL,
  payload: data,
})

export default {
  requestGetAllPosts,
  successGetAllPosts,
  errorGetAllPosts,
}
