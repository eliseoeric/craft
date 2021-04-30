import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import cx from 'classnames'

import LogoWhite from '@SVGs/logo-white.svg'
import LogoDark from '@SVGs/logo-dark.svg'
import LogoGray from '@SVGs/logo-gray.svg'

import * as logo from './logo.module.scss'

const Logo = ({ variant, className }) => {
  const data = useStaticQuery(graphql`
    query LogoQuery {
      site {
        siteMetadata {
          title
          image
        }
      }
    }
  `)

  const { title } = data.site.siteMetadata

  const variantMap = {
    white: {
      class: 'logo__white',
      src: LogoWhite,
    },
    gray: {
      class: 'logo__gray',
      src: LogoGray,
    },
    dark: {
      class: 'logo__dark',
      src: LogoDark,
    },
  }

  const LogoComponent = variantMap[variant].src

  return (
    <Link to="/" className={cx(className, logo[variantMap[variant].class], logo.logo__all)}>
      <LogoComponent alt={title} />
    </Link>
  )
}

Logo.defaultProps = {
  variant: 'dark',
}

Logo.propTypes = {
  variant: PropTypes.oneOf(['white', 'gray', 'dark']),
  className: PropTypes.string,
}

export default Logo