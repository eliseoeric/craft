import React from 'react'
import PropTypes from 'prop-types'
import { Link, useStaticQuery, graphql } from 'gatsby'
import cx from 'classnames'

import Logo from '@Components/Logo'
import MenuToggle from '@Components/MenuToggle'
import NavigationItem from '@Components/NavigationItem'
import OrbContainer from '@Components/OrbContainer'
import * as styles from './navigation.module.scss'

const Navigation = ({ className, invertPalette, onClickEvent, isMenuToggleOpen }) => {
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
        [styles.navigation_container__mobile]: isMenuToggleOpen,
        
      })}
    >
      <div className={styles.logo__container}>
        <Logo variant="white" />
        <MenuToggle isOpen={isMenuToggleOpen} />
      </div>
      <span className={styles.navigation_container__text}>Menu</span>
      <ul className={styles.navigation__primary}>
        {primaryNavigation &&
          primaryNavigation.navigationItems.map((item, index) => {
            return (
              <NavigationItem
                onClickEvent={onClickEvent}
                invertPalette={invertPalette}
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
