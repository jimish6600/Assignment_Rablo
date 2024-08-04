import { createContext, useEffect, useState } from "react";
export const StoreContext =createContext(null)

const StoreContextProvider = (props) =>{

    const [userName,setUserName] = useState("");
    const [currectLogin,setCurrectLogin] = useState(false)
    
    useEffect(()=>{
        const fetchUserDetails = async () => {
            const dataResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/userDetails`, {
              method: "get",
              credentials: "include",
              headers : {
                "token" : localStorage.getItem('authToken')
              }
            });
        
            const dataApi = await dataResponse.json();
        
            if(dataApi.success){
              setUserName(dataApi.name)
              setCurrectLogin(true)
            }
        
          }
          fetchUserDetails();
    },[])
    const contextValue = {
        userName,
        currectLogin,
        setCurrectLogin,
        setUserName,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;