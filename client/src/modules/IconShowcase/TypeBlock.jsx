import React from 'react'
import cx from 'classnames'

import * as styles from './iconShowcase.module.scss'

const TypeBlock = ({ iconName }) => {
  // TODO: dynamically load fonts not in build
  const font = iconName.toLowerCase().replace(' ', '_') // ex. gotham_bold

  return (
    <div className={styles.floating_cards__card}>
      <h3
        className={cx(styles.floating_cards__heading, styles[`type__${font}`])}
      >
        Aa
      </h3>

      <p className={styles.floating_cards__heading_name}>{iconName}</p>
    </div>
  )
}

export default TypeBlock
