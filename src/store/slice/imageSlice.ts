import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '..'

type DirImage = {
  id: string
  uri: string
}

interface ImageState {
  Images: DirImage[]
}

const initialState: ImageState = {
  Images: []
}

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    addImage: (state, action: PayloadAction<DirImage>) => {
      state.Images = [action.payload, ...state.Images]
    },
    removeImage: (state, action: PayloadAction<string>) => {
      state.Images.filter((img) => img.id !== action.payload)
    },
    resetImages: () => initialState
  }
})

export const {addImage, removeImage, resetImages} = imageSlice.actions

export const selectImages = (state: RootState) => state.image.Images
