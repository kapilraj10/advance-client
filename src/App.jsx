import { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import { setAuthToken } from './api'

function App() {
    // Keep the app minimal: default to login view and allow simple toggle to register.
    const [view, setView] = useState('login') // 'login' | 'register'
    const [token, setToken] = useState(() => localStorage.getItem('token'))

    useEffect(() => {
        // Ensure axios auth header is set if token exists
        const t = localStorage.getItem('token')
        if (t) setAuthToken(t)
        const onStorage = (e) => {
            if (e.key === 'token') setToken(e.newValue)
        }
        window.addEventListener('storage', onStorage)
        return () => window.removeEventListener('storage', onStorage)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        setAuthToken(null)
        setToken(null)
        setView('login')
    }

    return (
        <div>
            {token ? (
                <Dashboard onLogout={handleLogout} />
            ) : (
                <div className="container d-flex justify-content-center align-items-center vh-100">
                    <div className="w-100" style={{ maxWidth: 420 }}>

                        <div className="card shadow-sm">
                            <div className="card-body p-4">
                                {view === 'login' ? (
                                    <>
                                        <Login />
                                        <div className="text-center mt-3">
                                            <small>
                                                Don't have an account?{' '}
                                                <button className="btn btn-link p-0" onClick={() => setView('register')}>Register</button>
                                            </small>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Register />
                                        <div className="text-center mt-3">
                                            <small>
                                                Already have an account?{' '}
                                                <button className="btn btn-link p-0" onClick={() => setView('login')}>Login</button>
                                            </small>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
