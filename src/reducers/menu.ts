import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  open: 'home',
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<string>) => {
      state.open = action.payload
    },
  },
})

export const { toggle } = menuSlice.actions

export default menuSlice.reducer
