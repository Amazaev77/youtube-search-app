import React, { useState } from 'react'
import classes from './favorites.module.sass'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteRequest, showModalWindow } from '../../../../../redux/ducks/requests'
import ModalWindow from '../../ModalWindow'
import { searchVideo } from '../../../../../redux/ducks/search'

const Favorites = () => {
  const [itemSelectedEditable, setItemSelectedEditable] = useState(null)

  const requests = useSelector(state => state.requests.requests)
  const showModal = useSelector(state => state.requests.showModalWindow)
  const deleting = useSelector(state => state.requests.deleting)

  const dispatch = useDispatch()

  const handleEditRequest = (item) => {
    setItemSelectedEditable(item)
    dispatch(showModalWindow())
  }

  const handleExecuteRequest = (text, maxResults) => {
    dispatch(searchVideo(text, maxResults))
  }

  const handleDeleteRequest = (id) => {
    dispatch(deleteRequest(id))
  }

  return (
    <div className={classes['favorites']}>
      <div className={classes['container']}>
        <div className={classes['favorites__title']}>
          Избранное
        </div>
        <ul className={classes['favorites__list']}>
          {requests?.map((item) => {
            const { text, maxResults, name, id } = item

            return (
              <li
                className={classes['favorites__item']}
                key={item.id}
              >
                <span className={classes['text']}>{name}</span>
                <div>
                  <button
                    className={classes['execute']}
                    onClick={() => handleExecuteRequest(text, maxResults)}
                  >
                    <Link to="/main/search">
                      Выполнить
                    </Link>
                  </button>
                  <button
                    onClick={() => handleEditRequest(item)}
                    className={classes['edit']}
                  >
                    Изменить
                  </button>
                  <button
                    onClick={() => handleDeleteRequest(id)}
                    className={classes['delete']}
                    disabled={deleting === id}
                  >
                    Удалить
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
        {showModal && (
          <ModalWindow itemEditable={itemSelectedEditable}/>
        )}
      </div>
    </div>
  )
}

export default Favorites
