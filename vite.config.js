import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        proxy: {
            // Proxy any request starting with /api to the backend server
            '/api': {
                target: 'https://advance-backend-coral.vercel.app/',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path
            }
        }
    }
})
