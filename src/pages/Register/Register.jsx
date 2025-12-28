import React, { useState } from 'react'
import { register as registerUser, setAuthToken } from '../../api'
import toast from 'react-hot-toast'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const res = await registerUser({ name, email, password })
            const token = res.data.token
            if (token) {
                localStorage.setItem('token', token)
                setAuthToken(token)
                toast.success('Registration successful!')
                setTimeout(() => window.location.href = '/', 600)
            } else {
                toast.error('No token returned from server')
            }
        } catch (err) {
            const msg = err?.response?.data?.msg || err.message || 'Registration failed'
            setError(msg)
            toast.error(msg)
        } finally { setLoading(false) }
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='name' className='form-label'>Name</label>
                    <input id='name' type='text' className='form-control' placeholder='Your name' value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div className='form-group'>
                    <label htmlFor='email' className='form-label'>Email address</label>
                    <input id='email' type='email' className='form-control' placeholder='Enter email' autoComplete='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <small className='form-text text-muted'>We'll never share your email with anyone else.</small>
                </div>

                <div className='form-group'>
                    <label htmlFor='password' className='form-label'>Password</label>
                    <input id='password' type='password' className='form-control' placeholder='Password' autoComplete='new-password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <button type='submit' className='btn btn-primary' disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
            </form>

            {error && <div className='alert alert-danger mt-3'>{error}</div>}
        </div>
    )
}

export default Register
