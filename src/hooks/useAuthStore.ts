import { useEffect } from "react"
import { calendarApi } from "../api/calendarApi"
import { clearError, onLogin, onLogout } from "../store/auth/authSlice"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import Swal from "sweetalert2"
import { set } from "date-fns"
import { onLogoutCalendar } from "../store/calendar/calendarSlice"

export const useAuthStore =()=>{
  const {status, user, errorMessage} = useAppSelector(state=>state.auth)
  const dispatch = useAppDispatch()

  useEffect(()=>{
    if(errorMessage !== '') {
      Swal.fire({
        icon:'error',
        title:'Error en la autenticación',
        text: errorMessage,

      })
    }

  },[errorMessage])

  const startLogin = async({email, password} :{email:string, password:string})=>{
    try{
      const {data} = await calendarApi.post('/auth',{email, password})
      const {token, uid,name} =  data
      localStorage.setItem('token',token)
      dispatch(onLogin({user:{uid,name},token}))

    }catch(error){
      if(error.response.data?.errors){
        const listErrors = Object.values(error.response.data.errors)
        const message = listErrors.map(({msg})=> msg).join(' & ')
        dispatch(onLogout({errorMessage:message}))
        setTimeout(() => {dispatch(clearError())}, 10);

        return
      }
      const message = error.response.data.msg || 'Unexpected error'
      dispatch(onLogout({errorMessage:message}))
      setTimeout(() => {dispatch(clearError())}, 10);
    }
  }

  const startRegister = async({email, password, name} :{email:string, password:string, name:string})=>{
    try{
      const {data} = await calendarApi.post('/auth/new',{email, password, name})
      const {token, uid,name:nameUser} =  data
      localStorage.setItem('token',token)
      dispatch(onLogin({user:{uid,nameUser},token}))

    }catch(error){
      if(error.response.data?.errors){
        const listErrors = Object.values(error.response.data.errors)
        const message = listErrors.map(({msg})=> msg).join(' & ')
        dispatch(onLogout({errorMessage:message}))
        setTimeout(() => {dispatch(clearError())}, 10);
        
        return
      }
      const message = error.response.data.msg || 'Unexpected error'
      dispatch(onLogout({errorMessage:message}))
      setTimeout(() => {dispatch(clearError())}, 10);
    }
  }
  
  const checkToken = async()=>{
    const token = localStorage.getItem('token')
    if(!token) return dispatch(onLogout({errorMessage:''}))
    try{
      const {data} = await calendarApi.get('/auth/renew')
      const {token:tokenNew, uid,name} =  data
      localStorage.setItem('token',tokenNew)
      dispatch(onLogin({user:{uid,name},token:tokenNew}))

    }catch(error){
      localStorage.removeItem('token')
      dispatch(onLogout({errorMessage:''}))
    }
  }

  const startLogout=()=>{
    localStorage.removeItem('token')
    dispatch(onLogoutCalendar())
    dispatch(onLogout({errorMessage:''}))
  }
  return {
    user,
    status,
    errorMessage,
    startLogin,
    startRegister,
    checkToken,
    startLogout
  }
}