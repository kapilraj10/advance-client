import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { Toaster } from 'react-hot-toast'

const root = createRoot(document.getElementById('root'))
root.render(
    <>
        <App />
        <Toaster />
    </>
)
