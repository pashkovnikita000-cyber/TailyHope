'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function Catalog() {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    async function fetchPets() {
      let query = supabase.from('pets').select('*').eq('status', 'available')
      if (filter !== 'all') query = query.eq('type', filter)
      
      const { data, error } = await query
      if (!error) setPets(data || [])
      setLoading(false)
    }
    fetchPets()
  }, [filter])

  return (
    <div className="min-h-screen bg-white pt-32 px-6 max-w-7xl mx-auto selection:bg-indigo-100">
      {/* Navigation Fix */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-tight z-[110]">Taily Hope 🐾</Link>
          <div className="flex space-x-6 text-sm font-medium opacity-60">
            <Link href="/catalog" className="opacity-100 border-b-2 border-indigo-600 z-[110]">Catalog</Link>
            <Link href="/news" className="hover:opacity-100 z-[110]">News</Link>
          </div>
          <Link href="/admin" className="text-xs font-semibold text-blue-600 z-[110]">Admin</Link>
        </div>
      </nav>

      <h1 className="text-5xl font-extrabold tracking-tight mb-12">Search for a Friend</h1>
      
      <div className="flex space-x-3 mb-16 overflow-x-auto pb-2">
        {['all', 'cat', 'dog'].map((t) => (
          <button 
            key={t}
            onClick={() => setFilter(t)}
            className={`px-8 py-3 rounded-full font-bold transition-all z-20 ${filter === t ? 'bg-black text-white' : 'bg-[#f5f5f7] text-gray-500 hover:bg-gray-200'}`}
          >
            {t === 'all' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1) + 's'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 animate-pulse">Searching for tails...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {pets.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-400 italic">No pets found.</div>
          ) : (
            pets.map((pet) => (
              <div key={pet.id} className="bg-[#f5f5f7] rounded-[32px] p-2 hover:shadow-2xl transition-all group cursor-pointer z-20">
                <div className="bg-white rounded-[28px] h-64 flex items-center justify-center text-7xl mb-4 group-hover:scale-[1.02] transition-transform duration-500">
                  {pet.type === 'cat' ? '🐱' : '🐕'}
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold">{pet.name}</h3>
                  <p className="text-gray-400 font-medium">{pet.breed} • {pet.age}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
