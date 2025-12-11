import { createContext } from "react";
import * as React from 'react';
import SnackAlert from "./SnackAlert";


 const ToastShowHide = createContext({})

export const ToastProvider = ({children}) =>{
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    
    function showHiddenAlert(message){
        setOpen(true)
        setMessage(message)
        setTimeout(()=>setOpen(false),3000)
    }


    return(
    <ToastShowHide.Provider value={{showHiddenAlert}}>
        <SnackAlert open={open} message={message}/>
        {children}
    </ToastShowHide.Provider>
    )
}
export const useToast =() =>{
    return React.useContext(ToastShowHide)
} 