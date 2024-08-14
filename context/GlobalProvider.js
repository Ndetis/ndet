import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }) => {

    const [isLoggedIn, setIsloggedIn] = useState(true)
    const [user, setUser] = useState(null)
    const [isLoading, setIsloading] = useState(true)

    useEffect(() => {
        getCurrentUser()
        .then((res) => {
            if(res){
                setIsloggedIn(true);
                setUser(res)
            } else {
                setIsloggedIn(false)
                setUser(null)
            }
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(()=> {
            setIsloading(false )
        })
    }, [])
    return (
        <GlobalContext.Provider
            value={{
                 isLoggedIn,
                 setIsloggedIn,
                 user,
                 setUser,
                 isLoading
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}
export default GlobalProvider;
