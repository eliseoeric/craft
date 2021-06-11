import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { useDispatch } from 'react-redux'

import { navigationActions } from '@State/ducks/ui/navigation'
import * as styles from './toggle.module.scss'

const MenuToggle = ({isOpen}) => {
  const dispatch = useDispatch()
  const handleOnClick = () => {
    dispatch(navigationActions.toggleMobileMenu())
  }
  return (
    <span className={cx(styles.nav_toggle, {[styles.menu_bar__container__open]: isOpen})} onClick={handleOnClick}>
      <span className={'accessible-text'}>
        Click to toggle navigation menu.
      </span>
      <div className={cx(styles.menu_bar__container)}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </span>
  )
}

export default MenuToggle
