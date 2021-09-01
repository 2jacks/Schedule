import React, { useEffect } from 'react'

import {useSelector, useDispatch} from "react-redux";

import {selectAllTodos, fetchTodos} from "../todosSlice";

import {TodosItem} from "../TodoItem/TodoItem";


export const TodosList = () => {
   const dispatch = useDispatch()

   const todosStatus = useSelector(state => state.todos.status)
   const error = useSelector(state => state.todos.error)

   const todos = useSelector(selectAllTodos)

   useEffect(()=> {
      if(todosStatus === 'idle') {
         dispatch(fetchTodos())
      }
   }, [todos, dispatch])

   const todosList = todos.map(todo=> (
      <TodosItem key={todo.id} content={todo.content} date={todo.date}/>
   ))

   return (
     <>
        {todosList}
     </>
   )
}
