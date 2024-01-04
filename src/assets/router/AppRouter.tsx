import { Route, Routes } from "react-router-dom"
import { LoginPage } from "../../auth/pages/LoginPage"
import { CalendarPage } from "../../calendar/pages/CalendarPage"

export const AppRouter = () => {
  const authStatus =  'unauthenticated'
  return (
    <Routes>
      {/* {authStatus === 'unauthenticated'
        ? <Route path='/auth/*' element={<LoginPage />} />
        : <Route path='/*' element={<CalendarPage />} />
      } */}
      
        <Route path='/auth/*' element={<LoginPage />} />
        <Route path='/*' element={<CalendarPage />} />
      
      <Route path='*' element={<div>404</div>} />
    </Routes>
  )
}
