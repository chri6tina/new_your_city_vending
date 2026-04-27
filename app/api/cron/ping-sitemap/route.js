// Vercel Cron Job — runs every Monday at 9am UTC
// Pings Google to re-crawl the sitemap, signaling the site is active and updated
//
// Setup required:
//   1. Add CRON_SECRET to your Vercel environment variables (any random string)
//   2. Add NEXT_PUBLIC_SITE_URL to your Vercel environment variables (your live domain)

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://new-your-city-vending.vercel.app'

export async function GET(request) {
  // Verify the request is from Vercel's cron system
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  const sitemapUrl = `${BASE_URL}/sitemap.xml`
  const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`

  try {
    const res = await fetch(pingUrl, { method: 'GET' })

    const timestamp = new Date().toISOString()

    if (res.ok) {
      console.log(`[${timestamp}] ✅ Sitemap ping sent to Google: ${sitemapUrl}`)
      return Response.json({
        success: true,
        timestamp,
        sitemapUrl,
        googleStatus: res.status,
        message: 'Google sitemap ping successful',
      })
    } else {
      console.error(`[${timestamp}] ⚠️ Google ping returned status ${res.status}`)
      return Response.json({
        success: false,
        timestamp,
        googleStatus: res.status,
        message: 'Google ping returned non-OK status',
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Sitemap ping failed:', error)
    return Response.json({
      success: false,
      error: error.message,
    }, { status: 500 })
  }
}
