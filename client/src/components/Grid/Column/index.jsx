import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { isObject } from '@Utils/object'

// todo this is configured for bootstrap css at the moment,
// and needs to be refactored to work in our system
const Column = (props) => {
  const { children, id, className } = props

  const colWidths = ['xs', 'sm', 'md', 'lg', 'xl']

  const columns = colWidths.map((width) => {
    const columnProp = props[width]

    // guard against empty props
    if (!columnProp || columnProp === '') {
      return null
    }

    // check if column prop is an object
    if (isObject(columnProp)) {
      return cx({
        [`col-${width}-${columnProp.size}`]: columnProp.size,
        [`offset-${width}-${columnProp.offset}`]: columnProp.offset,
        [`order-${width}-${columnProp.order}`]: columnProp.order,
      })
    }

    return `col-${width}-${columnProp}`
  })

  return (
    <div className={cx(...columns, className, 'col')} id={id}>
      {children}
    </div>
  )
}

const columnProps = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.shape({
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    order: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
])

Column.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node.isRequired,
  xs: columnProps,
  sm: columnProps,
  md: columnProps,
  lg: columnProps,
  xl: columnProps,
  className: PropTypes.string,
}

Column.defaultProps = {
  id: null,
  sm: 12,
}

export default Column
