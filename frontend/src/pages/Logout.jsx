import React from 'react'
import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from '../store/auth'

const Logout = () => {
    const {LogoutUser} = useAuth()
    useEffect(()=>{
        LogoutUser()

    },[LogoutUser])
  return (
    <Navigate to = "/login"/>

    
  )
}

export default Logout