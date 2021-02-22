import { v4 as uuidv4 } from 'uuid';
import { LOG_IN_FAILED, LOG_IN_STARTED, LOG_IN_SUCCEEDED, LOG_OUT } from '../types';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  token: localStorage.getItem('token'),
  loading: false,
  error: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOG_IN_STARTED:
      return {
        ...state,
        loading: true,
        error: false
      }
    case LOG_IN_SUCCEEDED:
      return {
        ...state,
        loading: false,
        error: false,
        token: action.payload.token,
        user: action.payload.user
      }
    case LOG_IN_FAILED:
      return {
        ...state,
        loading: false,
        error: true
      }
    case LOG_OUT:
      return {
        user: null,
        token: null,
        loading: false,
        error: false
      }
    default:
      return state
  }
}

export const logIn = (username, password) => {
  return dispatch => {
    dispatch({ type: LOG_IN_STARTED })

    fetch('/users')
      .then(res => res.json())
      .then(users => {
        const foundUser = users.find(user => {
          return (
            user.username === username && (
              user.password === password
            ))
        })

        // фейковая авторизаци
        // в реальном использовал бы JWT
        const token = uuidv4()

        if (foundUser) {
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(foundUser))
          dispatch({
            type: LOG_IN_SUCCEEDED,
            payload: {
              token,
              user: foundUser
            }
          })
        }
        if (!foundUser) {
          dispatch({ type: LOG_IN_FAILED })
        }
      })
  }
}

export const logOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  return { type: LOG_OUT };
}

