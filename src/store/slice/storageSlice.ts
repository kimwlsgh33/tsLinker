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
    }
  }
})

export const {signUpJWT} = storageSlice.actions

export const selectStorage = (state: RootState) => state.storage.signUpJWT
