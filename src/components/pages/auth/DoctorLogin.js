import { TextField, Button, Box, Alert } from '@mui/material'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const DoctorLogin = () => {
    const [error, setError] = useState({
        status: false,
        msg: '',
        type: '',
    })

    const navigate = useNavigate('/')

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const actualData = {
            email: data.get('email'),
            password: data.get('password'),
        }
        if (actualData.email && actualData.password) {
            setError({ status: true, msg: 'login succeed', type: 'success' })
            navigate('/')
        } else {
            setError({ status: true, msg: 'All fields are required', type: 'error' })
        }
    }
    return (
        <div>
            <Box component="form" noValidate sx={{ mt: 1 }} id="doctor-login" onSubmit={handleSubmit}>
                <TextField margin="normal" required fullWidth id="email" name="email" label="Email Address" />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                />

                <Box textAlign="center">
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            px: 5,
                        }}>
                        Login
                    </Button>
                </Box>
                <NavLink to="/forgotpass">Forgot Password ?</NavLink>
                {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
            </Box>
        </div>
    )
}

export default DoctorLogin
