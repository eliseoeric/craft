import React from 'react'
import cx from 'classnames'
import { useSelector, useDispatch } from 'react-redux'

import {
  navigationActions,
  navigationSelectors,
} from '@State/ducks/ui/navigation'
import { DRAWER_STATUS } from '@Utils/enums'
import * as styles from './sidebar.module.scss'

const Sidebar = ({ className }) => {
  const dispatch = useDispatch()
  const drawerStatus = useSelector(navigationSelectors.getDrawerStatus)

  const toggleDrawer = () => {
    if (drawerStatus === DRAWER_STATUS.OPEN) {
      dispatch(navigationActions.requestCloseDrawer())
    }
  }

  return (
    <section
      className={cx(styles.root, className)}
      onClick={toggleDrawer}
    ></section>
  )
}

export default Sidebar
