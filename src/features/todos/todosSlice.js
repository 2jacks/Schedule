import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

let initialState = {
  todos: [],
  status: 'idle',
  error: null,
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  return fetch(
    'https://schedule-8520f-default-rtdb.europe-west1.firebasedatabase.app/users/O0wXDnZ2UNYuDSJTnwn7zZMqN1p1/todos.json'
  )
    .then((res) => {
      return res.json()
    })
    .then((todos) => {
      return todos
    })
})

export const addNewTodo = createAsyncThunk(
  'todos/addNewTodo',
  async (initialTodo) => {
    let { content, date, remind, tags } = initialTodo
    return fetch(
      'https://schedule-8520f-default-rtdb.europe-west1.firebasedatabase.app/users/O0wXDnZ2UNYuDSJTnwn7zZMqN1p1/todos.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: false,
          content,
          date,
          remind,
          tags,
        }),
      }
    )
      .then((res) => res.json())
      .then((todoId) => {
        return { id: todoId.name, ...initialTodo, completed: false }
      })
  }
)

export const completeTodo = createAsyncThunk(
  'todos/completeTodo',
  async (update) => {
    const { todoId, newStatus } = update
    return fetch(
      `https://schedule-8520f-default-rtdb.europe-west1.firebasedatabase.app/users/O0wXDnZ2UNYuDSJTnwn7zZMqN1p1/todos/${todoId}.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: newStatus,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => ({ todoId, newStatus }))
  }
)

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (todoId) => {
    return fetch(
      `https://schedule-8520f-default-rtdb.europe-west1.firebasedatabase.app/users/O0wXDnZ2UNYuDSJTnwn7zZMqN1p1/todos/${todoId}.json`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((res) => todoId)
  }
)

const todosSlice = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchTodos.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = 'complete'
      let todos = []
      if (action.payload) {
        for (let [key, value] of Object.entries(action.payload)) {
          todos.push({ ...value, id: key })
        }
        state.todos = state.todos.concat(todos)
      }
    },
    [fetchTodos.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },

    [addNewTodo.pending]: (state, action) => {
      state.status = 'loading'
    },
    [addNewTodo.fulfilled]: (state, action) => {
      state.status = 'complete'
      state.todos.push(action.payload)
    },
    [addNewTodo.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },

    [completeTodo.fulfilled]: (state, action) => {
      const { todoId, newStatus } = action.payload
      const updatedTodo = state.todos.find((todo) => todo.id === todoId)
      if (updatedTodo) {
        updatedTodo.completed = newStatus
      }
    },
    [completeTodo.rejected]: (state, action) => {
      state.error = action.error.message
    },

    [deleteTodo.fulfilled]: (state, action) => {
      const todoId = action.payload

      const existingTodo = state.todos.find((todo) => todo.id === todoId)
      if (existingTodo) {
        state.todos.splice(state.todos.indexOf(existingTodo), 1)
      }
    },
    [deleteTodo.rejected]: (state, action) => {
      state.error = action.error.message
    },
  },
})

export const selectTodoById = (state, todoId) =>
  state.todos.todos.find((todo) => todo.id === todoId)

export const selectAllTodos = (state) => state.todos.todos

export default todosSlice.reducer
