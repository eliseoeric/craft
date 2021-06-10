import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Link, useStaticQuery, graphql } from 'gatsby'
import cx from 'classnames'

import { navigationSelectors } from '@State/ducks/ui/navigation'
import Logo from '@Components/Logo'
import MenuToggle from '@Components/MenuToggle'
import NavigationItem from '@Components/NavigationItem'
import OrbContainer from '@Components/OrbContainer'
import * as styles from './navigation.module.scss'

const Navigation = ({ className }) => {
  const isMobileMenuOpen = useSelector(navigationSelectors.isMobileMenuOpen)
  // todo onClick handler for navigation toggle
  const data = useStaticQuery(graphql`
    query navigation {
      allContentfulNavigationMenu(
        filter: { slug: { in: ["primary-navigation"] } }
      ) {
        edges {
          node {
            slug
            id
            navigationItems {
              canonicalUrl
              slug
              title
            }
          }
        }
      }
    }
  `)

  const primaryNavigation = data.allContentfulNavigationMenu.edges[0].node

  return (
    <nav
      className={cx(className, styles.navigation_container, {
        [styles.navigation_container__mobile]: isMobileMenuOpen,
      })}
    >
      <div className={styles.logo__container}>
        <Logo variant="white" />
        <MenuToggle isOpen={isMobileMenuOpen} />
      </div>
      <span className={styles.navigation_container__text}>Menu</span>
      <ul className={styles.navigation__primary}>
        {primaryNavigation &&
          primaryNavigation.navigationItems.map((item, index) => {
            return (
              <NavigationItem
                title={item.title}
                url={`/${item.slug}`}
                key={index}
              />
            )
          })}
      </ul>
      <OrbContainer
        className={styles.mobile_orb_container}
        originXGetter={() => window.innerWidth / 7}
        originYGetter={() => window.innerHeight / 5}
        radiusRange={[250, 275]}
      />
    </nav>
  )
}

export default Navigation
