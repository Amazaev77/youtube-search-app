import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import classes from './auth.module.sass'
import logo from '../../../icons/sibdev-logo.svg'
import { logIn } from '../../../redux/features/auth'
import { useForm } from 'react-hook-form'
import Button from './Button'
import EyeIcon from './EyeIcon/EyeIcon'

const Authorization = () => {
  const [showPassword, setShowPassword] = useState()
  const { register, handleSubmit } = useForm()

  const dispatch = useDispatch()
  const history = useHistory()

  const error = useSelector(state => state.auth.error)
  const loading = useSelector(state => state.auth.loading)
  const token = useSelector(state => state.auth.token)

  if (!error && token) {
    history.push('/main/search')
  }

  const toggleShowPassword = () => {
    setShowPassword((value) => !value)
  }

  const onSubmit = ({ username, password }) => {
    dispatch(logIn(username, password))
  }

  return (
    <div className={classes['auth']}>
      <img
        className={classes['auth__logo']}
        src={logo} alt="logo"
      />
      <div className={classes['auth__title']}>
        Вход
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes['auth__label']}>Логин</div>
        <input
          className={classes['auth__input']}
          type="text"
          required={true}
          ref={register}
          name="username"
          placeholder="Введите логин"
        />
        <div className={classes['auth__label']}>Пароль</div>
        <input
          className={classes['auth__input']}
          type={showPassword ? 'text' : 'password'}
          required={true}
          ref={register}
          name="password"
          placeholder="Введите Пароль"
        />
        {error && (
          <div className={classes['auth__error-message']}>
            Неверный логин или пароль!
          </div>
        )}
        <EyeIcon
          showPassword={showPassword}
          toggleShowPassword={toggleShowPassword}
        />
        <Button
          loading={loading}
          className={classes['auth__button']}
        >
          Войти
        </Button>
      </form>
    </div>
  )
}

export default Authorization
