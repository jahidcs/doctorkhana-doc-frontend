import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Layout from './pages/Layout'
import LoginReg from './pages/auth/LoginReg'
import ResetPassword from './pages/auth/PasswordReset'
import SendPasswordResetEmail from './pages/auth/SendPasswordResetEmail'

function App() {
    const { access_token } = useSelector((state) => state.auth)
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="auth" element={!access_token ? <LoginReg /> : <Navigate to="/dashboard" />} />
                        <Route path="forgotpass" element={<SendPasswordResetEmail />} />
                        <Route path="reset" element={<ResetPassword />} />
                    </Route>
                    <Route path="/dashboard" element={access_token ? <Dashboard /> : <Navigate to="/auth" />} />
                    <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
