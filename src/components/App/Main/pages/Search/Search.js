import React from 'react'
import classes from './search.module.sass'
import SearchForm from './SearchForm'
import Cards from './Cards'

const Search = () => {
  return (
    <div className={classes['search']}>
      <div className={classes['container']}>
        <SearchForm/>
        <Cards/>
      </div>
    </div>
  )
}

export default Search
