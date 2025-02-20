import React, { useState } from 'react'

import './AddTodoForm.css'

import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

import { addNewTodo } from '../todosSlice'
import { selectAllTags } from '../../tags/tagsSlice'
import { selectUser } from '../../user/userSlice'

export const AddTodoForm = ({ closeModal }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  const allTags = useSelector(selectAllTags)

  const [content, setContent] = useState('')
  const [date, setDate] = useState(null)
  // const [remindDate, setRemindDate] = useState('')
  // const [remindTime, setRemindTime] = useState('')
  // const [remind, setRemind] = useState('')
  const [tags, setTags] = useState([])

  const [saveRequestStatus, setSaveRequestStatus] = useState('idle')
  const canSave = content.trim().length > 0 && saveRequestStatus === 'idle'

  const onContentChanged = (e) => setContent(e.target.value.trim())
  const onDateChanged = (e) => setDate(e.target.value)
  // const onRemindDateChanged = (e) => {
  //   const date = e.target.value
  //   setRemindDate(() => {
  //     console.log('insta-date', `${date} ${remindTime}`)
  //     console.log(new Date(`${date} ${remindTime}`))
  //     setRemind(new Date(`${date} ${remindTime}`))
  //
  //     return date
  //   })
  // }

  // const onRemindTimeChanged = (e) => {
  //   const time = e.target.value
  //   setRemindTime(() => {
  //     console.log('insta-time', `${remindDate} ${time}`)
  //
  //     setRemind(new Date(`${remindDate} ${time}`))
  //
  //     return time
  //   })
  // }

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
          addNewTodo({ uid: user.localId, content, date, tags }) // there was 'remind' parameter
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
      <label className="add-todo-form__tag-badge" key={tag.id}>
        <input
          value={tag.name}
          name="tag"
          type="checkbox"
          onClick={onTagChanged}
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
