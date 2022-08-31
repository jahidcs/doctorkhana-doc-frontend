import { CssBaseline } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Navbr from '../Navbr'

const Layout = () => {
    return (
        <>
            <CssBaseline />
            <Navbr />
            <Outlet />
        </>
    )
}

export default Layout
