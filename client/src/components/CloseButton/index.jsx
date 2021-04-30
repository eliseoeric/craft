import React from 'react'
import cx from 'classnames'
import IconClose from '@SVGs/icon-close.svg'
import * as styles from './close.module.scss'

const CloseButton = ({ className, onClick }) => (
  <button onClick={onClick} className={cx(styles.action_close, className)}>
    <IconClose />
  </button>
)

export default CloseButton
