import React from 'react'
import Home from './components/Home'
import Login from './components/Login/Login'
import { useFirebaseCurrentUser } from 'fireact'

function App() {
  const user = useFirebaseCurrentUser()
  return (
        user ? <Home/> : <Login/>
  )
}

export default App