import React, { useState } from 'react'
import classes from './modal-window.module.sass'
import Button from '../../Authorization/Button'
import { useDispatch, useSelector } from 'react-redux'
import { addToFavorite, editRequest, hideModal } from '../../../../redux/features/requests'

const ModalWindow = ({ favoriteRequest, itemEditable }) => {
  const dispatch = useDispatch()

  const requestValue = itemEditable ? itemEditable.text : favoriteRequest
  const nameValue = itemEditable ? itemEditable.name : ''
  const maxResultsValue = itemEditable ? itemEditable.maxResults : '25'

  const [request, setRequest] = useState(requestValue)
  const [name, setName] = useState(nameValue)
  const [maxResults, setMaxResults] = useState(maxResultsValue)

  const foundRequest = useSelector(state => state.requests.requests?.find(
    req => req.text.toLowerCase() === request?.toLowerCase()
  ))

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleChangeRequest = (e) => {
    setRequest(e.target.value)
  }

  const handleClick = () => {
    if (favoriteRequest && name.trim()) {
      if (!foundRequest) {
        dispatch(addToFavorite(request, name, maxResults))
      }
      dispatch(hideModal())
    }
    if (!favoriteRequest && name.trim()) {
      dispatch(editRequest(request, name, maxResults, itemEditable.id))
      dispatch(hideModal())
    }
  }

  const handleModalWindow = () => {
    dispatch(hideModal())
  }

  return (
    <div className={classes['modal']}>
      <div className={classes['modal__background']}>
        <div className={classes['modal__wrapper']}>
          <div className={classes['modal__title']}>
            {favoriteRequest ? 'Сохранить' : 'Изменить'} запрос
          </div>
          <div className={classes['modal__request']}>
            <div className={classes['modal__label-request']}>
              Запрос
            </div>
            <input
              type="text"
              value={request}
              onChange={handleChangeRequest}
              disabled={favoriteRequest}
              className={classes['modal__input']}
            />
            <div className={classes['modal__label-name']}>
              Название
            </div>
            <input
              type="text"
              placeholder="Укажите название"
              className={classes['modal__input']}
              value={name}
              onChange={handleNameChange}
            />
            <div className={classes['modal__label-select']}>
              Сортировать по
            </div>
            <select
              className={classes['modal__select']}
              disabled
            >
              <option>Без сортировки</option>
            </select>
            <div className={classes['modal__label-range']}>
              Максимальное количество
            </div>
            <input
              className={classes['modal__input-range']}
              type="range"
              step={1}
              min={1}
              max={50}
              value={maxResults}
              onChange={(e) => setMaxResults(e.target.value)}
            />
            <span className={classes['modal__range-value']}>{maxResults}</span>
            <Button
              className={classes['modal__border-button']}
              onClick={handleModalWindow}
            >
              {favoriteRequest && 'Не сохранять'}
              {!favoriteRequest && 'Не изменять'}
            </Button>
            <Button
              className={classes['modal__button']}
              onClick={handleClick}
            >
              {favoriteRequest && 'Сохранить'}
              {!favoriteRequest && 'Изменить'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalWindow