import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { H4 } from '@Components/Typography'
import * as widget from './widget.module.scss'

const Widget = ({title, className, children, wide}) => {
  return (
    <div className={cx(className, widget.root, {[widget.wide]: wide})}>
      <H4 text={title} className={widget.column__title} />
      {children}
    </div>
  )
}

Widget.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  wide: PropTypes.bool
}

Widget.defaultProps = {
  wide: false
}

export default Widget;