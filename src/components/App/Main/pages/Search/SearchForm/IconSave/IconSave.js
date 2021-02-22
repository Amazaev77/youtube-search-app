import React, { useState } from 'react'
import classes from './Icon-save.module.sass'
import { useDispatch, useSelector } from 'react-redux'
import { showModalWindow } from '../../../../../../../redux/ducks/requests'
import { Link } from 'react-router-dom'

const IconSave = ({ foundRequest }) => {
  const dispatch = useDispatch()

  const [showPrompt, setShowPrompt] = useState(false)

  const videosLength = useSelector(state => state.search.videos?.length)

  const handleShowModal = () => {
    if (!foundRequest) {
      dispatch(showModalWindow())
    }
    if (foundRequest) {
      setShowPrompt((value) => !value)
    }
  }

  return (
    <>
      {videosLength > 0 && (
        <span
          onClick={handleShowModal}
          className={`material-icons ${classes['search__favorite-icon']}`}
        >
          {foundRequest ? 'favorite' : 'favorite_border'}
        </span>
      )}
      {showPrompt && (
        <div className={classes['prompt']}>
          <div className={classes['prompt__angle']}/>
          <div>
            <div>
              Поиск сохранён в разделе
            </div>
            <div className={classes['prompt__favorite']}>
              «Избранное»
            </div>
          </div>
          <div>
            <Link
              className={classes['prompt__link']}
              to="/main/favorites"
            >
              Перейти в избранное
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default IconSave
