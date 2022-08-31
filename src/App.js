import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Contact from './components/pages/Contact'
import Dashboard from './components/pages/Dashboard'
import Home from './components/pages/Home'
import Layout from './components/pages/Layout'
import LoginReg from './components/pages/auth/LoginReg'
import ResetPassword from './components/pages/auth/PasswordReset'
import SendPasswordResetEmail from './components/pages/auth/SendPasswordResetEmail'

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="auth" element={<LoginReg />} />
                        <Route path="forgotpass" element={<SendPasswordResetEmail />} />
                        <Route path="reset" element={<ResetPassword />} />
                    </Route>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
