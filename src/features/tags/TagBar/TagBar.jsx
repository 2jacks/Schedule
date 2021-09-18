import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { addNewTag, fetchTags, selectAllTags, setFilterTag } from '../tagsSlice'

import './TagBar.css'

export const TagBar = () => {
  const dispatch = useDispatch()

  const tagsStatus = useSelector((state) => state.tags.status)
  const error = useSelector((state) => state.tags.error)
  const tags = useSelector(selectAllTags)

  const [newTag, setNewTag] = useState('')
  const canAddNewTag = newTag.trim().length > 0

  useEffect(() => {
    if (tagsStatus === 'idle') {
      dispatch(fetchTags())
    }
  }, [tagsStatus, dispatch])

  const onTagChanged = (e) => {
    dispatch(setFilterTag(e.target.value))
  }

  const onAddInputChanged = (e) => setNewTag(e.target.value)
  const onAddButtonClicked = () => {
    dispatch(addNewTag(newTag))
    setNewTag('')
  }

  const renderedTags = tags.map((tag) => {
    return (
      <li key={tag.id} className="tagbar__list-item">
        <label>
          {tag.name}
          <input
            type="radio"
            name={'tag'}
            onChange={onTagChanged}
            value={tag.name}
          />
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
      <ul className="tagbar__list">
        <li className="tagbar__list-item">
          <label>
            Все
            <input
              type="radio"
              name={'tag'}
              onChange={onTagChanged}
              value={'all'}
            />
          </label>
        </li>
        {renderedTags}
      </ul>
      <div className="add-new-tag">
        <input
          type="text"
          className="add-new-tag__input"
          placeholder="Добавить тег..."
          value={newTag}
          onChange={onAddInputChanged}
        />
        <button
          className="add-new-tag__btn"
          disabled={!canAddNewTag}
          onClick={onAddButtonClicked}
        >
          <svg>
            <use xlinkHref="#add" />
          </svg>
        </button>
      </div>
    </aside>
  )
}
