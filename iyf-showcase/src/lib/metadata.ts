import type { Metadata } from 'next'

export const siteConfig = {
  name: 'IYF Academy - Digital Marketing Showcase',
  description: 'Explore innovative digital marketing campaigns from IYF Free Weekend Academy. Discover SEO, social media, content marketing, and analytics campaigns created by talented students.',
  url: 'https://marketing-iyf.harak-a.xyz',
  ogImage: 'https://marketing-iyf.harak-a.xyz/og.jpg',
  twitterHandle: '@iyfacademy',
  email: 'info@marketing-iyf.harak-a.xyz',
  phone: '+254 700 000 000',
  address: {
    street: '123 Marketing Avenue',
    city: 'Nairobi',
    country: 'Kenya'
  },
  socialLinks: {
    github: 'https://github.com/IYF-Marketing-Class',
    twitter: 'https://twitter.com/iyfacademy',
    linkedin: 'https://linkedin.com/company/iyf-academy',
    instagram: 'https://instagram.com/iyfacademy'
  }
}


export const defaultMetadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'IYF Academy',
    'Digital Marketing Academy',
    'Marketing Bootcamp',
    'Digital Marketing Kenya',
    'Student Campaigns',
    'SEO Training',
    'Social Media Marketing',
    'Content Marketing',
    'Email Marketing',
    'Digital Analytics',
    'Google Ads Training',
    'Meta Ads Training',
    'Digital Marketing Portfolio',
    'Marketing Strategy',
    'Campaign Management',
    'Marketing ROI',
    'Nairobi Marketing School',
    'Digital Marketing Case Studies',
    'Marketing Campaign Gallery',
    'Student Marketer Portfolios',
    'Digital Marketing Training',
    'Kenya Marketing Education',
    'Digital Campaign Showcase'
  ],

  metadataBase: new URL(siteConfig.url),

  authors: [
    {
      name: 'IYF Academy',
      url: siteConfig.url,
    },
  ],
  creator: 'IYF Academy',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'IYF Academy Digital Marketing Showcase',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
    site: siteConfig.twitterHandle,
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

// Page-specific metadata generators
export const generateMetadata = {
  home: (): Metadata => ({
    ...defaultMetadata,
    title: 'Home | Digital Marketing Showcase',
  }),
  
  campaigns: (): Metadata => ({
    ...defaultMetadata,
    title: 'Campaigns | Browse All Marketing Campaigns',
    description: 'Browse through all digital marketing campaigns created by IYF Academy students',
  }),

  students: (): Metadata => ({
    ...defaultMetadata,
    title: 'Students | Meet Our Digital Marketers',
    description: 'Meet the talented students who created these impressive digital marketing campaigns',
  }),

  about: (): Metadata => ({
    ...defaultMetadata,
    title: 'About | Learn About IYF Academy',
    description: 'Learn more about IYF Free Weekend Academy and our digital marketing courses',
  }),
  
}