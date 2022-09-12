import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material'
import { NavLink } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import { getToken } from '../services/LocalStorageService'

const Navbr = () => {
    const { access_token } = getToken()
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                            DoctorKhana
                        </Typography>
                        {/* <Button
                            component={NavLink}
                            to="/"
                            style={({ isActive }) => {
                                return { backgroundColor: isActive ? '#81d4fa' : '' }
                            }}
                            sx={{ color: 'white', textTransform: 'none' }}>
                            Home
                        </Button>
                        <Button
                            component={NavLink}
                            to="/contact"
                            style={({ isActive }) => {
                                return { backgroundColor: isActive ? '#81d4fa' : '' }
                            }}
                            sx={{ color: 'white', textTransform: 'none' }}>
                            Contact
                        </Button> */}
                        {access_token ? (
                            <Button
                                component={NavLink}
                                to="/dash"
                                style={({ isActive }) => {
                                    return { backgroundColor: isActive ? '#81d4fa' : '' }
                                }}
                                sx={{ color: 'white', textTransform: 'none' }}>
                                Dashboard
                            </Button>
                        ) : (
                            <Button
                                component={NavLink}
                                to="/auth"
                                style={({ isActive }) => {
                                    return { backgroundColor: isActive ? '#81d4fa' : '' }
                                }}
                                sx={{ color: 'white', textTransform: 'none' }}>
                                Login / Registration
                            </Button>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default Navbr
