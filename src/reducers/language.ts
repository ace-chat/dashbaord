import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  language: 'en',
}

export const langSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload
    },
  },
})

export const { changeLanguage } = langSlice.actions

export default langSlice.reducer
