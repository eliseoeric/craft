import types from '@State/ducks/groups/types'

const requestGetAll = (data) => ({
  type: types.GROUP__REQUEST_GET_ALL,
  payload: data,
})

const successGetAll = (data) => ({
  type: types.GROUP__SUCCESS_GET_ALL,
  payload: data,
})

const errorGetAll = (data) => ({
  type: types.GROUP__ERROR_GET_ALL,
  payload: data,
})

export default {
  requestGetAll,
  successGetAll,
  errorGetAll,
}