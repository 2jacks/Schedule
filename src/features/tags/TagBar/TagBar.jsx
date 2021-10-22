import React, { useState, useEffect } from 'react'
import './TagBar.css'

import { useSelector, useDispatch } from 'react-redux'

import { addNewTag, fetchTags, selectAllTags, setFilterTag } from '../tagsSlice'

import { SingleTag } from '../SingleTag/SingleTag'
import { selectUser } from '../../user/userSlice'

export const TagBar = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  const tagsStatus = useSelector((state) => state.tags.status)
  const error = useSelector((state) => state.tags.error)
  const tags = useSelector(selectAllTags)

  const [newTag, setNewTag] = useState('')
  const canAddNewTag = newTag.trim().length > 0

  useEffect(() => {
    if (tagsStatus === 'idle') {
      dispatch(fetchTags(user.localId))
    }
  }, [tagsStatus, dispatch])

  const onTagChanged = (e) => {
    dispatch(setFilterTag(e.target.value))
  }

  const onAddInputChanged = (e) => setNewTag(e.target.value)
  const onAddButtonClicked = () => {
    dispatch(addNewTag({ uid: user.localId, tag: newTag }))
    setNewTag('')
  }

  const renderedTags = tags.map((tag) => (
    <SingleTag
      id={tag.id}
      name={tag.name}
      value={tag.name}
      onChangeHandler={onTagChanged}
      key={tag.id}
    />
  ))

  if (error) {
    return <span>{error}</span>
  }
  return (
    <aside className="tagbar">
      <div className="tagbar__logo">
        <h1 className="logo">SCHEDULE</h1>
      </div>
      <h2 className="tagbar__title">Теги</h2>
      <ul className="tagbar__list">
        <SingleTag
          id={'1'}
          name={'Все'}
          onChangeHandler={onTagChanged}
          value={'all'}
        />
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
