import React from 'react'
import { useAuth } from '../../contexts/authContext'
import { doSignOut } from '../../firebase/auth'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const { currentUser } = useAuth()
    const navigate=useNavigate();

    const handleSignOut = async () => {
        try {
            await doSignOut()
            navigate('/');
        } catch (error) {
            console.error("Error signing out: ", error)
        }
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {currentUser.email}</p>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    )
}

export default Dashboard
