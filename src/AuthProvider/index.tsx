import useAuth from './useAuth'
import { Outlet,  } from 'react-router-dom'
import Login from '../page/login/Login'

function AuthProvider({children}:{children:React.ReactNode}) {
  const {token} = useAuth()
  if(token) return children
  return <></>
}
export function PrivateRoute() {
  const {token} = useAuth()
  return token?<Outlet/>:<Login/>
}
export default AuthProvider