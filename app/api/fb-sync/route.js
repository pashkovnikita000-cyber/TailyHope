import { createClient } from '@supabase/supabase-js'

// User profiles for admin management
export const dynamic = 'force-dynamic'

export async function POST(req) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  const { posts } = await req.json()

  const { data, error } = await supabase
    .from('news_posts')
    .upsert(
      posts.map(p => ({
        fb_post_id: p.id,
        content: p.message,
        image_url: p.full_picture,
        published_at: p.created_time
      })),
      { onConflict: 'fb_post_id' }
    )

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ success: true, count: posts.length })
}
