'use client'
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-tight z-[110] cursor-pointer">Taily Hope 🐾</Link>
          <div className="hidden md:flex space-x-8 text-xs font-medium opacity-60">
            <Link href="/catalog" className="hover:opacity-100 transition-opacity cursor-pointer z-[110]">Find a Tail</Link>
            <Link href="/news" className="hover:opacity-100 transition-opacity cursor-pointer z-[110]">News</Link>
          </div>
          <Link href="/admin" className="text-xs font-semibold text-blue-600 cursor-pointer hover:opacity-80 transition-opacity z-[110]">Admin</Link>
        </div>
      </nav>

      <main className="pt-32 relative z-10">
        {/* Hero Section */}
        <section className="text-center px-6 mb-24 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-[1.1]">
            Give a Tail. <br />
            <span className="text-indigo-600">Change a Story.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 font-medium mb-10 max-w-2xl mx-auto">
            Discover your next family member. <br />Modern, simple, and full of hope for every animal in Latvia.
          </p>
          <div className="flex justify-center space-x-6">
            <Link href="/catalog" className="bg-[#0071e3] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#0077ed] transition-all shadow-xl shadow-blue-100 active:scale-95 inline-block z-20 cursor-pointer">
              Browse Animals
            </Link>
            <button 
              onClick={() => alert('Logic works!')}
              className="text-[#0066cc] text-lg font-medium flex items-center hover:underline z-20 cursor-pointer"
            >
              How it works <span className="ml-1 text-sm">〉</span>
            </button>
          </div>
        </section>

        {/* Bento Grid */}
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          <Link href="/catalog" className="bg-[#f5f5f7] rounded-[32px] p-12 text-center transition-all hover:scale-[1.01] hover:bg-[#f0f0f2] cursor-pointer group block z-20">
            <h2 className="text-4xl font-bold mb-2">Businka</h2>
            <p className="text-xl text-gray-500 mb-8 font-medium">Calm. Elegant. European.</p>
            <div className="w-full h-64 bg-white/50 rounded-3xl flex items-center justify-center text-8xl mb-8 group-hover:scale-105 transition-transform duration-500">
              🐱
            </div>
            <span className="text-[#0066cc] text-lg font-medium flex items-center justify-center hover:underline">
              Adopt now <span className="ml-1 text-sm">〉</span>
            </span>
          </Link>

          <Link href="/catalog" className="bg-[#f5f5f7] rounded-[32px] p-12 text-center transition-all hover:scale-[1.01] hover:bg-[#f0f0f2] cursor-pointer group block z-20">
            <h2 className="text-4xl font-bold mb-2">Sergey</h2>
            <p className="text-xl text-gray-500 mb-8 font-medium">Strong. Loyal. Tabby King.</p>
            <div className="w-full h-64 bg-white/50 rounded-3xl flex items-center justify-center text-8xl mb-8 group-hover:scale-105 transition-transform duration-500">
              🐈
            </div>
            <span className="text-[#0066cc] text-lg font-medium flex items-center justify-center hover:underline">
              Adopt now <span className="ml-1 text-sm">〉</span>
            </span>
          </Link>
        </section>

        {/* Small Cards */}
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          <Link href="/catalog" className="bg-[#f5f5f7] p-8 rounded-[32px] flex flex-col items-center text-center group cursor-pointer block z-20">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">📍</div>
            <h3 className="text-2xl font-bold mb-2">Local Shelters</h3>
            <p className="text-gray-500 font-medium mb-6">Find a friend near you.</p>
            <span className="text-[#0066cc] font-medium hover:underline">Explore 〉</span>
          </Link>
          <Link href="/news" className="bg-[#f5f5f7] p-8 rounded-[32px] flex flex-col items-center text-center group cursor-pointer block z-20">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">❤️</div>
            <h3 className="text-2xl font-bold mb-2">Latest News</h3>
            <p className="text-gray-500 font-medium mb-6">Updates from our community.</p>
            <span className="text-[#0066cc] font-medium hover:underline">Read more 〉</span>
          </Link>
          <Link href="/admin" className="bg-[#f5f5f7] p-8 rounded-[32px] flex flex-col items-center text-center group cursor-pointer block z-20">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">📋</div>
            <h3 className="text-2xl font-bold mb-2">Admin Panel</h3>
            <p className="text-gray-500 font-medium mb-6">Manage shelter listings.</p>
            <span className="text-[#0066cc] font-medium hover:underline">Login 〉</span>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-20 px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Taily Hope • Latvia Animal Welfare 2026</p>
          <div className="h-px bg-gray-100 w-full"></div>
          <p className="text-[10px] text-gray-300 leading-relaxed max-w-xl mx-auto">
            1. Adoption requires a verified profile and background check by the respective shelter. 
            2. Taily Hope is a non-profit initiative dedicated to digitalizing animal rescue operations.
          </p>
          <p className="text-xs text-gray-400">© 2026 Taily Hope. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
