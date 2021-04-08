import React from 'react'
import cx from 'classnames'
import * as classes from './fields.module.scss'

const RadioField = ({ aside, checked, field, index, onChange, className }) => (
  <>
    <div key={index} className={cx(classes.radio_field, className)}>
      <input
        className={classes.input_radio}
        type="radio"
        name={field.id}
        id={field.id + index}
        value={index}
        checked={checked}
        onChange={onChange}
      />
      <label className={classes.label_radio} for={field.id + index}>
        {field.labels[index]}
      </label>
    </div>
    {aside && <div className={classes.radio_field__value}>{aside}</div>}
  </>
)

export default RadioField;