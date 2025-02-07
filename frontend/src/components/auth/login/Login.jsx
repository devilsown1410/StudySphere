import React, { useState } from 'react'
import {
    TextField,
    Button,
    Typography,
    Box,
    Card,
    CardContent,
    CardActions,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
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
    const [role, setRole] = useState('student')
    
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
            await doSignInWithEmailAndPaassword(email, password, role).catch(err => {
                setErrorMessage(err.message)
                setIsSigningIn(false)
            })
        }
    }
    const onGoogleSignIn = (e) => {
        e.preventDefault()
        if (!isSigningIn) {
            setIsSigningIn(true)
            doSignInWithGoogle(role).catch(err => {
                setErrorMessage(err.message)
                setIsSigningIn(false)
            })
        }
    }

    if (currentUser) {
        return <Navigate to="/dashboard" />
    }

    return (
        <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
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
                  "& .MuiInputLabel-root": { color: "rgb(73, 75, 130)" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "rgb(66, 71, 200)" },
                    "&:hover fieldset": { borderColor: "rgb(66, 71, 200)" },
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
                    "& .MuiInputLabel-root": { color: "rgb(73, 75, 130)" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "rgb(66, 71, 200)" },
                      "&:hover fieldset": { borderColor: "rgb(66, 71, 200)" },
                    },
                  }}
              />
              <FormControl 
                fullWidth margin="normal"
                sx={{
                  "& .MuiInputLabel-root": { color: "rgb(73, 75, 130)" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "rgb(66, 71, 200)" },
                    "&:hover fieldset": { borderColor: "rgb(66, 71, 200)" },
                  },
                }}
              >
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  label="Role"
                >
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="university">University</MenuItem>
                </Select>
              </FormControl>
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
                    color: "rgb(114, 66, 140)",
                }}
              >
                Sign In with Google
              </button>
              <br></br>
              <Link 
                to="/forgot-password"
                style={{ textDecoration: "none", color: "rgb(73, 75, 154)" }}
                >Forgot Password?
                </Link>
            </Typography>
          </CardActions>
        </Card>
      </Box>
    )
}

export default Login