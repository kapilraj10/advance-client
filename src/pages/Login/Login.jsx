import React, { useState } from 'react'
import { login as loginUser, setAuthToken } from '../../api'
import toast from 'react-hot-toast'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            const res = await loginUser({ email, password })
            const token = res.data.token
            if (token) {
                localStorage.setItem('token', token)
                setAuthToken(token)
                toast.success('Login successful')
                setTimeout(() => window.location.href = '/', 400)
            } else {
                toast.error('No token returned from server')
                setError('No token returned from server')
            }
        } catch (err) {
            const msg = err?.response?.data?.msg || err.message || 'Login failed'
            setError(msg)
            toast.error(msg)
        } finally { setLoading(false) }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='email' className='form-label'>Email address</label>
                    <input id='email' type='email' className='form-control' placeholder='Enter email' autoComplete='username' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <small className='form-text text-muted'>We'll never share your email with anyone else.</small>
                </div>

                <div className='form-group'>
                    <label htmlFor='password' className='form-label'>Password</label>
                    <input id='password' type='password' className='form-control' placeholder='Password' autoComplete='current-password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <button type='submit' className='btn btn-primary' disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
            </form>

            {error && <div className='alert alert-danger mt-3'>{error}</div>}
        </div>
    )
}

export default Login
