// Dynamic sitemap — lastModified always returns today's date
// This signals to Google that content is fresh every time it crawls
export const dynamic = 'force-dynamic'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://new-your-city-vending.vercel.app'

const boroughs = ['manhattan', 'brooklyn', 'queens', 'the-bronx', 'staten-island']

export default function sitemap() {
  const now = new Date()

  const staticPages = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ]

  const boroughPages = boroughs.map((borough) => ({
    url: `${BASE_URL}/boroughs/${borough}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  return [...staticPages, ...boroughPages]
}
