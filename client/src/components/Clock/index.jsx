import React from 'react'
import PropTypes from 'prop-types';
import cx from 'classnames'
import * as styles from './clock.module.scss'

const Clock = ({ className, location }) => {
  return (
    <div className={cx(className, 'text-center', styles.clock__wrap)}>
      <div className={cx(styles.clock)} />
      <p>{location}</p>
    </div>
  )
}

Clock.PropTypes = {
  location: PropTypes.string.isRequired
};

export default Clock
