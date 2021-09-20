import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialSlice = {
  tags: [],
  status: 'idle',
  error: null,
  currentTag: 'all',
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

export const addNewTag = createAsyncThunk('tags/addNewTag', async (tag) => {
  return fetch(
    'https://schedule-8520f-default-rtdb.europe-west1.firebasedatabase.app/users/O0wXDnZ2UNYuDSJTnwn7zZMqN1p1/tags.json',
    {
      method: 'POST',
      body: JSON.stringify(tag),
    }
  )
    .then((res) => res.json())
    .then((res) => ({ id: res.name, name: tag }))
})
export const deleteTag = createAsyncThunk('tags/deleteTag', async (tagId) => {
  return fetch(
    `https://schedule-8520f-default-rtdb.europe-west1.firebasedatabase.app/users/O0wXDnZ2UNYuDSJTnwn7zZMqN1p1/tags/${tagId}.json`,
    { method: 'DELETE' }
  )
    .then((res) => res.json())
    .then((res) => tagId)
})

const tagsSlice = createSlice({
  name: 'tags',
  initialState: initialSlice,
  reducers: {
    setFilterTag(state, action) {
      state.currentTag = action.payload
    },
  },
  extraReducers: {
    [fetchTags.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.status = 'complete'
      let tags = []
      if (action.payload) {
        for (let [key, value] of Object.entries(action.payload)) {
          tags.push({ name: value, id: key })
        }
      }
      state.tags = state.tags.concat(tags)
    },
    [fetchTags.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addNewTag.fulfilled]: (state, action) => {
      state.tags.push(action.payload)
    },
    [addNewTag.rejected]: (state, action) => {
      state.error = action.error.message
    },
    [deleteTag.fulfilled]: (state, action) => {
      const tagId = action.payload
      const existingTag = state.tags.find((tag) => tag.id === tagId)
      if (existingTag) {
        state.tags.splice(state.tags.indexOf(existingTag), 1)
      }
    },
    [deleteTag.rejected]: (state, action) => {
      state.error = action.error.message
    },
  },
})

export const { setFilterTag } = tagsSlice.actions
export const selectAllTags = (state) => state.tags.tags
export default tagsSlice.reducer
