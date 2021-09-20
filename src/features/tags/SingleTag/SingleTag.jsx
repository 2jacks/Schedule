import React from 'react'
import './SingleTag.css'

import { useDispatch } from 'react-redux'
import { deleteTag } from '../tagsSlice'

export const SingleTag = ({ id, name, value, onChangeHandler }) => {
  const dispatch = useDispatch()
  const onDeleteButtonClicked = () => {
    dispatch(deleteTag(id))
  }
  return (
    <>
      <li className="tagbar__list-item tag">
        <button onClick={onDeleteButtonClicked}>X</button>
        <div className="tag__label-wrapper">
          <label>
            <span className="tag__name">{name}</span>
            <input
              type="radio"
              name={'tag'}
              onChange={onChangeHandler}
              value={value}
            />
            <span className="tag__tooltip">{name}</span>
          </label>
        </div>
      </li>
    </>
  )
}
