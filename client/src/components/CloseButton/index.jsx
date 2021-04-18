import React from 'react'
import cx from 'classnames'
import IconClose from '@SVGs/IconClose.svg'
import * as styles from './close.module.scss'

const CloseButton = ({ className, onClick }) => {
  return (
    <span className={cx(styles.action_close, className)} onClick={onClick}>
      <IconClose />
    </span>
  )
}

export default CloseButton
