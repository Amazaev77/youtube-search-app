import { HANDLE_REQUEST, SEARCH_DATA_CLEAR, VIDEO_SEARCH_STARTED, VIDEO_SEARCH_SUCCEEDED } from '../types'

const initialState = {
  videos: null,
  loading: false,
  request: '',
  totalResults: null,
  showModalWindow: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case VIDEO_SEARCH_STARTED:
      return {
        ...state,
        loading: true,
        videos: null
      }
    case VIDEO_SEARCH_SUCCEEDED:
      return {
        ...state,
        loading: false,
        videos: action.payload.videos,
        request: action.payload.request,
        totalResults: action.payload.totalResults
      }
    case HANDLE_REQUEST:
      return {
        ...state,
        request: action.payload
      }
    case SEARCH_DATA_CLEAR:
      return {
        videos: null,
        loading: false,
        request: '',
        totalResults: null
      }
    default:
      return state
  }
}

export const searchVideo = (request, maxResults = 12) => {
  return dispatch => {
    dispatch({ type: VIDEO_SEARCH_STARTED })
    const keyApi = '&key=AIzaSyAuqiYk1sOAUv3gK4Fsbe49swHbUBxtYLU'
    const apiUrl = 'https://www.googleapis.com/youtube/v3'

    fetch(`${apiUrl}/search?${keyApi}` +
      `&type=video&part=snippet&maxResults=${maxResults}&q=${request}`)
      .then(res => res.json())
      .then(({ items, pageInfo }) => {

        const videos = items.map(video => {
          const { id: { videoId } } = video

          const { title, channelTitle, thumbnails } = video.snippet

          const newObj = {
            videoId,
            title,
            channelName: channelTitle,
            imageUrl: thumbnails.medium.url
          }

          fetch(`${apiUrl}/videos?part=snippet%2Cstatistics&id=${videoId}${keyApi}`)
            .then(res => res.json())
            .then(json => newObj.viewCount = json.items[0].statistics.viewCount)

          return newObj
        })

        dispatch({
          type: VIDEO_SEARCH_SUCCEEDED,
          payload: {
            videos,
            request,
            totalResults: pageInfo.totalResults
          }
        })
      })
  }
}

export const handleRequest = (value) => {
  return {
    type: HANDLE_REQUEST,
    payload: value
  }
}

export const clearSearchData = () => {
  return { type: SEARCH_DATA_CLEAR }
}