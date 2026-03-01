'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    
    if (error) {
      alert(error.message)
    } else {
      // Try both methods for maximum reliability
      router.push('/admin/dashboard')
      setTimeout(() => {
        if (window.location.pathname !== '/admin/dashboard') {
          window.location.assign('/admin/dashboard')
        }
      }, 500)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-6 font-sans text-[#1d1d1f]">
      <div className="bg-white p-12 rounded-[40px] shadow-sm max-w-md w-full relative z-50">
        <div className="text-center mb-10">
          <div className="text-3xl mb-4">🐾</div>
          <h1 className="text-3xl font-extrabold tracking-tight">Taily Hope Admin</h1>
          <p className="text-gray-400 mt-2 font-medium">Please sign in to manage tails</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 ml-4">Email</label>
            <input 
              type="email" 
              className="w-full bg-[#f5f5f7] border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-500 transition-all text-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 ml-4">Password</label>
            <input 
              type="password" 
              className="w-full bg-[#f5f5f7] border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-500 transition-all text-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#0071e3] text-white py-4 rounded-2xl font-bold hover:bg-[#0077ed] transition-all disabled:opacity-50 shadow-lg shadow-blue-100 text-lg cursor-pointer"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
