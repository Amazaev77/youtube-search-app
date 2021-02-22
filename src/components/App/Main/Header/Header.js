import React from 'react'
import classes from './header.module.sass'
import logo from '../../../../icons/sibdev-logo.svg'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logOut } from '../../../../redux/ducks/auth'
import { clearSearchData } from '../../../../redux/ducks/search'

const Header = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(clearSearchData())
    dispatch(logOut())
  }

  return (
    <header className={classes['header']}>
      <div className={classes['container']}>
        <img className={classes['header__logo']} src={logo} alt="logo"/>
        <nav>
          <ul className={classes['menu']}>
            <li className={classes['menu__item']}>
              <NavLink
                activeClassName={classes.active}
                to='/main/search'
              >
                Поиск
              </NavLink>
            </li>
            <li className={classes['menu__item']}>
              <NavLink
                activeClassName={classes.active}
                to='/main/favorites'
              >
                Избранное
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={classes['header__logout']}>
          <Link
            onClick={handleLogout}
            to="/">
            Выйти
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
