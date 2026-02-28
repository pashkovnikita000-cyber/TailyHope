'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function NewsPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNews() {
      const { data, error } = await supabase
        .from('news_posts')
        .select('*')
        .order('published_at', { ascending: false })
      
      if (!error) setPosts(data || [])
      setLoading(false)
    }
    fetchNews()
  }, [])

  return (
    <div className="min-h-screen bg-white pt-32 px-6 max-w-5xl mx-auto font-sans text-[#1d1d1f]">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">Latest News</h1>
        <p className="text-xl text-gray-500 font-medium">Updates from our Facebook community</p>
      </div>

      {loading ? (
        <div className="text-center py-20 opacity-50">Syncing with community...</div>
      ) : (
        <div className="space-y-12 mb-32">
          {posts.length === 0 ? (
            <div className="apple-card p-12 text-center bg-[#f5f5f7] rounded-[32px]">
              <p className="text-gray-400 italic mb-6">No news posts imported yet.</p>
              <a 
                href="https://www.facebook.com/groups/1CRvN2xc1m/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-blue px-8 py-3 inline-block"
              >
                Visit Facebook Group
              </a>
            </div>
          ) : (
            posts.map((post) => (
              <article key={post.id} className="bg-[#f5f5f7] rounded-[40px] overflow-hidden transition-all hover:scale-[1.01]">
                {post.image_url && (
                  <div className="w-full h-96 bg-gray-200 relative">
                    <img src={post.image_url} alt="News" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-10">
                  <p className="text-gray-800 leading-relaxed text-lg whitespace-pre-wrap mb-6">
                    {post.content}
                  </p>
                  <div className="flex justify-between items-center border-t border-gray-200 pt-6">
                    <span className="text-sm text-gray-400 font-medium">
                      {new Date(post.published_at).toLocaleDateString()}
                    </span>
                    <a href={`https://facebook.com/${post.fb_post_id}`} className="text-blue-600 font-bold hover:underline">
                      View Original 〉
                    </a>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      )}
    </div>
  )
}
