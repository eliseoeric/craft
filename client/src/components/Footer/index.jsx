import React from 'react'
import cx from 'classnames'
import { graphql, useStaticQuery } from 'gatsby'

import Logo from '@Components/Logo'
import * as footer from './footer.module.scss'

const Footer = ({ className }) => {
  const data = useStaticQuery(graphql`
    query footerNavigation {
      allContentfulNavigationMenu(
        filter: { slug: { in: ["footer-1", "footer-2", "footer-3"] } }
      ) {
        edges {
          node {
            slug
            id
            title
            navigationItems {
              ... on ContentfulNavigationMenuLink {
                id
                title
                url
                slug
              }
            }
          }
        }
      }
    }
  `)

  const columns = data.allContentfulNavigationMenu.edges.map((item) => {
    // flatten the data a bit
    return {
      ...item.node,
    }
  }).reverse()

  
  return (
    <footer className={cx(className, footer.site__footer)}>
      <div className={cx(footer.footer__logo_wrap)}>
        <Logo variant={'gray'} title={'Craft'} />
      </div>
      <div className={cx(footer.footer__content_wrap)}>
        <div className={footer.footer__city}>
          <p>Crafted in Boston & Philly</p>
        </div>
        {columns &&
          columns.map((column) => {
            return (
              <div className={footer.footer__text} key={column.id}>
                <h3 className={footer.footer__title}>{column.title}</h3>
                <ul className={footer.footer__links}>
                    {column.navigationItems && column.navigationItems.map((item) => (
                      <li key={item.id}><a href={item.url}>{item.title}</a></li>
                    ))}
                </ul>
              </div>
            )
          })}
      </div>
    </footer>
  )
}

export default Footer
