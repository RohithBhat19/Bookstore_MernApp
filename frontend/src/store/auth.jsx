import { useContext } from "react";
import { createContext, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({children}) =>{
    const[token,setToken] = useState(localStorage.getItem("token"))
   
    const storeTokenInLs = (serverToken) =>{
        setToken(serverToken)
        return localStorage.setItem("token",serverToken)
    }
    let isLoggedIn = !!token
    const LogoutUser = () =>{
        setToken("")
        return localStorage.removeItem("token")
    }

    return(
        <AuthContext.Provider value={{isLoggedIn,storeTokenInLs,LogoutUser}}>
            {children}
        </AuthContext.Provider>

    )

}
export const useAuth = () =>{
    const authContextValue = useContext(AuthContext)
    if(!authContextValue){
        throw new Error("useAuth used outside of the Provider")
    }
    return authContextValue

}