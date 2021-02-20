import React, { useState } from 'react'
import classes from './cards.module.sass'
import Card from './Card'
import { useSelector } from 'react-redux'
import PlayVideo from './PlayVideo'
import ModalWindow from '../../../ModalWindow'

const Cards = () => {
  const [listView, setListView] = useState(false)

  const request = useSelector(state => state.search.request)
  const videos = useSelector(state => state.search.videos)
  const totalResults = useSelector(state => state.search.totalResults)
  const showModalWindow = useSelector(state => state.requests.showModalWindow)

  const viewListCards = listView && classes['cards__view-list']

  const handleViewList = () => setListView(true)
  const handleViewGrid = () => setListView(false)

  return (
    <>
      {videos && (
        <>
          Видео по запросу
          <span className={classes['cards__request']}>«{request}»</span>
          <span className={classes['cards__total-results']}>{totalResults}</span>
          <div className={classes['view']}>
            <div
              onClick={handleViewList}
              className={`material-icons ${classes['view__list']}`}
            >
              format_list_bulleted
            </div>
            <div
              onClick={handleViewGrid}
              className={`material-icons ${classes['view__grid']}`}
            >
              grid_view
            </div>
          </div>
        </>
      )}
      <div style={{}} className={`${classes['cards']} ${viewListCards}`}>
        {videos && videos.map(video => (
          <Card
            key={video.videoId}
            video={video}
          />
        ))}
        <PlayVideo/>
        {showModalWindow && (
          <ModalWindow
            favoriteRequest={request}
          />
        )}
      </div>
    </>
  )
}

export default Cards
