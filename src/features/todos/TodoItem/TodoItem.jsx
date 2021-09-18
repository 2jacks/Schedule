import React, { useState } from 'react'

import './TodoItem.css'

import { Time } from '../Time/Time'

import { useDispatch, useSelector } from 'react-redux'

import { completeTodo, deleteTodo } from '../todosSlice'
import { unwrapResult } from '@reduxjs/toolkit'

export const TodoItem = ({ content, date, tags, remind, completed, id }) => {
  const dispatch = useDispatch()
  const error = useSelector((state) => state.todos.error)

  const [deleteRequestStatus, setDeleteRequestStatus] = useState('idle')
  const canDelete = deleteRequestStatus === 'idle'

  const [completeRequestStatus, setCompleteRequestStatus] = useState('idle')
  const canComplete = completeRequestStatus === 'idle'

  const todoId = id

  const onStatusChanged = () => {
    if (canComplete) {
      try {
        setCompleteRequestStatus('pending')
        let resultAction = dispatch(
          completeTodo({ todoId, newStatus: !completed })
        )
        unwrapResult(resultAction)
      } catch (err) {
        return <span>err</span>
      } finally {
        setCompleteRequestStatus('idle')
      }
    }
  }

  const onDeleteClicked = () => {
    if (canDelete) {
      try {
        setDeleteRequestStatus('pending')
        const resultAction = dispatch(deleteTodo(todoId))
        unwrapResult(resultAction)
      } catch (err) {
        return <span>err</span>
      } finally {
        setDeleteRequestStatus('idle')
      }
    }
  }

  let renderedTags = []
  if (tags) {
    renderedTags = tags.map((tag) => (
      <span key={tags.indexOf(tag)} className="badge">
        {tag}
      </span>
    ))
  }
  const reminder = remind ? (
    <>
      <div className="todo-item__remind">
        <svg>
          <use xlinkHref="#bell" />
        </svg>
        <span className="todo-item__remind-time">
          Напомнить: &nbsp;
          <Time date={remind} />
        </span>
      </div>
    </>
  ) : null

  if (error) {
    return <span>error</span>
  }
  return (
    <div className="todo-item">
      <button
        className="todo-item__complete-btn"
        onClick={onStatusChanged}
        disabled={!canComplete}
      >
        <svg>
          <use xlinkHref="#check" />
        </svg>
      </button>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p className="todo-item__content">{content}</p>
        <div className="todo-item__date">
          <svg>
            <use xlinkHref="#calendar" />
          </svg>
          <Time date={date} />
        </div>
      </div>

      <div className="todo-item__tags">{renderedTags}</div>

      {reminder}
      <button className="todo-item__edit-btn">
        <svg>
          <use xlinkHref="#pen" />
        </svg>
      </button>
      <button
        className="todo-item__delete-btn"
        onClick={onDeleteClicked}
        disabled={!canDelete}
      >
        X
      </button>
    </div>
  )
}
