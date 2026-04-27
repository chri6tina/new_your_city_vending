import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export function getAllPosts() {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'))

  return files
    .map(filename => {
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
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getPostBySlug(slug) {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'))
  for (const filename of files) {
    const filePath = path.join(BLOG_DIR, filename)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)
    const postSlug = data.slug || filename.replace('.md', '')
    if (postSlug === slug) {
      return { slug: postSlug, title: data.title, date: data.date, description: data.description, tags: data.tags || [], content }
    }
  }
  return null
}
