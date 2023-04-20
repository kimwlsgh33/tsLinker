import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import {useDispatch, useSelector} from 'react-redux'
import type {TypedUseSelectorHook} from 'react-redux'
import {imageSlice, loginSlice} from './slice'
import logger from 'redux-logger'
import {storageSlice} from './slice/storageSlice'

export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    storage: storageSlice.reducer,
    image: imageSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(logger)
})

// store.getState 함수가 리턴하는 요소의 타입을 가져옴
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// dispatch와 selector의 타입을 지정

// dispatch에게 thunk 같은 미들웨어의 타입을 알려준다.
export const useAppDispatch: () => AppDispatch = useDispatch

// selector의 인자의 타입을 알려준다.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
