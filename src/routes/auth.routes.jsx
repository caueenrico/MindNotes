import {Routes, Route, Navigate} from 'react-router-dom'

import { SignIn } from '../pages/SignIn'
import { SignUp } from '../pages/SignUp'

export function AuthRoutes(){
  const user = localStorage.getItem("@mindnotes:user");

  return(
    <Routes>
      <Route path='/' element={<SignIn/>} />
      <Route path='/register' element={<SignUp/>} />

      {/* //para rotas que nao existem */}
      {!user && <Route path='*' element={<Navigate to='/'/>}/> }
    </Routes>
  )
}