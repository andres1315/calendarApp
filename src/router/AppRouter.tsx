import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth/pages/LoginPage"
import { CalendarPage } from "../calendar/pages/CalendarPage"
import { useAuthStore } from "../hooks/useAuthStore"
import { useEffect } from "react"

export const AppRouter = () => {
  const {checkToken,status} = useAuthStore()

  useEffect(() => {
    checkToken()
  },[])


  if (status === 'checking') return <h1>Checking...</h1>
  return (
    <Routes>
      {status === 'not-authenticated'
        ? (
          <>
            <Route path='/auth/*' element={<LoginPage />} />
            <Route path='*' element={<Navigate to='/auth/login'/>} />

          </>
        )
        :( 
          <>
            <Route path='/' element={<CalendarPage />} />
            <Route path='*' element={<Navigate to='/'/>} />

          </>
        )
      }
      

      
    </Routes>
  )
}
