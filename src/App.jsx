import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Deals from './pages/Deals'
import About from './pages/About'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'
import ServiceUnavailable from './pages/ServiceUnavailable'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/menu" element={<Layout><Menu /></Layout>} />
          <Route path="/deals" element={<Layout><Deals /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/faq" element={<Layout><FAQ /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/legal" element={<Layout><Legal /></Layout>} />
          <Route path="/503" element={<ServiceUnavailable />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
