import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '..'

interface StorageState {
  signUpJWT: string
}

const initialState: StorageState = {
  signUpJWT: ''
}

export const storageSlice = createSlice({
  name: 'storage',
  initialState,
  reducers: {
    signUpJWT: (state, action: PayloadAction<string>) => {
      state.signUpJWT = action.payload
    },
    removeJWT: () => initialState
  }
})

export const {signUpJWT, removeJWT} = storageSlice.actions

export const selectJWT = (state: RootState) => state.storage.signUpJWT
