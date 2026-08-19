import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL 
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` 
    : process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'https://greylionmaritime.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/'], // Protect administrative panels and private API endpoints
      },
      {
        // Explicitly allow and guide search crawlers and AI search agents (ChatGPT, Gemini, Perplexity)
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'Google-Extended',
          'OAI-SearchBot',
          'PerplexityBot',
          'facebookexternalhit',
          'LinkedInBot',
        ],
        allow: '/',
        disallow: ['/admin', '/api/'],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
