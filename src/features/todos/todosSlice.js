import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

let initialState = {
  todos: [],
   status: 'idle',
   error: null
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const res = fetch('https://schedule-8520f-default-rtdb.europe-west1.firebasedatabase.app/users/O0wXDnZ2UNYuDSJTnwn7zZMqN1p1/todos.json')
      .then((res)=> {
       return res.json()
      })
      .then((todos)=> {
         return todos
      })
   return res
})

const todosSlice = createSlice({
   name: 'todos',
   initialState: initialState,
   reducers: {
   },
   extraReducers: {
      [fetchTodos.pending]: (state, action) => {
        state.status = 'loading'
      },
      [fetchTodos.fulfilled]: (state, action)=> {
         state.status = 'succeeded'
         state.todos = state.todos.concat(action.payload)
      },
      [fetchTodos.rejected]: (state, action) => {
         state.status = 'failed'
         state.error = action.error.message
      }
   }
})

export const selectAllTodos = (state) => state.todos.todos

export default todosSlice.reducer
