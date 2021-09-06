import React from 'react'

import './TodoItem.css'

import { Time } from '../Time/Time'

import { useDispatch, useSelector } from 'react-redux'

import { completeTodo } from '../todosSlice'
import { unwrapResult } from '@reduxjs/toolkit'

export const TodoItem = ({ content, date, tags, remind, completed, id }) => {
  const dispatch = useDispatch()
  const error = useSelector((state) => state.todos.error)

  const todoId = id

  const onStatusChanged = () => {
    try {
      dispatch(completeTodo({ todoId, newStatus: !completed }))
    } catch (err) {
      console.log(err)
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
      <button className="todo-item__complete-btn" onClick={onStatusChanged}>
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
    </div>
  )
}
