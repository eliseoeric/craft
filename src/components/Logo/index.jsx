import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import cx from 'classnames'
import * as logo from './logo.module.scss'
import BrandLogo from '@SVGs/logo.svg'
import FooterLogo from '@SVGs/footer-logo.svg'

const Logo = ({ variant, className }) => {
  // todo update this to get two logos (small and regular)
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
    default: {
      class: 'logo__large',
      src: BrandLogo,
    },
    small: {
      class: 'logo__small',
      src: BrandLogo,
    },
    footer: {
      class: 'logo__footer',
      src: FooterLogo,
    },
  }

  const LogoComponent = variantMap[variant].src

  return (
    <Link to="/" className={cx(className, logo[variantMap[variant].class])}>
      <LogoComponent alt={title} />
    </Link>
  )
}

Logo.defaultProps = {
  variant: 'default',
}

Logo.propTypes = {
  variant: PropTypes.string,
  className: PropTypes.string,
}

// todo add prop types

export default Logo