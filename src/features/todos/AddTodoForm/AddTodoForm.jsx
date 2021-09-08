import React, { useState } from 'react'

import './AddTodoForm.css'

import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

import { addNewTodo } from '../todosSlice'
import { selectAllTags } from '../../tags/tagsSlice'

export const AddTodoForm = ({ closeModal }) => {
  const dispatch = useDispatch()

  const allTags = useSelector(selectAllTags)

  const [content, setContent] = useState('')
  const [date, setDate] = useState(null)
  const [remind, setRemind] = useState(null)
  const [tags, setTags] = useState([])

  const [saveRequestStatus, setSaveRequestStatus] = useState('idle')
  const canSave = content.trim().length > 0 && saveRequestStatus === 'idle'

  const onContentChanged = (e) => setContent(e.target.value.trim())
  const onDateChanged = (e) => setDate(e.target.value)
  const onRemindChanged = (e) => setRemind(e.target.value)
  const onTagChanged = (e) => {
    const input = e.target
    if (input.checked) {
      setTags((prev) => [...prev, input.value])
    } else if (!input.checked) {
      setTags((prev) => prev.filter((tag) => tag !== input.value))
    }
    input.parentNode.classList.toggle('op-1')
  }

  const onSaveTodoClicked = async (e) => {
    e.preventDefault()
    if (canSave) {
      try {
        setSaveRequestStatus('pending')
        const resultAction = await dispatch(
          addNewTodo({ content, date, remind, tags })
        )
        unwrapResult(resultAction)
      } catch (err) {
        return <span>err</span>
      } finally {
        setSaveRequestStatus('idle')
        closeModal()
      }
    }
  }

  const renderedAllTags = allTags.map((tag) => {
    return (
      <label className="add-todo-form__tag-badge" key={allTags.indexOf(tag)}>
        <input value={tag} name="tag" type="checkbox" onClick={onTagChanged} />
        {tag}
      </label>
    )
  })

  return (
    <>
      <div className="add-todo-form__block">
        <div className="add-todo-form">
          <form className="add-todo-form__wrapper" onSubmit={() => false}>
            <label className="add-todo-form__label">
              Запишите задачу:
              <input
                type="text"
                className="add-todo-form__input-content"
                autoFocus={true}
                onChange={onContentChanged}
              />
            </label>
            <div className="add-todo-form__time">
              <div className="add-todo-form__time-field">
                <svg>
                  <use xlinkHref="#calendar" />
                </svg>
                Выберите дату:
                <input
                  type="date"
                  className="date-picker"
                  onChange={onDateChanged}
                />
              </div>
              <div className="add-todo-form__time-field">
                <svg>
                  <use xlinkHref="#bell" />
                </svg>
                Добавьте напоминание:
                <input
                  type="date"
                  className="date-picker"
                  onChange={onRemindChanged}
                />
              </div>
            </div>
            <div className="add-todo-form__tags">
              <span>Теги:</span>
              <div className="add-todo-form__tags-group">{renderedAllTags}</div>
            </div>
            <button
              type="button"
              className="add-todo-form__close"
              onClick={closeModal}
            >
              <svg>
                <use xlinkHref="#add" />
              </svg>
            </button>
            <button
              className="add-todo-form__save-todo"
              disabled={!canSave}
              onClick={onSaveTodoClicked}
            >
              <svg>
                <use xlinkHref="#check" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
