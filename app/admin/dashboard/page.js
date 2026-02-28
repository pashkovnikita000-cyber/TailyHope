'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ pets: 0, requests: 0, shelters: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      const { count: petsCount } = await supabase.from('pets').select('*', { count: 'exact', head: true })
      const { count: reqCount } = await supabase.from('adoption_requests').select('*', { count: 'exact', head: true })
      const { count: shelterCount } = await supabase.from('shelters').select('*', { count: 'exact', head: true })
      
      setStats({
        pets: petsCount || 0,
        requests: reqCount || 0,
        shelters: shelterCount || 0
      })
      setLoading(false)
    }
    fetchStats()
  }, [])

  return (
    <div className="min-h-screen bg-[#f5f5f7] pt-32 px-6 max-w-7xl mx-auto font-sans text-[#1d1d1f]">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-500 font-medium">Project: Taily Hope 🐾</p>
        </div>
        <Link href="/admin/add-pet" className="bg-[#0071e3] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#0077ed] transition-all shadow-lg shadow-blue-100">
          + Add New Pet
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-[32px] p-10 shadow-sm border border-gray-100">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Animals in Database</div>
          <div className="text-6xl font-black">{loading ? '...' : stats.pets}</div>
        </div>
        <div className="bg-white rounded-[32px] p-10 shadow-sm border border-gray-100">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Adoption Requests</div>
          <div className="text-6xl font-black text-orange-500">{loading ? '...' : stats.requests}</div>
        </div>
        <div className="bg-white rounded-[32px] p-10 shadow-sm border border-gray-100">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Partner Shelters</div>
          <div className="text-6xl font-black text-indigo-600">{loading ? '...' : stats.shelters}</div>
        </div>
      </div>

      <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-100 mb-20 text-center py-20">
        <div className="text-4xl mb-6">👁️</div>
        <h2 className="text-2xl font-bold mb-4">Welcome back, Admin</h2>
        <p className="text-gray-500 max-w-md mx-auto mb-8 font-medium">Use the top button to start adding new tails to the platform across 3 languages.</p>
        <Link href="/" className="text-blue-600 font-bold hover:underline">Return to Home 〉</Link>
      </div>
    </div>
  )
}
