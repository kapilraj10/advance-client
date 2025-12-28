import axios from 'axios'

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://advance-backend-coral.vercel.app/'
})

export function setAuthToken(token) {
    if (token) {
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete API.defaults.headers.common['Authorization']
    }
}

// Auth
export const register = (payload) => API.post('/api/auth/register', payload)
export const login = (payload) => API.post('/api/auth/login', payload)
export const getProfile = () => API.get('/api/auth/me')

// Advances / dashboard
export const monthlySummary = (params) => API.get('/api/advances', { params })
export const advancesDashboard = () => API.get('/api/advances/dashboard/stats')
export const getAdvance = (id) => API.get(`/api/advances/${id}`)
export const addAdvanceUsage = (id, payload) => API.post(`/api/advances/${id}/usages`, payload)
export const createAdvance = (payload) => API.post('/api/advances', payload)
export const updateAdvance = (id, payload) => API.put(`/api/advances/${id}`, payload)
export const deleteAdvance = (id) => API.delete(`/api/advances/${id}`)

export default API
