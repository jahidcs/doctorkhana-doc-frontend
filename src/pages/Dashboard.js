import { Button, CssBaseline, Grid, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { unsetUserToken } from '../features/authSlice'
import { getToken, removeToken } from '../services/LocalStorageService'
import { useUserProfileQuery } from '../services/userAuthApi'
import ResetPassword from './auth/PasswordReset'

const Dashboard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { access_token } = getToken()
    const { data, isSuccess } = useUserProfileQuery(access_token)
    const [userData, setUserdata] = useState({})
    const [profileData, setProfileData] = useState({})

    useEffect(() => {
        if (data && isSuccess) {
            setUserdata(data.user)
            setProfileData(data.profile)
        }
    }, [data, isSuccess])

    const handleLogout = () => {
        dispatch(unsetUserToken({ access_token: null }))
        removeToken()
        navigate('/auth')
    }
    return (
        <>
            <CssBaseline />
            <Grid container>
                <Grid item sm={4} sx={{ backgroundColor: 'gray', p: 5, color: 'white' }}>
                    <h1>Dashboard</h1>
                    <Typography variant="h5">Email: {userData.email}</Typography>
                    <Typography variant="h6">Name: {profileData.bmdc}</Typography>
                    <Button variant="contained" color="warning" size="large" onClick={handleLogout} sx={{ mt: 8 }}>
                        Logout
                    </Button>
                </Grid>
                <Grid item sm={8}>
                    <ResetPassword />
                </Grid>
            </Grid>
        </>
    )
}

export default Dashboard
