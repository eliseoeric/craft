import types from '@State/ducks/ui/menu/types'

const applyNewFilter = (data) => ({
  type: types.MENU_APPLY_NEW_FILTER,
  payload: data,
});

const removeFilter = (data) => ({
  type: types.MENU_REMOVE_FILTER,
  payload: data,
})

export default {
  removeFilter,
  applyNewFilter,
}