import { configureStore } from '@reduxjs/toolkit'

import todosReducer from '../features/todos/todosSlice'
import tagsReducer from '../features/tags/tagsSlice'
import userReducer from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    tags: tagsReducer,
    user: userReducer,
  },
})
