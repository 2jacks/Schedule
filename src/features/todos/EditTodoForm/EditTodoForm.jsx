import React, { useEffect, useState } from 'react'

import './EditTodoForm.css'

import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

import { selectTodoById, updateTodo } from '../todosSlice'
import { selectAllTags } from '../../tags/tagsSlice'

export const EditTodoForm = ({ closeModal, todoId }) => {
  const dispatch = useDispatch()
  const todo = useSelector((state) => selectTodoById(state, todoId))
  const allTags = useSelector(selectAllTags)

  const [content, setContent] = useState(todo.content)
  const [date, setDate] = useState(todo.date)
  const [tags, setTags] = useState(() => (todo.tags ? todo.tags : []))

  const [saveRequestStatus, setSaveRequestStatus] = useState('idle')
  const canSave = saveRequestStatus === 'idle'

  const onContentChanged = (e) => setContent(e.target.value)
  const onDateChanged = (e) => setDate(e.target.value)
  const onTagChanged = (e) => {
    const input = e.target
    if (input.checked) {
      setTags((prev) => [...prev, input.value])
    } else if (!input.checked) {
      setTags((prev) => prev.filter((tag) => tag !== input.value))
    }
    input.parentNode.classList.toggle('op-1')
  }
  const onEditSaveClicked = async (e) => {
    e.preventDefault()
    if (canSave) {
      try {
        setSaveRequestStatus('pending')
        const resultAction = await dispatch(
          updateTodo({ todoId, content, date, tags })
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
    let isTagSelectedByUser = false
    if (tags !== null && tags !== undefined) {
      isTagSelectedByUser = tags.some((selectedTag) => selectedTag === tag.name)
    }

    return (
      <label
        className={`add-todo-form__tag-badge ${
          isTagSelectedByUser ? 'op-1' : ''
        }`}
        key={tag.id}
      >
        <input
          value={tag.name}
          name="tag"
          type="checkbox"
          onClick={onTagChanged}
          defaultChecked={isTagSelectedByUser}
        />
        {tag.name}
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
                value={content}
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
                  value={date}
                  onChange={onDateChanged}
                />
              </div>
              {/*<div className="add-todo-form__time-field">*/}
              {/*  <svg>*/}
              {/*    <use xlinkHref="#bell" />*/}
              {/*  </svg>*/}
              {/*  Добавьте напоминание:*/}
              {/*  <input*/}
              {/*    type="date"*/}
              {/*    className="date-picker"*/}
              {/*    onChange={onRemindDateChanged}*/}
              {/*  />*/}
              {/*  <input*/}
              {/*    type="time"*/}
              {/*    className="date-picker"*/}
              {/*    onChange={onRemindTimeChanged}*/}
              {/*  />*/}
              {/*</div>*/}
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
              onClick={onEditSaveClicked}
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
