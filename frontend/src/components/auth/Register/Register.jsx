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
    const [role, setRole] = useState('student')

    const onSubmit = async (e) => {
        e.preventDefault()
        if(!email.endsWith(allowedDomain)){
            setErrorMessage("Please enter a valid GLA email")
            return;
        }
        if (!isRegistering) {
            setIsRegistering(true)
            await doCreateUserWithEmailAndPassword(email, password, role).catch(err => {
                setErrorMessage(err.message)
                setIsRegistering(false)
            })
        }
    }

    if(currentUser){
        return <Navigate to="/dashboard" />
    }

    return (
        <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "90vh",
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
              Create an Account
            </Typography>
            {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
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
                required
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                    "& .MuiInputLabel-root": { color: "rgb(73, 75, 130)" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "rgb(66, 71, 200)" },
                      "&:hover fieldset": { borderColor: "rgb(66, 71, 200)" },
                    },
                  }}
              />
              <FormControl fullWidth margin="normal">
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
                variant="contained"
                color="primary"
                fullWidth
                onClick={onSubmit}
                disabled={isRegistering}
                sx={{
                    mt: 2,
                    backgroundColor: "rgb(71, 72, 109)",
                    "&:hover": {
                      backgroundColor: "rgb(109, 111, 178)",
                    },
                  }}
              >
                Sign Up
              </Button>
            </form>
          </CardContent>
          <CardActions sx={{ justifyContent: "center" }}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "rgb(73, 75, 154)" }}
              >
                Login
              </Link>
            </Typography>
          </CardActions>
        </Card>
      </Box>
    )
}

export default Register