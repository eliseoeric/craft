import React from 'react'
import cx from 'classnames'

import Logo from '@Components/Logo'

import * as styles from './header.module.scss'

function Header() {
  return (
    <header className={cx(styles.header)}>
      <Logo variant="white" />
      <nav />
    </header>
  )
}

export default Header
