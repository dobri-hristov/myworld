import { createSlice } from '@reduxjs/toolkit'
import { LOADING_COMPONENTS } from '../../utils/constants'

const initialState = Object.values(LOADING_COMPONENTS).reduce((acc, curr) => {
  acc[curr] = false
  if (curr === LOADING_COMPONENTS.PAGE_LOAD) acc[curr] = true
  return acc
}, {})

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    loadingOn: (state, { payload }) => ({
      ...state,
      [payload || LOADING_COMPONENTS.PAGE_LOAD]: true,
    }),
    loadingOff: (state, { payload }) => ({
      ...state,
      [payload || LOADING_COMPONENTS.PAGE_LOAD]: false,
    }),
  },
})

export const loadingActions = loadingSlice.actions

export default loadingSlice.reducer
