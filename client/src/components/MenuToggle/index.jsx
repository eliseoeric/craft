import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { useDispatch, useSelector } from 'react-redux'

import { DRAWER_STATUS } from '@Utils/enums'
import {
  navigationActions,
  navigationSelectors,
} from '@State/ducks/ui/navigation'
import * as styles from './toggle.module.scss'

const MenuToggle = ({ isOpen, invertPalette }) => {
  const dispatch = useDispatch()
  const drawerStatus = useSelector(navigationSelectors.getDrawerStatus)
  
  const handleOnClick = () => {
    if (drawerStatus === DRAWER_STATUS.OPEN) {
      dispatch(navigationActions.requestCloseDrawer())
    } 

    if (drawerStatus === DRAWER_STATUS.CLOSED) {
      dispatch(navigationActions.toggleMobileMenu())
    }
  }

  console.log({invertPalette})
  return (
    <span
      className={cx(styles.nav_toggle, {
        [styles.menu_bar__container__open]: isOpen,
        [styles.menu_bar__invert_palette]: invertPalette,
      })}
      onClick={handleOnClick}
    >
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
