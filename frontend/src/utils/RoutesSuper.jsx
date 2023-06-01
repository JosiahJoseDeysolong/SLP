import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const PrivateRoutes = () => {
 
    let {user} = useContext(AuthContext)
    
    return(
    <>
        {user && !user.is_staff ? ( <Outlet />) : user && user.is_staff ? (<Navigate to="/admin" />) : 
        !user ? (<Navigate to="/" />) :null}
    </>
    )
}

export default PrivateRoutes;