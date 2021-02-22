import { applyMiddleware, combineReducers, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import auth from './ducks/auth'
import search from './ducks/search'
import video from './ducks/video'
import requests from './ducks/requests'

const rootReducer = combineReducers({
  auth,
  search,
  video,
  requests
})

const logger = createLogger({
  collapsed: true,
  diff: true,
})

export const store = createStore(rootReducer, applyMiddleware(thunk, logger))