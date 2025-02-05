import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/home/Home.jsx'
import Dashboard from './components/Dashboard/Dashboard'
import Register from './components/auth/Register/Register'
import Login from './components/auth/login/Login'
import { AuthProvider } from './contexts/authContext'
import NavBar from './components/navbar/NavBar.jsx'

const Layout = ({ children }) => (
  <div>
    <NavBar/>
    {children}
  </div>
);


function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <Router>
        <>
          <Routes>
            <Route path="/" 
              element={
                <Layout>
                  <Home/>
                </Layout>
              } 
            />
            <Route path="/dashboard" 
              element={
                <Dashboard />
              } 
            />
            <Route path="/register" 
              element={
                <Layout>
                  <Register />
                </Layout>
              } 
            />
            <Route path="/login" 
              element={
                <Layout>
                  <Login />
                </Layout>
              } 
            />
          </Routes>
        </>
      </Router>
    </AuthProvider>
  )
}

export default App
