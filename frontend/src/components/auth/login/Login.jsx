import React, { useState } from 'react'
import {
    TextField,
    Button,
    Typography,
    Box,
    Card,
    CardContent,
    CardActions,
} from "@mui/material";
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
        // <div className='relative mt-[4rem]'>
        //     <h2>Login</h2>
        //     {errorMessage && <p>{errorMessage}</p>}
        //     <form onSubmit={onSubmit}>
        //         <input
        //             type="email"
        //             value={email}
        //             onChange={(e) => setEmail(e.target.value)}
        //             placeholder="Email"
        //             required
        //         />
        //         <input
        //             type="password"
        //             value={password}
        //             onChange={(e) => setPassword(e.target.value)}
        //             placeholder="Password"
        //             required
        //         />
        //         <button type="submit" disabled={isSigningIn}>Sign In</button>
        //     </form>
        //     <button onClick={onGoogleSignIn} disabled={isSigningIn}>Sign In with Google</button>
        //     <Link to="/forgot-password">Forgot Password?</Link>
        // </div>
        <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "90vh",
          // background: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)',
          backgroundImage: `url('../bg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Card
          sx={{
            maxWidth: 400,
            width: "100%",
            padding: 3,
            borderRadius: "12px",
            boxShadow: 3,
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              align="center"
              mb={2}
              sx={{ fontWeight: "bold", color: "#333" }}
            >
              Welcome Back!
            </Typography>
            {errorMessage && <p>{errorMessage}</p>}
            <form>
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  "& .MuiInputLabel-root": { color: "#2575fc" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#2575fc" },
                    "&:hover fieldset": { borderColor: "#6a11cb" },
                  },
                }}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{
                  "& .MuiInputLabel-root": { color: "#2575fc" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#2575fc" },
                    "&:hover fieldset": { borderColor: "#6a11cb" },
                  },
                }}
              />
              <Button
                onClick={onSubmit}
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSigningIn}
                sx={{
                  mt: 2,
                  backgroundColor: "rgb(71, 72, 109)",
                  "&:hover": {
                    backgroundColor: "rgb(109, 111, 178)",
                  },
                }}
              >
                Login
              </Button>
            </form>
          </CardContent>
          <CardActions sx={{ justifyContent: "center" }}>
            <Typography variant="body2">
              <button
                onClick={onGoogleSignIn}
                disabled={isSigningIn}
                className='text-slate-600 text-[15px] hover:text-indigo-800'
                style={{
                    color: "rgb(66, 71, 200)",
                }}
              >
                Sign In with Google
              </button>
              <br></br>
              <Link 
                to="/forgot-password"
                style={{ textDecoration: "none", color: "#2575fc" }}
                >Forgot Password?
                </Link>
            </Typography>
          </CardActions>
        </Card>
      </Box>
    )
}

export default Login