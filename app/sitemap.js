import { getAllPosts } from '../lib/blog'
import { neighborhoods } from '../lib/neighborhoods'
import { services } from '../lib/services'

export const dynamic = 'force-dynamic'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://new-your-city-vending.vercel.app'

const boroughs = ['manhattan', 'brooklyn', 'queens', 'the-bronx', 'staten-island']

export default async function sitemap() {
  const now = new Date()
  const posts = await getAllPosts()

  const staticPages = [
    { url: BASE_URL,              lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/blog`,    lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
  ]

  const boroughPages = boroughs.map((borough) => ({
    url: `${BASE_URL}/boroughs/${borough}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  // 107 neighborhood pages
  const neighborhoodPages = neighborhoods.map((n) => ({
    url: `${BASE_URL}/neighborhoods/${n.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  // 6 service pages
  const servicePages = services.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.88,
  }))

  const blogPages = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...boroughPages, ...neighborhoodPages, ...servicePages, ...blogPages]
}
