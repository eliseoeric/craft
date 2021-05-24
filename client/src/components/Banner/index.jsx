import React from 'react'
import cx from 'classnames'
import * as styles from './banner.module.scss'


const Banner = ({bannerText, className}) => (
  <section className={cx(className, styles.marquee_block)}>
    <h2 className={cx(styles.marquee_block__text)}>{bannerText}</h2>
  </section>
)

export default Banner