import React, { useEffect } from 'react'

import {useSelector, useDispatch} from "react-redux";

import {selectAllTodos, fetchTodos} from "../todosSlice";

import './TodosList.css'

import {TodoItem} from "../TodoItem/TodoItem";


export const TodosList = () => {
   const dispatch = useDispatch()

   const todosStatus = useSelector(state => state.todos.status)
   const error = useSelector(state => state.todos.error)

   const todos = useSelector(selectAllTodos)

   useEffect(()=> {
      if(todosStatus === 'idle') {
         dispatch(fetchTodos())
      }
   }, [todosStatus, dispatch])

   const todosList = todos.map(todo=> (
      <TodoItem key={todo.id} content={todo.content} date={todo.date}/>
   ))

   if (error) {
      return(<span>{error}</span>)
   }
   return (
     <main className='todos-list'>
        {todosList}
     </main>
   )
}
