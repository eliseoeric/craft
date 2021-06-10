import React from 'react'
import PropTypes from 'prop-types'

import * as banner from './banner.module.scss'

const Banner = ({ text }) => {
  return (
    <section className={banner.marquee_block}>
      <h2 className={banner.marquee_block__text}>
        <div className={banner.marquee_block__scroll}>
          {Array(3)
            .fill(null)
            .map((_) => (
              <div className={banner.marquee_block__inner}>{text}</div>
            ))}
        </div>
      </h2>
    </section>
  )
}

Banner.propTypes = {
  text: PropTypes.string,
}

Banner.defaultProps = {}

export default Banner
