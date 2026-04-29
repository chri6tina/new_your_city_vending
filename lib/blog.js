import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { list } from '@vercel/blob'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export async function getAllPosts() {
  let localFiles = []
  if (fs.existsSync(BLOG_DIR)) {
    localFiles = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'))
  }

  let posts = localFiles.map(filename => {
    const filePath = path.join(BLOG_DIR, filename)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)
    return {
      slug: data.slug || filename.replace('.md', ''),
      title: data.title || '',
      date: data.date || '',
      description: data.description || '',
      tags: data.tags || [],
      content,
    }
  })

  // Try to fetch from Vercel Blob
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { blobs } = await list({ prefix: 'blog/' })
      for (const blob of blobs) {
        if (blob.pathname.endsWith('.md')) {
          const res = await fetch(blob.url)
          const raw = await res.text()
          const { data, content } = matter(raw)
          
          // Avoid duplicates if a blob matches a local slug
          const slug = data.slug || blob.pathname.replace('blog/', '').replace('.md', '')
          if (!posts.find(p => p.slug === slug)) {
            posts.push({
              slug,
              title: data.title || '',
              date: data.date || '',
              description: data.description || '',
              tags: data.tags || [],
              content,
            })
          }
        }
      }
    } catch (error) {
      console.error('Error fetching blobs for blog posts:', error)
    }
  }

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export async function getPostBySlug(slug) {
  const posts = await getAllPosts()
  return posts.find(p => p.slug === slug) || null
}
