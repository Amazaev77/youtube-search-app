import { CLOSE_VIDEO, SELECT_VIDEO } from '../types'

const initialState = {
  selectedVideo: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case CLOSE_VIDEO:
      return {
        ...state,
        selectedVideo: null
      }
    case SELECT_VIDEO:
      return {
        ...state,
        selectedVideo: action.payload
      }
    default:
      return state
  }
}

export const closeVideo = () => {
  return { type: CLOSE_VIDEO }
}

export const selectVideo = (selectedVideoId) => {
  return {
    type: SELECT_VIDEO,
    payload: selectedVideoId
  }
}