import { TextField, Button, Box, Alert } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { setUserToken } from '../../features/authSlice'
import { storeToken } from '../../services/LocalStorageService'
import { getToken } from '../../services/LocalStorageService'
import { useLoginUserMutation } from '../../services/userAuthApi'

const DoctorLogin = () => {
    const [error, setError] = useState({
        status: false,
        msg: '',
        type: '',
    })

    const navigate = useNavigate('/')
    const [loginUser, { isLoading }] = useLoginUserMutation()

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const actualData = {
            email: data.get('email'),
            password: data.get('password'),
        }
        const res = await loginUser(actualData)
        if (res.error) {
            setError({ status: true, msg: `${res.error.data.errors.non_field_errors[0]}`, type: 'error' })
        }
        if (res.data) {
            storeToken(res.data.token)
            let { access_token } = getToken()
            dispatch(setUserToken({ access_token: access_token }))
            setError({ status: true, msg: `${res.data.message}`, type: 'success' })
            navigate('/dash')
        }
    }

    let { access_token } = getToken()

    useEffect(() => {
        dispatch(setUserToken({ access_token: access_token }))
    }, [access_token, dispatch])
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
