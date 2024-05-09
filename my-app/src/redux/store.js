import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './demoSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})