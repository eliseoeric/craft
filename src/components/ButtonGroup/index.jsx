import React from 'react'
import * as styles from './group.module.scss'

const ButtonGroup = ({ labels, onChange, selected }) => {
  return (
    <div className={styles.btn_grp}>
      {labels.map((label) => (
        <div key={label} className={styles.btn_grp__container}>
          <input
            className={styles.btn_grp__btn}
            type="radio"
            checked={label === selected}
            readOnly
          />
          <label
            onClick={() => onChange(label)}
            className={styles.btn_grp__label}
          >
            {label}
          </label>
        </div>
      ))}
    </div>
  )
}

ButtonGroup.defaultProps = {
  labels: [],
  selected: false,
}

export default ButtonGroup
