import React from 'react'

import * as styles from './iconShowcase.module.scss'

const TypeBlock = ({ icon, iconName }) => {
  const { url } = icon.file

  return (
    <div className={styles.floating_cards__card}>
      <figure className={styles.floating_cards__icon}>
        <img src={url} alt={iconName} />
      </figure>
    </div>
  )
}

export default TypeBlock
