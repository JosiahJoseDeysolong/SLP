import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const PrivateRoutes = () => {
 
    let {user} = useContext(AuthContext)
    
    return(
    <>
        {!user ? ( <Outlet />) : user && !user.is_superuser ? (<Navigate to="/super" />) : 
         user && user.is_superuser ? (<Navigate to="/admin" />) :null}
    </>
    )
}

export default PrivateRoutes;