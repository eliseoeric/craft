import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import * as classes from './fields.module.scss'


const PasswordField = ({ error, field, onChange, value, width }) => (
  <div
    className={cx(classes.form_row__col, {
      [classes.form_row__col__error]: error,
      [classes[`form_row__col__${width}`]]: width
    })}
  >
    <label for={field.id} className={classes.form__label}>
      {field.label}
    </label>
    <input
      type="password"
      minLength="8"
      required
      id={field.id}
      value={value}
      onChange={onChange}
      className={classes.form__input}
    />
    {error && <div className={classes.error_message}>{error}</div>}
  </div>
)

PasswordField.propTypes = {
  width: PropTypes.oneOf(['half', 'third'])
}

PasswordField.defaultProps = {
  width: null
}

export default PasswordField;