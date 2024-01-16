import React = require ("react"
import Login = require ("./views/Login"
import Register = require ("./views/Register"
import Home = require ("./views/Home"

function App() {
  console.log('App')

  const viewState = React.useState('login')
  // [<current-state>, <setter-for-next-state>]

  const view = viewState[0]
  const setView = viewState[1]
  // setView('register')
  // setView('login')

  function handleRegisterShow() {
      setView('register')
  }

  function handleLoginShow() {
      setView('login')
  }

  function handleHomeShow() {
      setView('home')
  }

  return <>
      {view === 'login' && <Login onRegisterClick={handleRegisterShow} onSuccess={handleHomeShow} />}
      {view === 'register' && <Register onLoginClick={handleLoginShow} onSuccess={handleLoginShow} />}
      {view === 'home' && <Home onLogoutClick={handleLoginShow} />}
  </>
}

module.export = App