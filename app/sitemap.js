import { getAllPosts } from '../lib/blog'

export const dynamic = 'force-dynamic'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://new-your-city-vending.vercel.app'

const boroughs = ['manhattan', 'brooklyn', 'queens', 'the-bronx', 'staten-island']

export default function sitemap() {
  const now = new Date()
  const posts = getAllPosts()

  const staticPages = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ]

  const boroughPages = boroughs.map((borough) => ({
    url: `${BASE_URL}/boroughs/${borough}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  const blogPages = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...boroughPages, ...blogPages]
}
