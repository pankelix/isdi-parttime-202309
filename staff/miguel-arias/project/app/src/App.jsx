import { Routes, Route, useNavigate } from 'react-router-dom'

import { Login, Register, Home } from './views'

function App() {
  console.log('App')

  const navigate = useNavigate()

  const handleRegisterShow = () => {
    navigate('/register')
  }
  const handleLoginShow = () => {
    navigate('/login')
  }
  const handleHomeShow = () => {
    navigate('/')
  }

  return <>
    <Routes>
      <Route path='/register' element={<Register onLoginClick={handleLoginShow} onSuccess={handleLoginShow} />} />
      <Route path='/login' element={<Login onRegisterClick={handleRegisterShow} onSuccess={handleHomeShow} />} />
      <Route path='/*' onLogoutClick={handleLoginShow} element={<Home />} />
    </Routes>
  </>
}

export default App
