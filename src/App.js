import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { DashboardPage, ProfilePage, SettingsPage, AppointmentDetailsPage } from './pages'
// import Contact from './pages/Contact'
// import Dashboard from './pages/Dashboard'
// import Home from './pages/Home'
import Layout from './pages/Layout'
import LoginReg from './pages/auth/LoginReg'
// import ResetPassword from './pages/auth/PasswordReset'
import SendPasswordResetEmail from './pages/auth/SendPasswordResetEmail'

function App() {
    const { access_token } = useSelector((state) => state.auth)
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/auth" element={<Layout />}>
                        <Route path="auth" element={!access_token ? <LoginReg /> : <Navigate to="/dash" />} />
                        <Route path="forgotpass" element={<SendPasswordResetEmail />} />
                        {/* <Route path="reset" element={<ResetPassword />} /> */}
                    </Route>
                    <Route path="/dash" element={access_token ? <DashboardPage /> : <Navigate to="/auth" />} />
                    <Route path="/profile" element={access_token ? <ProfilePage /> : <Navigate to="/auth" />} />
                    <Route path="/settings" element={access_token ? <SettingsPage /> : <Navigate to="/auth" />} />

                    <Route path="/appointment-details/:id" element={<AppointmentDetailsPage />} />

                    <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
