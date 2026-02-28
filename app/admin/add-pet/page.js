'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AddPet() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '', name_ru: '', name_lv: '',
    type: 'cat', age: '', breed: '',
    description: '', description_ru: '', description_lv: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('pets').insert([formData])
    if (error) alert(error.message)
    else {
      alert('Tail added successfully! 🐾')
      setFormData({ name: '', name_ru: '', name_lv: '', type: 'cat', age: '', breed: '', description: '', description_ru: '', description_lv: '' })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-white pt-32 px-6 max-w-4xl mx-auto font-sans text-[#1d1d1f]">
      <h1 className="text-4xl font-extrabold tracking-tight mb-10">Add New Friend</h1>
      
      <form onSubmit={handleSubmit} className="space-y-12 mb-32">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">English Details</h2>
            <input placeholder="Name" className="w-full bg-[#f5f5f7] border-none rounded-2xl py-4 px-6" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <textarea placeholder="Description" className="w-full bg-[#f5f5f7] border-none rounded-2xl py-4 px-6 h-32" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </section>

          <section className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">Русские детали</h2>
            <input placeholder="Имя" className="w-full bg-[#f5f5f7] border-none rounded-2xl py-4 px-6" value={formData.name_ru} onChange={e => setFormData({...formData, name_ru: e.target.value})} />
            <textarea placeholder="Описание" className="w-full bg-[#f5f5f7] border-none rounded-2xl py-4 px-6 h-32" value={formData.description_ru} onChange={e => setFormData({...formData, description_ru: e.target.value})} />
          </section>
        </div>

        <section className="space-y-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">Latviešu detaļas</h2>
          <input placeholder="Vārds" className="w-full bg-[#f5f5f7] border-none rounded-2xl py-4 px-6" value={formData.name_lv} onChange={e => setFormData({...formData, name_lv: e.target.value})} />
          <textarea placeholder="Apraksts" className="w-full bg-[#f5f5f7] border-none rounded-2xl py-4 px-6 h-32" value={formData.description_lv} onChange={e => setFormData({...formData, description_lv: e.target.value})} />
        </section>

        <button type="submit" disabled={loading} className="w-full bg-black text-white py-5 rounded-[24px] font-bold text-lg hover:opacity-90 transition-all">
          {loading ? 'Saving...' : 'Publish Tail 🐾'}
        </button>
      </form>
    </div>
  )
}
