'use client';

import React, { useEffect, useState } from 'react';
import { ExternalLink, ArrowRight, TrendingUp, Target, Users, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import SeasonSelector from '@/components/SeasonSelector';
import { useSeasons } from '@/lib/contexts/SeasonContext';

interface FeaturedProject {
  id: number;
  title: string;
  student: string;
  description: string;
  url: string;
  githubUrl?: string;
  category: string;
  grade: string;
}

const HomePage = () => {
  const { currentSeason, isLoading: isLoadingSeason } = useSeasons();
  const [featuredProjects, setFeaturedProjects] = useState<FeaturedProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch featured projects when season changes
  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      if (!currentSeason) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        const url = `/api/projects?seasonId=${currentSeason.id}&featured=true&withStudentInfo=true`;
        console.log('Fetching featured projects from:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch featured projects');
        }
        
        const data = await response.json();
        console.log('Featured projects data:', data);
        console.log('Number of featured projects:', data.length);
        
        setFeaturedProjects(data);
      } catch (err) {
        console.error('Error fetching featured projects:', err);
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFeaturedProjects();
  }, [currentSeason]);

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `IYF Academy Digital Marketing Showcase - ${currentSeason?.name || 'All Seasons'}`,
    "description": "Explore innovative digital marketing campaigns from IYF Free Weekend Academy",
    "url": "https://marketing-iyf.harak-a.xyz",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": featuredProjects.map((project, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "CreativeWork",
          "name": project.title || `${project.student}'s Campaign`,
          "description": project.description || "A student project from IYF Digital Marketing Academy",
          "url": project.url
        }
      }))
    }
  };

  const stats = [
    { value: featuredProjects.length > 0 ? `${featuredProjects.length}+` : "20+", label: "Campaigns Created" },
    { value: "10+", label: "Marketing Platforms" },
    { value: "100%", label: "Job Placement Rate" }
  ];

  const features = [
    {
      icon: TrendingUp,
      title: "Data-Driven Strategies",
      description: "Learn to create analytics-based marketing campaigns that deliver measurable results."
    },
    {
      icon: Target,
      title: "Multi-Channel Marketing",
      description: "Master SEO, social media, email, and content marketing techniques for integrated campaigns."
    },
    {
      icon: Users,
      title: "Industry Mentorship",
      description: "Get guidance from experienced digital marketers working with top brands and agencies."
    }
  ];
  
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
       {/* Hero Section */}
       <section className="relative bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-700 min-h-[600px] flex items-center">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Transforming Ideas Into
            <span className="block mt-2">Digital Marketing Success</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-purple-50">
            {isLoadingSeason 
              ? 'Loading...' 
              : `Discover outstanding digital marketing campaigns created by our talented students during 
              ${currentSeason?.name} of the IYF Free Weekend Academy digital marketing course.`
            }
          </p>
          <div className="mt-6 flex justify-center">
            <SeasonSelector />
          </div>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/campaigns"
              className="rounded-full bg-white px-8 py-3 text-base font-semibold text-purple-600 hover:bg-purple-50 transition-colors"
            >
              View Campaigns
              <ArrowRight className="inline-block ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section - Updated */}
      <section className="relative -mt-12 sm:-mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300 border-t-4 border-purple-500"
              >
                <div className="text-4xl font-bold text-purple-600">{stat.value}</div>
                <p className="mt-2 text-sm font-medium text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="featured-projects" className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-purple-600 bg-purple-100 rounded-full mb-4">SUCCESS STORIES</span>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Featured Marketing Campaigns
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Highlighting some of our outstanding student campaigns that demonstrate strategic excellence and creative thinking.
            </p>
          </div>

          {isLoading ? (
            // Loading state for featured projects
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="rounded-2xl bg-white shadow-md overflow-hidden">
                  <div className="w-full h-[300px] bg-gray-200 animate-pulse"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            // Error state
            <div className="text-center py-12 mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Error loading featured campaigns
              </h3>
              <p className="text-gray-600">
                {error}
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : featuredProjects.length > 0 ? (
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Campaign Preview */}
                  <div className="w-full h-[300px] relative bg-white rounded-xl overflow-hidden border border-gray-200">
                    {/* Browser Top Bar */}
                    <div className="bg-gray-100 border-b border-gray-200 p-3 flex items-center absolute top-0 left-0 right-0 z-10">
                      <div className="flex space-x-2">
                        <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>
                        <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full"></span>
                        <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                      </div>
                    </div>
                    
                    {/* Iframe Container */}
                    <div className="absolute inset-0 pt-12 bg-white">
                      <iframe
                        src={project.url}
                        className="w-[300%] h-[300%] origin-top-left scale-[0.33] transform-gpu"
                        style={{
                          transformOrigin: 'top left',
                          transform: 'scale(0.33)',
                        }}
                        title={`${project.student}'s Campaign - ${project.title || project.student}`}
                        loading="eager"
                        allow="fullscreen"
                      />
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-purple-900/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-gray-900 px-6 py-3 rounded-full flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-md"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Campaign
                      </a>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="inline-flex items-center rounded-full bg-purple-50 px-3 py-1 text-sm font-medium text-purple-700">
                        {project.category || 'Campaign'}
                      </span>
                      <span className="text-sm text-gray-500">{project.grade}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                      {project.title || `${project.student}'s Campaign`}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">By {project.student}</p>
                    <p className="mt-4 text-gray-600 line-clamp-2">{project.description || 'A student campaign from IYF Digital Marketing Academy'}</p>
                    
                    {/* Links */}
                    <div className="mt-6 flex items-center justify-between pt-4 border-t">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700"
                        >
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Case Study
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No featured campaigns found
              </h3>
              <p className="text-gray-600">
                Check back later or explore all campaigns in our gallery.
              </p>
              <Link
                href="/campaigns"
                className="mt-4 inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                View All Campaigns
              </Link>
            </div>
          )}
        </div>
      </section>
      
      {/* Course Overview Section - Updated */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-800">
                Why Choose Us
              </div>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Comprehensive Digital Marketing Education
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                IYF Free Weekend Academy provides hands-on digital marketing education 
                to aspiring marketers. Our practical approach ensures students gain 
                real-world experience through campaign-based learning with actual clients.
              </p>
              <div className="mt-10 space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50">
                        <feature.icon className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                      <p className="mt-2 text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative order-1 lg:order-2 aspect-square w-full overflow-hidden rounded-2xl shadow-xl lg:aspect-auto lg:h-[600px]">
              <Image
                src="/digital-marketing.jpg"
                alt="Students working on digital marketing campaigns at IYF Academy"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills You'll Gain Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-purple-600 bg-purple-100 rounded-full mb-4">COURSE CURRICULUM</span>
            <h2 className="text-3xl font-bold text-gray-900">Skills You'll Gain</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive curriculum covers everything you need to become a successful digital marketer
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "SEO & SEM", bgColor: "bg-purple-100", textColor: "text-purple-700" },
              { name: "Social Media Marketing", bgColor: "bg-blue-100", textColor: "text-blue-700" },
              { name: "Content Marketing", bgColor: "bg-green-100", textColor: "text-green-700" },
              { name: "Email Marketing", bgColor: "bg-yellow-100", textColor: "text-yellow-700" },
              { name: "Analytics & Data", bgColor: "bg-red-100", textColor: "text-red-700" },
              { name: "Paid Advertising", bgColor: "bg-indigo-100", textColor: "text-indigo-700" },
              { name: "Conversion Optimization", bgColor: "bg-pink-100", textColor: "text-pink-700" },
              { name: "Marketing Strategy", bgColor: "bg-teal-100", textColor: "text-teal-700" }
            ].map((skill, index) => (
              <div 
                key={index} 
                className={`${skill.bgColor} ${skill.textColor} rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300`}
              >
                <p className="font-semibold">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-purple-600 bg-purple-100 rounded-full mb-4">TESTIMONIALS</span>
            <h2 className="text-3xl font-bold text-gray-900">What Our Graduates Say</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Wanjiku Kamau",
                initials: "WK",
                bgColor: "bg-purple-600",
                role: "Digital Marketing Manager",
                quote: "The IYF Digital Marketing course completely transformed my career trajectory. The hands-on experience with real campaigns gave me the confidence to excel in my new role at Safaricom."
              },
              {
                name: "Juma Otieno",
                initials: "JO",
                bgColor: "bg-indigo-600",
                role: "Social Media Specialist",
                quote: "What sets IYF apart is their practical approach and industry mentorship. I was able to build a portfolio of real campaigns that impressed my employers at KCB Group."
              },
              {
                name: "Faith Njeri",
                initials: "FN",
                bgColor: "bg-pink-600",
                role: "SEO Consultant",
                quote: "From knowing nothing about digital marketing to landing my dream job in 3 months - IYF Academy's weekend course was absolutely worth every minute I invested."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                <div className="flex-grow">
                  <div className="text-purple-500 mb-4">
                    {/* Quote icon */}
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 mb-6">{testimonial.quote}</p>
                </div>
                <div className="flex items-center">
                  <div className={`h-12 w-12 rounded-full mr-4 ${testimonial.bgColor} text-white flex items-center justify-center font-semibold text-lg`}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a 
              href="https://freeacademy.iyfkenya.org/register" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-purple-600 hover:bg-purple-700 transition-colors focus:outline-none"
            >
              Apply for Next Cohort
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;