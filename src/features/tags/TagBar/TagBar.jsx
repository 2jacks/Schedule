import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { fetchTags, selectAllTags } from '../tagsSlice'

import './TagBar.css'

export const TagBar = () => {
  const dispatch = useDispatch()

  const tagsStatus = useSelector((state) => state.tags.status)
  const error = useSelector((state) => state.tags.error)
  const tags = useSelector(selectAllTags)

  useEffect(() => {
    if (tagsStatus === 'idle') {
      dispatch(fetchTags())
    }
  }, [tagsStatus, dispatch])

  const renderedTags = tags.map((tag) => {
    return (
      <li key={tags.indexOf(tag)} className="tagbar__list-item">
        <label>
          {tag}
          <input type="radio" name={'tag'} />
        </label>
      </li>
    )
  })

  if (error) {
    return <span>{error}</span>
  }
  return (
    <aside className="tagbar">
      <h1 className="logo tagbar__logo">SCHEDULE</h1>
      <h2 className="tagbar__title">Теги</h2>
      <ul className="tagbar__list">{renderedTags}</ul>
    </aside>
  )
}
