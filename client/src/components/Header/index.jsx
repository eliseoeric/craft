import React from 'react'
import cx from 'classnames'
import { useSelector } from 'react-redux'

import Navigation from '@Components/Navigation'
import Logo from '@Components/Logo'
import MenuToggle from '@Components/MenuToggle'
import { navigationSelectors } from '@State/ducks/ui/navigation'

import * as styles from './header.module.scss'

function Header() {
  const isMobileMenuOpen = useSelector(navigationSelectors.isMobileMenuOpen)
  return (
    <header
      className={cx(styles.header, {
        [styles.mobile_navigation__active]: isMobileMenuOpen,
        'mobile_navigation__active': isMobileMenuOpen,
      })}
    >
      <Logo variant="white" />
      <MenuToggle isOpen={isMobileMenuOpen} />
      <Navigation />
    </header>
  )
}

export default Header
