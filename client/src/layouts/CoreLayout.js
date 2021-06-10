import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Footer from '@Components/Footer'
import Header from '@Components/Header'
import Sidebar from '@Components/Sidebar'

import '../styles/app.scss'
import * as styles from './layout.module.scss'

const CoreLayout = ({
  children,
  className,
  drawerOpen,
  hasHero,
  templateSlug,
  invertPalette,
}) => {
  return (
    <div
      className={cx('core-layout', className, `layout__${templateSlug}`, {
        [styles.drawer_wrapper]: drawerOpen,
      })}
    >
      {drawerOpen ? <Sidebar /> : <Header />}
      <main
        className={cx(styles.content_wrapper, {
          [styles.content_wrapper__flair]: !drawerOpen,
        })}
      >
        <div
          className={cx(styles.page_wrapper, {
            [styles.page_wrapper__no_hero]: !hasHero && !drawerOpen,
            [styles.page_wrapper__dark]: invertPalette,
          })}
        >
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  drawerOpen: PropTypes.bool,
  hasHero: PropTypes.bool,
  invertPalette: PropTypes.bool,
}

CoreLayout.defaultProps = {
  hasHero: false,
}

export default CoreLayout
