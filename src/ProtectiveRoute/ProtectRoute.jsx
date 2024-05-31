
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../Context/Auth'



const ProtectiveRoutes = () => {

 const {isAuth} = useAuth()
  return (
    isAuth  ? <Outlet/> : <Navigate to='/login'/>   
  )
}

export default ProtectiveRoutes
