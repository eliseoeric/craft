import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import cx from 'classnames'
import * as subscribe from './subscribe.module.scss'
import IconArrowRight from '@SVGs/IconArrowRight.svg'

const Subscribe = ({ className }) => {
  return (
    <>
      <p className={cx(className, subscribe.block__description)}>
        Learn about the latest promos, nutritional info, and meal changes.
      </p>
      <form method="post" action="#" className={subscribe.form}>
        <div className="subscribe-form__email">
          <label className="screen-reader-text" htmlFor="input_email1">
            Email Address
          </label>
          <input
            name="input_email"
            id="input_email1"
            type="email"
            placeholder="Email Address"
          />
          <button type="submit" className={subscribe.submit}>
            <IconArrowRight />
          </button>
        </div>
      </form>
    </>
  )
}

export default Subscribe
