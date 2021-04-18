import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { navigate } from '@reach/router'
import cx from 'classnames'
import * as button from './button.module.scss'

const Button = ({
  variant,
  size,
  url,
  className,
  isLink,
  children,
  onClick,
  fullWidth,
  ...other
}) => {
  const localHandleClick = () => {
    onClick && onClick()
    url && navigate(url)
  }

  if (isLink) {
    return (
      <Link
        to={url}
        className={cx(button.root, className, {
          [button[`button__${variant}`]]: variant,
          [button[`button__${size}`]]: size,
          [button[`button__full_width`]]: fullWidth,
        })}
        {...other}
      >
        {children}
      </Link>
    )
  }

  return (
    <a
      onClick={localHandleClick}
      href={url}
      className={cx(button.root, className, {
        [button[`button__${variant}`]]: variant,
        [button[`button__${size}`]]: size,
        [button[`button__full_width`]]: fullWidth,
      })}
      {...other}
    >
      {children}
    </a>
  )
}

Button.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.oneOf([
    'default',
    'secondary',
    'primary',
    'secondary_light',
    'primary_light',
    'inverse',
  ]),
  size: PropTypes.oneOf(['large', 'extra_large', 'small', 'full_width']),
  url: PropTypes.string,
  isLink: PropTypes.bool,
}

Button.defaultProps = {
  variant: 'default',
  size: null,
  url: null,
  isLink: true,
}

export default Button
