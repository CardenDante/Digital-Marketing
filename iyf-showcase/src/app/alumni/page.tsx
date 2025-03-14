'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, Building2, Workflow, ArrowRight, Star, Trophy, GraduationCap } from 'lucide-react';
import Image from 'next/image';

const AlumniPage = () => {
  const [selectedSeason, setSelectedSeason] = useState(1);

  const seasonImages: string[] = [
    '/seasons/ss1.PNG',
    '/seasons/ssn6.PNG',
    '/seasons/ssn3.jpg',
    '/seasons/ss4.jpg',
    '/seasons/session5.png',
    '/seasons/ssn621.jpg',
    '/seasons/ssn7.jpg',
  ];

  const seasons = [
    {
      number: 1,
      year: "2023",
      graduates: 19,
      highlight: "First Cohort Launch",
      achievement: "90% Employment Rate"
    },
    {
      number: 2,
      year: "2023",
      graduates: 83,
      highlight: "Expanded Curriculum",
      achievement: "Multiple StartUp Founders"
    },
    {
      number: 3,
      year: "2023",
      graduates: 75,
      highlight: "Industry Partnerships",
      achievement: "International Placements"
    },
    {
      number: 4,
      year: "2023",
      graduates: 74,
      highlight: "Tech Innovation Focus",
      achievement: "Open Source Contributors"
    },
    {
      number: 5,
      year: "2024",
      graduates: 184,
      highlight: "Advanced Projects",
      achievement: "Hackathon Winners"
    },
    {
      number: 6,
      year: "2024",
      graduates: 115,
      highlight: "Full Stack Mastery",
      achievement: "Tech Leaders"
    },
    {
      number: 7,
      year: "2024",
      graduates: 113,
      highlight: "Current Season",
      achievement: "Ongoing Success"
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 to-green-800 py-24">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="inline-block px-4 py-1 mb-8 bg-white/10 rounded-full text-green-100 backdrop-blur-sm">
              Empowering Tech Careers Since 2023
            </span>
            <h1 className="text-5xl font-bold text-white mb-6 sm:text-6xl lg:text-7xl">
              Our Alumni Legacy
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-green-100">
              Discover the journey of transformation and success across our seven seasons 
              of creating outstanding developers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="relative -mt-16 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: GraduationCap, value: "560+", label: "Total Graduates" },
              { icon: Building2, value: "100+", label: "Partner Companies" },
              { icon: Trophy, value: "92%", label: "Employment Rate" },
              { icon: Star, value: "50+", label: "Success Stories" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-xl p-6 transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <stat.icon className="h-8 w-8 text-green-600 mb-4" />
                  <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    {/* Season Timeline */}
<section className="py-24 bg-gray-50">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey Through Seasons</h2>
      <p className="text-lg text-gray-600">Explore the evolution and growth of our programming academy</p>
    </div>

    {/* Season Selector - Grid for mobile, Pills for desktop */}
    <div className="mb-12">
      {/* Mobile Season Selector - Grid */}
      <div className="grid grid-cols-3 gap-2 md:hidden">
        {seasons.map((season) => (
          <motion.button
            key={season.number}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedSeason(season.number)}
            className={`p-3 rounded-xl text-sm font-medium transition-all duration-300
              ${selectedSeason === season.number 
                ? 'bg-green-600 text-white shadow-lg' 
                : 'bg-white text-gray-600 hover:bg-green-50 shadow'}`}
          >
            S{season.number}
          </motion.button>
        ))}
      </div>

      {/* Desktop Season Selector - Pills */}
      <div className="hidden md:flex justify-center space-x-4">
        {seasons.map((season) => (
          <motion.button
            key={season.number}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedSeason(season.number)}
            className={`px-8 py-4 rounded-full text-base font-medium transition-all duration-300
              ${selectedSeason === season.number 
                ? 'bg-green-600 text-white shadow-lg' 
                : 'bg-white text-gray-600 hover:bg-green-50 shadow'}`}
          >
            Season {season.number}
          </motion.button>
        ))}
      </div>
    </div>

    {/* Selected Season Details - Mobile Optimized */}
    <motion.div
      key={selectedSeason}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8"
    >
      {seasons.map((season) => (
        season.number === selectedSeason && (
          <div key={season.number} className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="md:grid md:grid-cols-2">
              {/* Content Section - Now on the left for desktop */}
              <div className="p-6 md:p-8">
                {/* Season Label - Moved from image overlay to content section for desktop */}
                <div className="inline-block px-4 py-1 bg-green-600/90 rounded-full text-sm mb-6 text-white md:mb-8">
                  Season {season.number} • {season.year}
                </div>

                {/* Graduates Count */}
                <div className="flex items-center gap-4 mb-8 bg-green-50 p-4 rounded-2xl">
                  <div className="h-14 w-14 rounded-xl bg-green-100 flex items-center justify-center">
                    <GraduationCap className="h-7 w-7 text-green-600" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{season.graduates}</p>
                    <p className="text-gray-600">Graduates</p>
                  </div>
                </div>

                {/* Season Details */}
                <div className="space-y-6">
                  {/* Highlight */}
                  <div className="bg-gray-50 rounded-2xl p-5">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Season Highlight</h3>
                    <p className="text-gray-600">{season.highlight}</p>
                  </div>

                  {/* Achievement */}
                  <div className="bg-gray-50 rounded-2xl p-5">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Key Achievement</h3>
                    <div className="flex items-start gap-3">
                      <Trophy className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <p className="text-gray-600">{season.achievement}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Section - Now on the right for desktop */}
              <div className="relative h-[200px] md:h-full">
                <Image
                  src={seasonImages[season.number - 1]}
                  alt={`Season ${season.number} Highlights`}
                  fill
                  className="object-cover"
                />
                {/* Gradient overlay - Only visible on mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent md:hidden">
                  <div className="absolute bottom-0 left-0 p-6 text-white md:hidden">
                    <div className="inline-block px-4 py-1 bg-green-600/90 rounded-full text-sm mb-2">
                      Season {season.number} • {season.year}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      ))}
    </motion.div>
  </div>
</section>

      {/* Impact Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Building2,
                title: "Industry Impact",
                description: "Our alumni work at leading tech companies, from startups to enterprises, making significant contributions to the industry.",
                highlights: ["Tech Giants", "Local Startups", "International Companies"]
              },
              {
                icon: Briefcase,
                title: "Career Growth",
                description: "Graduates have achieved remarkable career progression, taking on leadership roles and founding their own companies.",
                highlights: ["Technical Leads", "Senior Developers", "Startup Founders"]
              },
              {
                icon: Workflow,
                title: "Community Influence",
                description: "Alumni actively contribute to the tech community through mentorship, open source, and knowledge sharing.",
                highlights: ["Mentors", "Open Source", "Tech Speakers"]
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-50 rounded-xl p-8"
              >
                <item.icon className="h-12 w-12 text-green-600 mb-6" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 mb-6">{item.description}</p>
                <ul className="space-y-2">
                  {item.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-center text-green-600">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Join Our Success Story</h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Be part of our next cohort and start your journey towards becoming a successful developer.
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://freeacademy.iyfkenya.org/register"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-green-600 bg-white hover:bg-green-50 transition-colors"
            >
              Start Your Journey
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AlumniPage;