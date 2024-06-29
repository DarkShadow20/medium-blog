import { Navigate, Outlet } from "react-router-dom"


export const PrivateRoutes =  () =>{
   
        const token = localStorage.getItem('token')
        console.log(token)
        return (
            token ? <Outlet/> : <Navigate to ='/signin' replace/>
        )
    
}