import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import _ from 'lodash'
import { useSelector } from 'react-redux'

import { TEMPLATES } from '@Utils/enums'
import Footer from '@Components/Footer'
import Header from '@Components/Header'
import Sidebar from '@Components/Sidebar'
import Drawer from '@Components/Drawer'
import DrawerTemplate from '@Components/DrawerTemplate'
import NextPost from '@Components/NextPost'
import { navigationSelectors } from '@State/ducks/ui/navigation'
import { contentSelectors } from '@State/ducks/content'

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
  const drawerTemplate = useSelector(navigationSelectors.getDrawerTemplate)
  const drawer = useSelector(navigationSelectors.getDrawer)
  const nextPost = useSelector(contentSelectors.getNextPost)

  const maybeRenderNextPost = ({ isOpen, template, slug }) => {
    if (isOpen && template === TEMPLATES.Post) {

      return !_.isEmpty(nextPost) && <NextPost nextPost={nextPost} />
    }
    return null
  }

  return (
    <div
      className={cx(styles.core_layout, className, `layout__${templateSlug}`, {
        [styles.drawer_wrapper]: drawerOpen,
        [styles.core_layout__dark]: invertPalette,
      })}
    >
      <Header invertPalette={invertPalette} />
      <Sidebar
        className={cx({
          [styles.sidebar__case_study]:
            drawerTemplate === TEMPLATES['Case Study'],
        })}
      />
      <main className={cx(styles.content_wrapper)}>
        <div
          className={cx(styles.page_wrapper, {
            [styles.page_wrapper__no_hero]: hasHero === false,
            [styles.page_wrapper__invertPalette]: invertPalette,
            [styles.page_wrapper__border]: !drawerOpen,
          })}
        >
          {drawerOpen && (
            <Drawer>
              <DrawerTemplate />
            </Drawer>
          )}
          {maybeRenderNextPost(drawer)}
          {!drawerOpen && children}
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
