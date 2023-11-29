import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import '../fonts/stylesheet.css';
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Spin } from 'antd'
import router from '@/router'
import store, { persist } from '@/store'
import 'virtual:svg-icons-register';

import '@/i18n/index.ts'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Spin />} persistor={persist}>
        <RouterProvider
          router={router}
          fallbackElement={<Spin />}
          future={{ v7_startTransition: true }}
        />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
