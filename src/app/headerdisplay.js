import { create } from "zustand"
const useHeader= create((set)=>{
    modedispaly="login",
    checkBackground:(()=>set(state=>({...state,
        modedispaly:state.mode=='login'?'login':'home'
    })))
})