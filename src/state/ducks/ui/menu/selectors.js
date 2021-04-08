const getAllFilters = (state) => state.ui.menu.filters

// todo make this a create selector to slice the state
const filtersEnabled = (state) => {
  let filters = {
    ...state.ui.menu.filters,
  }

  let dump = Object.keys(filters)
    .map((key) => {
      return filters[key]
    })
    .flat()
    .filter((i) => i != null)

  return dump.length > 0
}
export default {
  getAllFilters,
  filtersEnabled,
}
