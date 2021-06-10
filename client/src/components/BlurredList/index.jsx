import React, { useState } from 'react'
import cx from 'classnames'

import * as styles from './blurredList.module.scss'

const BlurredList = ({ items, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1)

  const handleMouseOver = (event, index) => {
    event.stopPropagation()
    console.log('over called')
    setHoveredIndex(index)
  }

  const handleMouseLeave = () => {
    console.log('leave called')
    setHoveredIndex(-1)
  }

  return (
    <ul className={cx(styles.list, className)} onMouseOver={handleMouseLeave}>
      {items &&
        items.map((item, index) => (
          <li
            key={index}
            className={cx(styles.list_item, {
              [styles.fade]: index !== hoveredIndex && hoveredIndex !== -1,
            })}
          >
            <a
              href={item.url}
              onMouseOver={(event) => handleMouseOver(event, index)}
            >
              {item.text}
            </a>
          </li>
        ))}
    </ul>
  )
}

export default BlurredList
