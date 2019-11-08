import React from 'react'

import { Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Login from './components/Login/Login'
import { useFirebaseCurrentUser } from 'fireact'

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const isVerifying = useSelector(state => state.auth.isVerifying)
  const user = useFirebaseCurrentUser()
  return (
        user ? <Home/> : <Login/>
  )
}

export default App