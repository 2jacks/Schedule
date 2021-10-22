import React, { useState } from 'react'

import './TodoItem.css'

import { Time } from '../Time/Time'

import { useDispatch, useSelector } from 'react-redux'

import { completeTodo, deleteTodo } from '../todosSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { EditTodoForm } from '../EditTodoForm/EditTodoForm'
import { selectUser } from '../../user/userSlice'

export const TodoItem = ({ content, date, tags, remind, completed, id }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const error = useSelector((state) => state.user.error)

  const [deleteRequestStatus, setDeleteRequestStatus] = useState('idle')
  const canDelete = deleteRequestStatus === 'idle'

  const [completeRequestStatus, setCompleteRequestStatus] = useState('idle')
  const canComplete = completeRequestStatus === 'idle'

  const todoId = id

  const [showEditor, setShowEditor] = useState(false)

  const onStatusChanged = () => {
    if (canComplete) {
      try {
        setCompleteRequestStatus('pending')
        let resultAction = dispatch(
          completeTodo({ uid: user.localId, todoId, newStatus: !completed })
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
        const resultAction = dispatch(deleteTodo({ uid: user.localId, todoId }))
        unwrapResult(resultAction)
      } catch (err) {
        return <span>err</span>
      } finally {
        setDeleteRequestStatus('idle')
      }
    }
  }
  const onEditClicked = () => setShowEditor(true)
  const closeModal = () => {
    setShowEditor(false)
  }

  let renderedTags = []
  if (tags) {
    renderedTags = tags.map((tag) => (
      <span key={tags.indexOf(tag)} className="badge">
        {tag}
      </span>
    ))
  }
  // const reminder = remind ? (
  //   <>
  //     <div className="todo-item__remind">
  //       <svg>
  //         <use xlinkHref="#bell" />
  //       </svg>
  //       <span className="todo-item__remind-time">
  //         Напомнить: &nbsp;
  //         <Time date={remind} />
  //       </span>
  //     </div>
  //   </>
  // ) : null

  const editBtn = !completed ? (
    <button className="todo-item__edit-btn" onClick={onEditClicked}>
      <svg>
        <use xlinkHref="#pen" />
      </svg>
    </button>
  ) : null
  const editor = showEditor ? (
    <EditTodoForm closeModal={closeModal} todoId={todoId} />
  ) : null

  if (error) {
    return <span>error</span>
  }
  return (
    <>
      <div className={`todo-item${completed ? ' todo-item--completed' : ''}`}>
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

        {/*{reminder}*/}
        <div style={{ marginLeft: 'auto' }}>
          {editBtn}
          <button
            className="todo-item__delete-btn"
            onClick={onDeleteClicked}
            disabled={!canDelete}
          >
            X
          </button>
        </div>
      </div>
      {editor}
    </>
  )
}
