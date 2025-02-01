import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth'
import { useAuth } from '../../../contexts/authContext'

function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const { currentUser } = useAuth()
    const allowedDomain="@gla.ac.in";

    const onSubmit = async (e) => {
        e.preventDefault()
        if(!email.endsWith(allowedDomain)){
            setErrorMessage("Please enter a valid GLA email")
            return;
        }
        if (!isRegistering) {
            setIsRegistering(true)
            await doCreateUserWithEmailAndPassword(email, password).catch(err => {
                setErrorMessage(err.message)
                setIsRegistering(false)
            })
        }
    }

    if(currentUser){
        return <Navigate to="/dashboard" />
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
            {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
            <form onSubmit={onSubmit} className="flex flex-col">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="mb-4 p-2 border border-gray-300 rounded"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="mb-4 p-2 border border-gray-300 rounded"
                />
                <button type="submit" disabled={isRegistering} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400">
                    Register
                </button>
            </form>
            <Link to="/login" className="block text-center text-blue-500 mt-4 hover:underline">
                Already have an account? Login
            </Link>
        </div>
    )
}

export default Register