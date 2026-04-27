import Link from 'next/link'
import { getAllPosts } from '../../lib/blog'

export const metadata = {
  title: 'Vending & Micro Market Blog | NYC Vending Tips & Insights',
  description: 'Expert tips, guides, and insights about vending machines, micro markets, and office refreshment services for New York City businesses.',
}

export default function BlogIndex() {
  const posts = getAllPosts()

  return (
    <main>
      <style>{`
        .blog-card { transition: box-shadow 0.2s, transform 0.2s; }
        .blog-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.08); transform: translateY(-2px); }
      `}</style>

      {/* Hero */}
      <section style={{ background: '#0A1628', padding: '80px 0 60px' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <span className="section-label">Our Blog</span>
          <h1 className="section-title" style={{ color: 'white', marginTop: '8px' }}>
            NYC Vending Insights
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '17px', lineHeight: 1.65, marginTop: '12px' }}>
            Tips, guides, and local insights for New York City businesses looking to improve their workplace refreshment experience.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section style={{ padding: '60px 0 80px', background: '#F8FAFC' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          {posts.length === 0 ? (
            <p style={{ color: '#64748B', textAlign: 'center' }}>No posts yet — check back soon!</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {posts.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                  <article className="blog-card" style={{
                    background: 'white', border: '1px solid #E2E8F0', borderRadius: '14px',
                    padding: '28px 32px',
                  }}>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} style={{
                          background: '#EFF6FF', color: '#2563EB', fontSize: '11px',
                          fontWeight: 700, padding: '3px 10px', borderRadius: '100px',
                          textTransform: 'uppercase', letterSpacing: '0.04em',
                        }}>{tag}</span>
                      ))}
                    </div>
                    <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', lineHeight: 1.3, marginBottom: '10px', letterSpacing: '-0.02em' }}>
                      {post.title}
                    </h2>
                    <p style={{ fontSize: '15px', color: '#64748B', lineHeight: 1.65, marginBottom: '16px' }}>
                      {post.description}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '13px', color: '#94A3B8' }}>
                        {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: '#2563EB' }}>Read more →</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
