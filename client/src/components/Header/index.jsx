import React from 'react'
import cx from 'classnames'
import { useDispatch, useSelector } from 'react-redux'

import Navigation from '@Components/Navigation'
import Logo from '@Components/Logo'
import MenuToggle from '@Components/MenuToggle'
import { navigationSelectors, navigationActions } from '@State/ducks/ui/navigation'

import * as styles from './header.module.scss'

function Header({ invertPalette }) {
  const dispatch = useDispatch()
  const isMobileMenuOpen = useSelector(navigationSelectors.isMobileMenuOpen)
  const isDrawerOpen = useSelector(navigationSelectors.isDrawerOpen)

  const handleOnClick = () => {
    if (isMobileMenuOpen) {
      dispatch(navigationActions.toggleMobileMenu())
    }
  }

  return (
    <header
      className={cx(styles.header, {
        [styles.mobile_navigation__active]: isMobileMenuOpen,
        mobile_navigation__active: isMobileMenuOpen,
      })}
    >
      <Logo variant={invertPalette ? "caseStudy" : "white"} />
      <MenuToggle isOpen={isMobileMenuOpen || isDrawerOpen} />
      <Navigation invertPalette={invertPalette} onClickEvent={handleOnClick} isMenuToggleOpen={isMobileMenuOpen} />
    </header>
  )
}

export default Header
