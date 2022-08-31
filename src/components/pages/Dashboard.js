import { Button, CssBaseline, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ResetPassword from './auth/PasswordReset'

const Dashboard = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        console.log('Logout Clicked')
        navigate('/auth')
    }
    return (
        <>
            <CssBaseline />
            <Grid container>
                <Grid item sm={4} sx={{ backgroundColor: 'gray', p: 5, color: 'white' }}>
                    <h1>Dashboard</h1>
                    <Typography variant="h5">Email: sonam@gmail.com</Typography>
                    <Typography variant="h6">Name: Sonam</Typography>
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
