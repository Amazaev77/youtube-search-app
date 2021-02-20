import { applyMiddleware, combineReducers, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import auth from './features/auth'
import search from './features/search'
import video from './features/video'
import requests from './features/requests'

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