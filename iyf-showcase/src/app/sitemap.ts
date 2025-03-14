import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://marketing-iyf.harak-a.xyz'

  return [
    { 
      url: baseUrl, 
      lastModified: new Date().toISOString(),
      priority: 1.0,
      changeFrequency: 'daily' 
    },
    { 
      url: `${baseUrl}/projects`, 
      lastModified: new Date().toISOString(),
      priority: 0.9,
      changeFrequency: 'weekly' 
    },
    { 
      url: `${baseUrl}/students`, 
      lastModified: new Date().toISOString(),
      priority: 0.8,
      changeFrequency: 'weekly' 
    },
    { 
      url: `${baseUrl}/about`, 
      lastModified: new Date().toISOString(),
      priority: 0.7,
      changeFrequency: 'monthly' 
    },
    { 
      url: `${baseUrl}/alumni`, 
      lastModified: new Date().toISOString(),
      priority: 0.7,
      changeFrequency: 'monthly' 
    },

  ]
}
