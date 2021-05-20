import React from 'react'
import cx from 'classnames'

import Logo from '@Components/Logo'

import styles from './header.module.scss'

function Header() {
  return (
    <header className={cx(styles.header, styles.js_header)}>
      <Logo variant="white" />
      <nav className={styles.nav_container} />
    </header>
  )
}

export default Header
