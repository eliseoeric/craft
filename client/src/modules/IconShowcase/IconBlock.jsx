import React from 'react'

import * as styles from './iconShowcase.module.scss'

const IconBlock = ({ icon, iconName }) => {
  const { url } = icon.file

  return (
    <div className={styles.floating_cards__card}>
      <figure className={styles.floating_cards__icon}>
        <img src={url} />
      </figure>

      <p className={styles.floating_cards__heading_name}>{iconName}</p>
    </div>
  )
}

export default IconBlock
