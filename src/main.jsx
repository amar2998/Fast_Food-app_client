import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { BrowserRouter, } from 'react-router-dom'

import Layout from './layout/Layout.jsx'
import AuthProvider from './context/AuthProvider.jsx'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>

      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </QueryClientProvider>
  </AuthProvider>




)
