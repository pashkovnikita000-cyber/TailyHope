'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function Catalog() {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPets() {
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .eq('status', 'available')
      
      if (!error) setPets(data || [])
      setLoading(false)
    }
    fetchPets()
  }, [])

  return (
    <div className="min-h-screen bg-white pt-32 px-6 max-w-7xl mx-auto">
      <h1 className="text-5xl font-extrabold tracking-tight mb-12">Search for a Friend</h1>
      
      {loading ? (
        <div className="text-center py-20 opacity-50">Loading tails...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {pets.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-400 italic">
              No pets available right now. Check back soon!
            </div>
          ) : (
            pets.map((pet) => (
              <div key={pet.id} className="bg-[#f5f5f7] rounded-[32px] p-4 text-center hover:shadow-xl transition-all cursor-pointer">
                <div className="bg-white rounded-3xl h-48 flex items-center justify-center text-6xl mb-4">
                  {pet.type === 'cat' ? '🐱' : '🐕'}
                </div>
                <h3 className="text-xl font-bold">{pet.name}</h3>
                <p className="text-gray-400 text-sm">{pet.breed} • {pet.age}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
