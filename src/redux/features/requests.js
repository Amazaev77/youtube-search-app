import {
  ADD_REQUEST_STARTED,
  ADD_REQUEST_SUCCEEDED,
  DELETE_REQUEST_STARTED,
  DELETE_REQUEST_SUCCEEDED,
  EDIT_REQUEST_STARTED,
  EDIT_REQUEST_SUCCEEDED,
  HIDE_MODAL,
  LOAD_REQUESTS_STARTED,
  LOAD_REQUESTS_SUCCEEDED,
  SHOW_MODAL
} from '../types'

const initialState = {
  requests: null,
  loading: false,
  deleting: false,
  adding: false,
  showModalWindow: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_REQUESTS_STARTED:
      return {
        ...state,
        loading: true
      }
    case LOAD_REQUESTS_SUCCEEDED:
      return {
        ...state,
        loading: false,
        requests: action.payload
      }
    case DELETE_REQUEST_STARTED:
      return {
        ...state,
        deleting: action.payload
      }
    case DELETE_REQUEST_SUCCEEDED:
      return {
        ...state,
        deleting: false,
        requests: state.requests.filter(
          req => req.id !== action.payload
        )
      }
    case ADD_REQUEST_STARTED:
      return {
        ...state,
        adding: true
      }
    case ADD_REQUEST_SUCCEEDED:
      return {
        ...state,
        adding: false,
        requests: [
          ...state.requests,
          action.payload
        ]
      }
    case SHOW_MODAL:
      return {
        ...state,
        showModalWindow: true
      }
    case HIDE_MODAL:
      return {
        ...state,
        showModalWindow: false
      }
    case EDIT_REQUEST_STARTED:
      return {
        ...state,
        editing: true
      }
    case EDIT_REQUEST_SUCCEEDED:
      return {
        ...state,
        editing: false,
        requests: state.requests.map(item => {
          if (item.id === action.payload.id) {
            return action.payload
          }
          return item
        })
      }
    default:
      return state
  }
}

export const loadRequests = (id) => {
  return dispatch => {
    dispatch({ type: LOAD_REQUESTS_STARTED })
    fetch('/requests')
      .then(res => res.json())
      .then(data => {
        const requests = data.filter(request => request.userId === id)

        dispatch({
          type: LOAD_REQUESTS_SUCCEEDED,
          payload: requests
        })
      })
  }
}

export const deleteRequest = (id) => {
  return dispatch => {
    dispatch({
      type: DELETE_REQUEST_STARTED,
      payload: id
    })

    fetch(`/requests/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json)
      .then(() => {
        dispatch({
          type: DELETE_REQUEST_SUCCEEDED,
          payload: id
        })
      })
  }
}

export const addToFavorite = (text, name, maxResults) => {
  return (dispatch, getState) => {
    dispatch({ type: ADD_REQUEST_STARTED })

    fetch('/requests', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        text,
        name,
        maxResults,
        userId: getState().auth.user.id
      })
    })
      .then(res => res.json())
      .then(request => {
        dispatch({
          type: ADD_REQUEST_SUCCEEDED,
          payload: request
        })
      })

  }
}

export const showModalWindow = () => {
  return { type: SHOW_MODAL }
}

export const hideModal = () => {
  return { type: HIDE_MODAL }
}

export const editRequest = (text, name, maxResults, id) => {
  return dispatch => {
    dispatch({ type: EDIT_REQUEST_STARTED })

    fetch(`/requests/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text,
        name,
        maxResults
      })
    })
      .then(res => res.json())
      .then(request => {
        dispatch({
          type: EDIT_REQUEST_SUCCEEDED,
          payload: request
        })
      })
  }
}