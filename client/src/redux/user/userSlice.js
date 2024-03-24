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
      state.error = null
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
    updateUserStart: (state) => {
      state.loading = true
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload
      state.loading = false
      state.error - null
    },
    updateUserFailure: (state, action) => {
      state.loading = false
      state.error - action.payload
    },
    deleteUserStart: (state) => {
      state.loading = true
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null
      state.loading = false
      state.error - null
    },
    deleteUserFailure: (state, action) => {
      state.loading = false
      state.error - action.payload
    },
    signOutStart: (state) => {
      state.loading = true
    },
    signOutSuccess: (state) => {
      state.currentUser = null
      state.loading = false
      state.error - null
    },
    signOutFailure: (state, action) => {
      state.loading = false
      state.error - action.payload
    },
  },
})

export const {
  signInStart,
  signInSucess,
  signInError,
  updateUserSuccess,
  updateUserFailure,
  updateUserStart,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
} = userSlice.actions
export default userSlice.reducer
