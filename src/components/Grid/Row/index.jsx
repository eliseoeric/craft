import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import * as row from './row.module.scss'

const Row = ({
  id,
  children,
  className,
  alignItems,
  justifyContent,
  flex,
  wrap,
  noMargin,
}) => (
  <div
    className={cx(className, {
      [row[`align_items__${alignItems}`]]: alignItems,
      [row[`justify_content__${justifyContent}`]]: justifyContent,
      [row['display_flex']]: flex,
      [row['flex_wrap']]: wrap,
      [row['margin_none']]: noMargin,
    })}
    id={id}
  >
    {children}
  </div>
)

Row.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  alignItems: PropTypes.oneOf([
    'stretch',
    'start',
    'center',
    'end',
    'baseline',
  ]),
  justifyContent: PropTypes.oneOf([
    'start',
    'center',
    'end',
    'around',
    'between',
  ]),
  flex: PropTypes.bool,
  wrap: PropTypes.bool,
  noMargin: PropTypes.bool,
}

Row.defaultProps = {
  id: null,
  alignItems: null,
  justifyContent: null,
  className: null,
  flex: true,
  wrap: true,
  noMargin: false,
}

export default Row
