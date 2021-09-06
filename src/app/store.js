import { configureStore } from '@reduxjs/toolkit'

import todosReducer from '../features/todos/todosSlice'
import tagsReducer from '../features/tags/tagsSlice'

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    tags: tagsReducer,
  },
})
