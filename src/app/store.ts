import { configureStore } from '@reduxjs/toolkit'
import questionsReduce from './slices/questionsSlice.ts/questionsSlice'

export const store = configureStore({
  reducer: {
    questions: questionsReduce
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch