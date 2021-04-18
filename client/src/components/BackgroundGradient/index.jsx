import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Gradient01 from '@SVGs/gradient-01.svg'

import * as styles from './styles.module.scss'

const BackgroundGradient = ({}) => {
  return (
    <div className={cx(styles.root)}>
      <Gradient01 alt="gradient-01" />
    </div>
  )
}

export default BackgroundGradient
