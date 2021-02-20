import React from 'react'
import classes from './play-video.module.sass'
import YouTube from 'react-youtube'
import { useDispatch, useSelector } from 'react-redux'
import { closeVideo } from '../../../../../../../redux/features/video'

const PlayVideo = () => {
  const selectedVideo = useSelector(state => state.video.selectedVideo)

  const dispatch = useDispatch()

  const handleCloseVideo = () => {
    dispatch(closeVideo())
  }

  if (!selectedVideo) {
    return null
  }

  return (
    <div
      onClick={handleCloseVideo}
      className={classes['play-video']}>
      <div className={classes['play-video__wrapper']}>
        <div>
          <YouTube videoId={selectedVideo}/>
        </div>
      </div>
    </div>
  )
}

export default PlayVideo
