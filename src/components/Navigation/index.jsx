import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link, useStaticQuery } from 'gatsby'
import cx from 'classnames'
import navigation from './navigation.module.scss'
import NavigationItem from '@Components/NavigationItem'

const Navigation = ({ className }) => {
  // todo onClick handler for navigation toggle
  const data = useStaticQuery(graphql`
    query navigation {
      allContentfulNavigationMenu(
        filter: { slug: { in: ["primary-nav", "secondary-nav"] } }
      ) {
        edges {
          node {
            slug
            id
            navigationMenuItems {
              canonicalUrl
              slug
              title
            }
          }
        }
      }
    }
  `)

  const primaryNavItems = data.allContentfulNavigationMenu.edges
    .map((item) => {
      const { node } = item
      return node
    })
    .find((node) => node.slug === 'primary-nav')

  // todo add query to pull in nav items

  const secondaryNavItems = data.allContentfulNavigationMenu.edges
    .map((item) => {
      const { node } = item
      return node
    })
    .find((node) => node.slug === 'secondary-nav')

  return (
    <nav className={cx(className, navigation.root)}>
      <ul className={navigation.navigation__primary}>
        {primaryNavItems &&
          primaryNavItems.navigationMenuItems.map((item, index) => {
            return (
              <NavigationItem
                title={item.title}
                url={`/${item.slug}`}
                key={index}
              />
            )
          })}
      </ul>

      <ul className={navigation.navigation__secondary}>
        {secondaryNavItems &&
          secondaryNavItems.navigationMenuItems.map((item, index) => {
            return (
              <NavigationItem
                title={item.title}
                url={`/${item.slug}`}
                key={index}
              />
            )
          })}
      </ul>
    </nav>
  )
}

export default Navigation