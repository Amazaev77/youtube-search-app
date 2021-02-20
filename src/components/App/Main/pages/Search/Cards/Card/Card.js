import React from 'react'
import classes from './card.module.sass'
import { useDispatch } from 'react-redux'
import { selectVideo } from '../../../../../../../redux/features/video'

const HRNumbers = require('human-readable-numbers')

const Card = ({ video }) => {
  const { imageUrl, title, channelName, viewCount, videoId } = video

  const formatCount = viewCount && HRNumbers.toHumanString(viewCount)

  const dispatch = useDispatch()

  const handleSelectVideo = () => {
    dispatch(selectVideo(videoId))
  }

  return (
    <div className={classes['card']}>
      <div className={classes['card__img']}>
        <img
          onClick={handleSelectVideo}
          src={imageUrl}
          alt="video"
        />
      </div>
      <div className={classes['card__title']}>
        {title.length > 49 ? (
          title.substring(0, 49) + '...'
        ) : (
          title
        )}
      </div>
      <div className={classes['card__channel-name']}>
        {channelName}
      </div>
      <div className={classes['card__view-count']}>
        {viewCount && formatCount} просмотров
      </div>
    </div>
  )
}

export default Card
