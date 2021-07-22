import React from 'react'
import cx from 'classnames'
import { useDispatch, useSelector } from 'react-redux'

import { TEMPLATES, DRAWER_STATUS } from '@Utils/enums'
import Navigation from '@Components/Navigation'
import Logo from '@Components/Logo'
import MenuToggle from '@Components/MenuToggle'
import {
  navigationSelectors,
  navigationActions,
} from '@State/ducks/ui/navigation'

import * as styles from './header.module.scss'

function Header({ invertPalette }) {
  const dispatch = useDispatch()
  const isMobileMenuOpen = useSelector(navigationSelectors.isMobileMenuOpen)
  const drawerStatus = useSelector(navigationSelectors.getDrawerStatus)
  const drawerTemplate = useSelector(navigationSelectors.getDrawerTemplate)

  const handleOnClick = () => {
    if (isMobileMenuOpen) {
      dispatch(navigationActions.toggleMobileMenu())
    }
  }

  const getLogoVariant = () => {
    if (drawerTemplate === TEMPLATES['Case Study'] || invertPalette) {
      return TEMPLATES['Case Study']
    }

    return 'white'
  }

  return (
    <header
      className={cx(styles.header, {
        [styles.mobile_navigation__active]: isMobileMenuOpen,
        mobile_navigation__active: isMobileMenuOpen,
      })}
    >
      <Logo variant={getLogoVariant()} />
      <MenuToggle
        isOpen={isMobileMenuOpen || drawerStatus !== DRAWER_STATUS.CLOSED }
        invertPalette={invertPalette}
      />
      <Navigation
        invertPalette={invertPalette}
        onClickEvent={handleOnClick}
        isMenuToggleOpen={isMobileMenuOpen}
      />
    </header>
  )
}

export default Header
