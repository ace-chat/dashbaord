import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import menuSlice from '@/reducers/menu.ts'
import langSlice from '@/reducers/language.ts'
import tokenSlice from '@/reducers/token.ts'

const persistConfig = {
  key: 'root',
  storage,
}

const reducer = combineReducers({
  menu: menuSlice,
  lang: langSlice,
  token: tokenSlice,
})

const persistedReducer = persistReducer(persistConfig, reducer)
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger],
})

export const persist = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
