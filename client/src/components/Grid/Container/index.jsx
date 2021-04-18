import React from 'react'
import propTypes from 'prop-types'
import cx from 'classnames'
import * as container from './container.module.scss'

const Container = React.forwardRef(({ id, children, className, ...other }, ref) => {
  return (
    <div className={cx(className, container.root)} id={id} {...other} ref={ref}>
      {children}
    </div>
  )
})

Container.propTypes = {
  id: propTypes.string,
  children: propTypes.node,
  className: propTypes.string,
}

export default Container
