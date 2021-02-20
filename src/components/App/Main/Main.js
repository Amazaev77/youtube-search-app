import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import Header from './Header'
import Search from './pages/Search'
import Favorites from './pages/Favorites'
import { loadRequests } from '../../../redux/features/requests'

const Main = () => {
  const token = useSelector(state => state.auth.token)
  const userId = useSelector(state => state.auth.user.id)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadRequests(userId))
  }, [dispatch])

  if (!token) {
    return <Redirect to="/"/>
  }

  return (
    <>
      <Header/>
      <Route path='/main/search' component={Search}/>
      <Route path='/main/favorites' component={Favorites}/>
    </>
  )

}

export default Main
