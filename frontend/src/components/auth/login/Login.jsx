import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { doSignInWithEmailAndPaassword, doSignInWithGoogle } from '../../../firebase/auth'
import { useAuth } from '../../../contexts/authContext'

function Login(){
    const authContext = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    
    if (!authContext) {
        return <p>Error: Auth context is not available.</p>
    }

    const { currentUser } = authContext

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!isSigningIn) {
            if (!email.endsWith('@gla.ac.in')) {
                setErrorMessage('Only @gla.ac.in email addresses are allowed.')
                return
            }
            setIsSigningIn(true)
            await doSignInWithEmailAndPaassword(email, password).catch(err => {
                setErrorMessage(err.message)
                setIsSigningIn(false)
            })
        }
    }
    const onGoogleSignIn = (e) => {
        e.preventDefault()
        if (!isSigningIn) {
            setIsSigningIn(true)
            doSignInWithGoogle().catch(err => {
                setErrorMessage(err.message)
                setIsSigningIn(false)
            })
        }
    }

    if (currentUser) {
        return <Navigate to="/dashboard" />
    }

    return (
        <div className='relative mt-[4rem]'>
            <h2>Login</h2>
            {errorMessage && <p>{errorMessage}</p>}
            <form onSubmit={onSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit" disabled={isSigningIn}>Sign In</button>
            </form>
            <button onClick={onGoogleSignIn} disabled={isSigningIn}>Sign In with Google</button>
            <Link to="/forgot-password">Forgot Password?</Link>
        </div>
    )
}

export default Login