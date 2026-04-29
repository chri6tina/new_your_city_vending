import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const maxDuration = 300; // 5 minutes max duration for OpenAI

export async function GET(request) {
  // Optional: Add cron secret authorization
  const authHeader = request.headers.get('authorization');
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const topics = [
      "The Impact of Smart Vending Machines on NYC Office Culture",
      "Why Micro-Markets are Replacing Traditional Vending in Manhattan",
      "Healthy Vending Options for Brooklyn Tech Startups",
      "How to Maximize Passive Income with Vending Machines in Queens",
      "The Evolution of Vending Machine Technology in 2026",
      "AI-Powered Vending: The Future of Automated Retail in NYC",
      "Top 5 Locations for High-Traffic Vending in the Bronx",
      "Cashless Vending: Catering to the Modern New Yorker",
      "Sustainable and Eco-Friendly Vending Solutions for NYC Businesses",
      "Why Staten Island Businesses Are Upgrading Their Breakrooms"
    ];
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    const currentDate = new Date().toISOString().split('T')[0];

    const prompt = `
      Write a highly detailed, deeply researched, 1500-word SEO-optimized blog post about: "${randomTopic}".
      The target audience is business owners, facility managers, and entrepreneurs in New York City.
      The tone should be professional, authoritative, and engaging.
      Include specific references to NYC boroughs, business culture, and modern vending technology (like cashless payments, AI inventory tracking, and micro-markets).
      
      Format the response as a valid Markdown file with YAML frontmatter.
      The frontmatter must contain:
      - title: (A catchy, SEO-friendly title)
      - slug: (a-url-friendly-version-of-the-title)
      - date: "${currentDate}"
      - description: (A compelling meta description under 160 characters)
      - tags: (Array of 3-5 relevant tags, e.g., ["NYC Vending", "Smart Vending", "Business"])
      
      The body of the markdown should contain the 1500-word article, properly formatted with H2 and H3 headings, bold text, bullet points, and short, readable paragraphs.
      Ensure the total length strictly meets or exceeds the 1500-word count. Dive deep into statistics, hypothetical case studies, and actionable advice.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert copywriter and SEO specialist focusing on the automated retail and vending machine industry in New York City."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 3000,
    });

    const generatedContent = response.choices[0].message.content;
    
    // Extract slug from frontmatter to use as filename
    const slugMatch = generatedContent.match(/slug:\s*([^\n\r]+)/);
    let slug = `auto-generated-${Date.now()}`;
    if (slugMatch && slugMatch[1]) {
      slug = slugMatch[1].replace(/['"]/g, '').trim();
    }
    
    const filename = `blog/${slug}.md`;

    const blob = await put(filename, generatedContent, {
      access: 'public',
      addRandomSuffix: false, // Ensure consistent URL for the same slug
    });

    return NextResponse.json({
      success: true,
      message: `Successfully generated and uploaded blog post`,
      topic: randomTopic,
      url: blob.url,
      slug: slug
    });
  } catch (error) {
    console.error('Error generating blog post:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
