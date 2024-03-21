import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true
    },
    signInSucess: (state, action) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = null
    },
    signInError: (state, action) => {
      state.currentUser = null
      state.error = action.payload
      state.loading = false
    },
  },
})

export const { signInStart, signInSucess, signInError } = userSlice.actions
export default userSlice.reducer
