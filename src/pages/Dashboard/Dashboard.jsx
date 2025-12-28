import React, { useState, useEffect } from 'react'
import { setAuthToken, getProfile } from '../../api'
import './dashboard.css'
import AdvanceDashboard from '../../components/Advance/AdvanceDashboard'

const Dashboard = ({ onLogout }) => {
    const [active, setActive] = useState('home')
    const [profile, setProfile] = useState(null)
    const [loadingProfile, setLoadingProfile] = useState(false)

    useEffect(() => {
        if (active !== 'profile') return
        let mounted = true
            ; (async () => {
                try {
                    setLoadingProfile(true)
                    const res = await getProfile()
                    if (mounted) setProfile(res.data)
                } catch (err) {
                    console.error('getProfile error', err)
                } finally { if (mounted) setLoadingProfile(false) }
            })()
        return () => { mounted = false }
    }, [active])

    const handleLogout = () => {
        localStorage.removeItem('token')
        setAuthToken(null)
        if (onLogout) onLogout()
        else window.location.href = '/'
    }

    return (
        <div className="dashboard">
            <aside className="sidebar bg-light border-end">
                <div className="sidebar-top p-3">
                    <h5 className="mb-0">MyApp</h5>
                    <small className="text-muted">Admin</small>
                </div>

                <nav className="sidebar-nav d-flex flex-column p-2">
                    <button className={`nav-btn text-start ${active === 'home' ? 'active' : ''}`} onClick={() => setActive('home')}>Home</button>
                    <button className={`nav-btn text-start ${active === 'profile' ? 'active' : ''}`} onClick={() => setActive('profile')}>Profile</button>
                    <button className={`nav-btn text-start ${active === 'advances' ? 'active' : ''}`} onClick={() => setActive('advances')}>Advances</button>
                    <button className={`nav-btn text-start ${active === 'settings' ? 'active' : ''}`} onClick={() => setActive('settings')}>Settings</button>
                </nav>

                <div className="sidebar-bottom p-3">
                    <button className="btn btn-danger w-100" onClick={handleLogout}>Quit</button>
                </div>
            </aside>

            <main className="main-content">
                <div className="container-fluid p-4">
                    {active === 'home' && (
                        <div className="content-card">
                            <h3>Welcome to your dashboard</h3>
                            <p className="text-muted">This is the home area. Add widgets or stats here.</p>
                            <div className="mt-3">
                                <button className="btn btn-primary me-2" onClick={() => setActive('advances')}>Create / Manage Advances</button>
                                <button className="btn btn-outline-secondary" onClick={() => setActive('profile')}>View Profile</button>
                            </div>
                        </div>
                    )}

                    {active === 'profile' && (
                        <div className="content-card">
                            <h3>Your profile</h3>
                            {loadingProfile ? (
                                <p className="text-muted">Loading...</p>
                            ) : profile ? (
                                <div>
                                    <p><strong>Name:</strong> {profile.name}</p>
                                    <p><strong>Email:</strong> {profile.email}</p>
                                    <p><strong>Username:</strong> {profile.username}</p>
                                    <p className="text-muted small">Member since: {new Date(profile.createdAt).toLocaleString()}</p>
                                </div>
                            ) : (
                                <p className="text-muted">No profile data available.</p>
                            )}
                        </div>
                    )}

                    {active === 'settings' && (
                        <div className="content-card">
                            <h3>Settings</h3>
                            <p className="text-muted">Application settings and preferences.</p>
                        </div>
                    )}
                    {active === 'advances' && (
                        <div className="content-card">
                            <AdvanceDashboard />
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Dashboard
