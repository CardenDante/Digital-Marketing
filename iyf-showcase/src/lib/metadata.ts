// src/lib/metadata.ts
import type { Metadata } from 'next'

export const siteConfig = {
  name: 'IYF Academy - Programming Projects Showcase',
  description: 'Explore innovative projects from Season 7 of IYF Free Weekend Academy. Discover web development, React, and JavaScript projects created by talented students.',
  url: 'https://programming-iyf.harak-a.xyz',
  ogImage: 'https://programming-iyf.harak-a.xyz/og.jpg',
  twitterHandle: '@iyfacademy',
  email: 'info@programming-iyf.harak-a.xyz',
  phone: '+254 700 000 000',
  address: {
    street: '123 Developer Lane',
    city: 'Nairobi',
    country: 'Kenya'
  },
  socialLinks: {
    github: 'https://github.com/IYF-Programming-Class',
    twitter: 'https://twitter.com/iyfacademy',
    linkedin: 'https://linkedin.com/company/iyf-academy'
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
    'Programming Bootcamp',
    'Web Development',
    'Student Projects',
    'Coding Bootcamp Kenya',
    'React Projects',
    'Next.js Projects',
    'JavaScript Projects',
    'TypeScript Projects',
    'Frontend Development',
    'Backend Development',
    'Full Stack Development',
    'Nairobi Coding School',
    'React Portfolio Projects',
    'Next.js Showcase Examples',
    'JavaScript Project Gallery',
    'Web Development Case Studies',
    'Programming Project Showcase',
    'Student Developer Portfolios',
    'Coding Bootcamp Projects',
    'Kenya Tech Education',
    'Software Development Training'
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
        alt: 'IYF Academy Projects Showcase',
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
    title: 'Home | Student Projects Showcase',
  }),
  
  projects: (): Metadata => ({
    ...defaultMetadata,
    title: 'Projects | Browse All Projects',
    description: 'Browse through all projects created by IYF Academy Season 7 students',
  }),

  students: (): Metadata => ({
    ...defaultMetadata,
    title: 'Students | Meet Our Developers',
    description: 'Meet the talented students who created these amazing projects',
  }),

  about: (): Metadata => ({
    ...defaultMetadata,
    title: 'About | Learn About IYF Academy',
    description: 'Learn more about IYF Free Weekend Academy and our programming course',
  }),

  project: (title: string): Metadata => ({
    ...defaultMetadata,
    title: `${title} | Project Details`,
    description: `View details and live demo of ${title} project`,
  }),
}
