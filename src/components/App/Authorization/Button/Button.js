import React from 'react'
import PropTypes from 'prop-types'
import classes from './button.module.sass'
import spinner from '../../../../icons/spinner.svg'

const Button = ({ children, loading, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`${classes['button']} ${className}`}
    >
      {children}
      {loading && (
        <img
          className={classes.spinner}
          src={spinner} alt="spinner"
        />
      )}
    </button>
  )
}

Button.defaultProps = {
  className: '',
  loading: false,
  onClick: () => {}
}

Button.propTypes = {
  children: PropTypes.any
}

export default Button
