import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/home/Home'
import Dashboard from './components/Dashboard/Dashboard'
import Register from './components/auth/Register/Register'
import Login from './components/auth/login/Login'
import { AuthProvider } from './contexts/authContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <Router>
        <>
          <nav>
            <Link to="/">Home</Link> | <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </>
      </Router>
    </AuthProvider>
  )
}

export default App
