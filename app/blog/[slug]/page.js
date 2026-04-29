import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '../../../lib/blog'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} | NYC Vending Blog`,
    description: post.description,
  }
}

// Simple markdown to HTML — no external parser needed for basic posts
function markdownToHtml(md) {
  return md
    // Headers
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Tables — basic
    .replace(/\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)+)/g, (match, header, rows) => {
      const ths = header.split('|').filter(Boolean).map(h => `<th>${h.trim()}</th>`).join('')
      const trs = rows.trim().split('\n').map(row => {
        const tds = row.split('|').filter(Boolean).map(d => `<td>${d.trim()}</td>`).join('')
        return `<tr>${tds}</tr>`
      }).join('')
      return `<table><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table>`
    })
    // Horizontal rules
    .replace(/^---$/gm, '<hr />')
    // Unordered lists
    .replace(/^\- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.+)$/gm, (line) => {
      if (line.startsWith('<')) return line
      return line
    })
    .replace(/^(?!<)(.+)/gm, '<p>$1</p>')
    // Clean up empty paragraphs
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<h[1-6]>)/g, '$1')
    .replace(/(<\/h[1-6]>)<\/p>/g, '$1')
    .replace(/<p>(<ul>)/g, '$1')
    .replace(/(<\/ul>)<\/p>/g, '$1')
    .replace(/<p>(<li>)/g, '$1')
    .replace(/(<\/li>)<\/p>/g, '$1')
    .replace(/<p>(<table>)/g, '$1')
    .replace(/(<\/table>)<\/p>/g, '$1')
    .replace(/<p>(<hr \/>)<\/p>/g, '$1')
}

export default async function BlogPost({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const html = markdownToHtml(post.content)

  return (
    <main>
      {/* Hero */}
      <section style={{ background: '#0A1628', padding: '80px 0 60px' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {post.tags.map(tag => (
              <span key={tag} style={{
                background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)',
                fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '100px',
                textTransform: 'uppercase', letterSpacing: '0.04em',
              }}>{tag}</span>
            ))}
          </div>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 900, color: 'white', lineHeight: 1.15, letterSpacing: '-0.025em' }}>
            {post.title}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginTop: '16px' }}>
            {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} · NYC Vending
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '60px 0 80px', background: '#F8FAFC' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <article
            style={{
              background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px',
              padding: '48px 48px',
            }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <a href="/#contact" className="btn btn-primary" style={{ fontSize: '17px', padding: '16px 36px' }}>
              Request a Free Site Visit →
            </a>
          </div>
        </div>
      </section>

      <style>{`
        article h2 { font-size: 22px; font-weight: 800; color: #0F172A; margin: 32px 0 12px; letter-spacing: -0.02em; }
        article h3 { font-size: 18px; font-weight: 700; color: #0F172A; margin: 24px 0 8px; }
        article p { font-size: 16px; color: #374151; line-height: 1.75; margin: 0 0 16px; }
        article strong { font-weight: 700; color: #0F172A; }
        article a { color: #2563EB; font-weight: 600; }
        article ul { margin: 0 0 16px 20px; }
        article li { font-size: 16px; color: #374151; line-height: 1.75; margin-bottom: 6px; }
        article table { width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 14px; }
        article th { background: #0A1628; color: white; padding: 10px 16px; text-align: left; font-weight: 700; }
        article td { padding: 10px 16px; border-bottom: 1px solid #E2E8F0; color: #374151; }
        article tr:nth-child(even) td { background: #F8FAFC; }
        article hr { border: none; border-top: 1px solid #E2E8F0; margin: 32px 0; }
      `}</style>
    </main>
  )
}
