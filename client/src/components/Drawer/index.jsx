import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import { useSelector, useDispatch } from 'react-redux'

import {
  navigationActions,
  navigationSelectors,
} from '@State/ducks/ui/navigation'
import CloseButton from '@Components/CloseButton'
import { DRAWER_STATUS } from '@Utils/enums'

import * as styles from './drawer.module.scss'

const isBrowser = typeof window !== `undefined`

const Drawer = ({ className, children }) => {
  const dispatch = useDispatch()
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const drawerTemplate = useSelector(navigationSelectors.getDrawerTemplate)
  const drawerStatus = useSelector(navigationSelectors.getDrawerStatus)

  const toggleDrawer = () => {
    dispatch(navigationActions.requestCloseDrawer())
    if (isBrowser) {
      window.scrollTo(0, prevScrollPos)
    }
  }

  useEffect(() => {
    if (isBrowser) {
      setPrevScrollPos(window.scrollY)
      window.scrollTo(0, 0)
    }
  }, [])

  return (
    <div
      className={cx(styles.drawer, styles.slide_in_left_full, className, {
        [styles.slide_out_right_full]: drawerStatus === DRAWER_STATUS.CLOSING,
        [styles[`drawer__${drawerTemplate}`]]: drawerTemplate,
      })}
    >
      <CloseButton onClick={toggleDrawer} />

      {children}
    </div>
  )
}

export default Drawer
