import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import cx from 'classnames'
import { useSelector, useDispatch } from 'react-redux'

import {
  navigationActions,
  navigationSelectors,
} from '@State/ducks/ui/navigation'
import CloseButton from '@Components/CloseButton'

import * as styles from './drawer.module.scss'

const Drawer = ({ className, children }) => {
  const dispatch = useDispatch();
  const drawer = useSelector(navigationSelectors.getDrawer)

  const toggleDrawer = () => {
    dispatch(navigationActions.requestCloseDrawer())
  }

  return (
    <div
      className={cx(styles.drawer, styles.slide_in_left_full, className, {
        [styles.slide_out_right_full]: !drawer.isOpen,
      })}
    >
      <CloseButton onClick={toggleDrawer} />

      {children}
    </div>
  )
}

export default Drawer
