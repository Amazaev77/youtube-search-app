import React from 'react'
import classes from './eye-icon.module.sass'

const EyeIcon = ({ showPassword, toggleShowPassword }) => {
  return (
    showPassword ? (
      <span onClick={toggleShowPassword} className={`material-icons ${classes['eye-icon']}`}>
        visibility
      </span>
    ) : (
      <span onClick={toggleShowPassword} className={`material-icons ${classes['eye-icon']}`}>
        visibility_off
      </span>
    )
  )
}

export default EyeIcon
