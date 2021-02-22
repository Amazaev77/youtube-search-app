import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classes from './search-form.module.sass'
import Button from '../../../../Authorization/Button'
import { handleRequest, searchVideo } from '../../../../../../redux/ducks/search'
import spinner from '../../../../../../icons/big-spinner.svg'
import IconSave from './IconSave'

const SearchForm = () => {
  const dispatch = useDispatch()

  const loading = useSelector(state => state.search.loading)
  const request = useSelector(state => state.search.request)
  const videosLength = useSelector(state => state.search.videos?.length)

  const foundRequest = useSelector(state => state.requests.requests?.find(
    req => req.text.toLowerCase() === request?.toLowerCase()
  ))

  const handleRequestChange = (e) => {
    dispatch(handleRequest(e.target.value))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (request.trim())
      dispatch(searchVideo(request))
  }

  let formClassNames = `${classes['search__form']} `

  if (videosLength > 0) {
    let active = formClassNames + classes['search__form-active']
    formClassNames += active
  }

  if (loading) {
    return (
      <div className={classes['loader']}>
        <img src={spinner} alt="spinner"/>
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      className={formClassNames}
    >
      <div className={classes['search__title']}>Поиск видео</div>
      <input
        className={classes['search__input']}
        placeholder="Что хотите посмотреть?"
        value={request}
        onChange={handleRequestChange}
        type="text"
      />
      <IconSave foundRequest={foundRequest}/>
      <Button className={classes['search__button']}>
        Найти
      </Button>
    </form>
  )
}

export default SearchForm
