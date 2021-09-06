import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialSlice = {
  tags: [],
  status: 'idle',
  error: null,
}

export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
  return fetch(
    'https://schedule-8520f-default-rtdb.europe-west1.firebasedatabase.app/users/O0wXDnZ2UNYuDSJTnwn7zZMqN1p1/tags.json'
  )
    .then((res) => {
      return res.json()
    })
    .then((tags) => {
      return tags
    })
})

const tagsSlice = createSlice({
  name: 'tags',
  initialState: initialSlice,
  reducers: {},
  extraReducers: {
    [fetchTags.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.status = 'complete'
      state.tags = state.tags.concat(action.payload)
    },
    [fetchTags.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  },
})

export const selectAllTags = (state) => state.tags.tags
export default tagsSlice.reducer
