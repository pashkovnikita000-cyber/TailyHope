'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ pets: 0, requests: 0, shelters: 0 })
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/admin')
      } else {
        fetchData()
      }
    }

    async function fetchData() {
      const { count: petsCount } = await supabase.from('pets').select('*', { count: 'exact', head: true })
      const { count: shelterCount } = await supabase.from('shelters').select('*', { count: 'exact', head: true })
      const { data: reqData, count: reqCount } = await supabase
        .from('adoption_requests')
        .select('*, pets(name)')
        .order('created_at', { ascending: false })
        .limit(5)
      
      setStats({
        pets: petsCount || 0,
        requests: reqCount || 0,
        shelters: shelterCount || 0
      })
      setRequests(reqData || [])
      setLoading(false)
    }

    checkUser()
  }, [router])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-pulse text-indigo-600 font-bold">Taily Hope Admin...</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f5f5f7] pt-32 px-6 max-w-7xl mx-auto font-sans text-[#1d1d1f]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-500 font-medium">Welcome back, Angelina. 👁️</p>
        </div>
        <div className="flex space-x-4">
          <Link href="/admin/add-pet" className="bg-[#0071e3] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#0077ed] transition-all shadow-lg shadow-blue-100">
            + Add Pet
          </Link>
          <button 
            onClick={async () => { await supabase.auth.signOut(); router.push('/admin'); }}
            className="bg-white text-black border border-gray-200 px-6 py-3 rounded-2xl font-bold hover:bg-gray-50 transition-all"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-[32px] p-10 shadow-sm border border-gray-100">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Total Tails</div>
          <div className="text-6xl font-black">{stats.pets}</div>
        </div>
        <div className="bg-white rounded-[32px] p-10 shadow-sm border border-gray-100">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">New Inquiries</div>
          <div className="text-6xl font-black text-orange-500">{stats.requests}</div>
        </div>
        <div className="bg-white rounded-[32px] p-10 shadow-sm border border-gray-100">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Verified Shelters</div>
          <div className="text-6xl font-black text-indigo-600">{stats.shelters}</div>
        </div>
      </div>

      <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden mb-20">
        <div className="p-8 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Recent Inquiries</h2>
          <button className="text-blue-600 font-bold">See All 〉</button>
        </div>
        <div className="divide-y divide-gray-50">
          {requests.length === 0 ? (
            <div className="p-20 text-center text-gray-400 italic">No incoming requests yet.</div>
          ) : (
            requests.map((req) => (
              <div key={req.id} className="p-8 flex justify-between items-center hover:bg-gray-50 transition-colors">
                <div>
                  <div className="text-lg font-bold">{req.user_name} <span className="text-gray-400 font-normal">for</span> {req.pets?.name}</div>
                  <div className="text-sm text-gray-400">{req.user_email} • {new Date(req.created_at).toLocaleDateString()}</div>
                </div>
                <div className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                  req.status === 'pending' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                }`}>
                  {req.status}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
