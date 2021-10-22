import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  status: 'IDLE',
  error: null,
}

export const signIn = createAsyncThunk('user/signIn', async (user) => {
  const { email, password } = user
  return fetch(
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD0NSysJBt4EGByzGzGz7LuID_iqXL_8kA',
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    }
  )
    .then((res) => res.json())
    .then((json) => {
      return json
    })
})

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [signIn.fulfilled]: (state, action) => {
      state.status = 'fulfilled'
      state.user = action.payload
      console.log('signed in user', action.payload)
    },
    [signIn.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.error.message
    },
    [signIn.pending]: (state, action) => {
      state.status = 'pending'
    },
  },
})

export const selectUser = (state) => state.user.user

export default userSlice.reducer
