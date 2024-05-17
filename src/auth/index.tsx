import type { FC } from 'react'
import { Navigate, useLocation , Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'

const AuthRoute: FC = () => {
  const location = useLocation()
  const token = useSelector((state: RootState) => state.token.token)

  if (location.pathname === '/login') return <Outlet />

  if (token) return <Outlet />

  return <Navigate to="login" replace />
}

export default AuthRoute
