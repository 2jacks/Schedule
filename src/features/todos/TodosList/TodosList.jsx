import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { selectAllTodos, fetchTodos } from '../todosSlice'

import './TodosList.css'

import { TodoItem } from '../TodoItem/TodoItem'

import { AddTodoForm } from '../AddTodoForm/AddTodoForm'

export const TodosList = () => {
  const dispatch = useDispatch()

  const todosStatus = useSelector((state) => state.todos.status)
  const error = useSelector((state) => state.todos.error)

  const todos = useSelector(selectAllTodos)
  const filterTag = useSelector((state) => state.tags.currentTag)

  const filteredTodos = todos.filter((todo) => {
    if (filterTag !== 'all') {
      return todo.tags.some((tag) => tag === filterTag)
    } else {
      return true
    }
  })
  const completedTodos = filteredTodos.filter((todo) => todo.completed)
  const uncompletedTodos = filteredTodos.filter((todo) => !todo.completed)

  const [showAddTodoForm, setShowAddTodoForm] = useState(false)

  useEffect(() => {
    if (todosStatus === 'idle') {
      dispatch(fetchTodos())
    }
  }, [todosStatus, dispatch])

  const closeModal = () => {
    setShowAddTodoForm(false)
  }
  const addButtonClicked = () => {
    setShowAddTodoForm(true)
  }

  const completedList = completedTodos.map((todo) => {
    return (
      <TodoItem
        key={todo.id}
        content={todo.content}
        date={todo.date}
        tags={todo.tags}
        remind={todo.remind}
        completed={todo.completed}
        id={todo.id}
      />
    )
  })

  const uncompletedList = uncompletedTodos.map((todo) => {
    return (
      <TodoItem
        key={todo.id}
        content={todo.content}
        date={todo.date}
        tags={todo.tags}
        remind={todo.remind}
        completed={todo.completed}
        id={todo.id}
      />
    )
  })

  if (error) {
    return <span>{error}</span>
  }
  let addTodoForm = showAddTodoForm ? (
    <AddTodoForm closeModal={closeModal} />
  ) : null
  return (
    <main className="todos-list">
      <nav className="nav">
        <button className="nav-button">
          <svg>
            <use xlinkHref="#calendar" />
          </svg>
        </button>

        <button
          className="nav-button add-todo-button"
          onClick={addButtonClicked}
        >
          <svg>
            <use xlinkHref="#add" />
          </svg>
        </button>
      </nav>
      <div className="todos-section">
        <h3 className="todos-section__title">Активные</h3>
        {uncompletedList}
      </div>
      <div className="todos-section">
        <h3 className="todos-section__title">Завершённые</h3>
        {completedList}
      </div>

      {addTodoForm}
    </main>
  )
}
