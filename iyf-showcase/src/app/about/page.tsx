'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Clock, ChevronDown, ChevronUp, Zap, Award, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';

interface Stat {
  value: string;
  label: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface AnimatedStatProps {
  value: string;
  label: string;
}

const AboutPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const stats: Stat[] = [
    { value: "7", label: "Successful Seasons" },
    { value: "500+", label: "Graduates" },
    { value: "90%", label: "Employment Rate" }
  ];

  const marketingStack = [
    {
      category: "Digital Fundamentals",
      technologies: ["SEO", "Content Marketing", "Social Media", "Email Marketing", "Analytics", "Paid Advertising"]
    },
    {
      category: "Tools & Platforms",
      technologies: ["Google Analytics", "Meta Business Suite", "Mailchimp", "HubSpot", "Ahrefs", "Google Ads"]
    },
    {
      category: "Skills",
      technologies: ["Copywriting", "Data Analysis", "Strategy Development", "Client Management", "Campaign Planning", "Performance Tracking"]
    }
  ];

  const courseOutline = [
    {
      title: "Weeks 1-3",
      content: "Digital Marketing Foundations",
      topics: ["Marketing Principles", "Channel Overview", "Customer Journey Mapping"]
    },
    {
      title: "Weeks 4-5",
      content: "Content & SEO Mastery",
      topics: ["Content Strategy", "Search Engine Optimization", "Keyword Research"]
    },
    {
      title: "Weeks 6-9",
      content: "Social & Paid Advertising",
      topics: ["Social Media Marketing", "PPC Campaigns", "Ad Creative Development"]
    },
    {
      title: "Weeks 10-12",
      content: "Analytics & Campaign Management",
      topics: ["Data Analysis", "ROI Measurement", "Campaign Optimization"]
    }
  ];

  const faqs: FAQ[] = [
    {
      question: "How long is the program?",
     answer: "The digital marketing program runs for 12 weeks, with classes held during weekends. Each session is carefully structured to ensure comprehensive learning while accommodating working professionals and students."
    },
    {
      question: "What are the prerequisites?",
      answer: "No prior marketing experience is required. However, basic computer literacy, creativity, and a strong desire to learn are essential for success in the program."
    },
    {
      question: "What will I be able to do after the course?",
      answer: "By the end of the course, you'll be able to create and manage comprehensive digital marketing campaigns across multiple channels, analyze performance data, optimize campaigns, and develop effective marketing strategies."
    },
    {
      question: "Is there support after graduation?",
      answer: "Yes, we provide ongoing support through our alumni network, job placement assistance, and continued access to our learning resources and community of marketing professionals."
    },
  ];

  const AnimatedStat: React.FC<AnimatedStatProps> = ({ value, label }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      let finalValue = 0;
      if (value.includes('+')) {
        finalValue = parseInt(value);
      } else if (value.includes('%')) {
        finalValue = parseInt(value);
      } else {
        finalValue = parseInt(value);
      }
      
      let startValue = 0;
      const duration = 2000;
      const increment = finalValue / (duration / 16);

      const timer = setInterval(() => {
        startValue += increment;
        if (startValue > finalValue) {
          setCount(finalValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(startValue));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [value]);

    return (
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 border-t-4 border-purple-500"
      >
        <p className="text-4xl font-bold text-purple-600">
          {count}{value.includes('+') ? '+' : value.includes('%') ? '%' : ''}
        </p>
        <p className="mt-2 text-sm text-gray-600">{label}</p>
      </motion.div>
    );
  };
  
  return (
    <div className="min-h-screen pt-16 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-700 py-20">
        <div className="absolute inset-0 opacity-20 bg-[url('/grid.svg')]"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Empowering Future Digital Marketers
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-purple-100">
              Since our first season, IYF Academy has been committed to providing 
              comprehensive digital marketing education through our weekend sessions.
            </p>
          </motion.div>
        </div>
      </section>

     {/* Stats Section */}
     <section className="relative -mt-10">
       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
         <motion.div 
           variants={staggerChildren}
           initial="initial"
           animate="animate"
           className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
         >
           {stats.map((stat, index) => (
             <AnimatedStat key={index} value={stat.value} label={stat.label} />
           ))}
         </motion.div>
       </div>
     </section>

     {/* Our Approach Section */}
     <section className="py-24 bg-white">
       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
           <motion.div
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6 }}
           >
             <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-xl lg:aspect-auto lg:h-[500px]">
               <Image
                 src="/digital-marketing-team.jpg"
                 alt="Digital marketing team collaboration at IYF Academy"
                 fill
                 className="object-cover"
               />
             </div>
           </motion.div>
           
           <motion.div
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6 }}
           >
             <span className="inline-block px-3 py-1 text-sm font-semibold text-purple-600 bg-purple-100 rounded-full mb-4">OUR APPROACH</span>
             <h2 className="text-3xl font-bold text-gray-900 mb-6">Learn By Doing Real Campaigns</h2>
             <p className="text-lg text-gray-600 mb-6">
               At IYF Digital Marketing Academy, we believe in learning through practical application. 
               Our students work on real marketing campaigns for actual businesses and non-profits, 
               giving them hands-on experience that translates directly to the workplace.
             </p>
             
             <div className="space-y-4">
               {[
                 { icon: Zap, title: "Practical Experience", description: "Work on real client campaigns and build a professional portfolio" },
                 { icon: BarChart, title: "Data-Driven Decisions", description: "Learn to analyze marketing metrics and optimize for results" },
                 { icon: Award, title: "Industry Certification", description: "Prepare for and earn recognized digital marketing certifications" }
               ].map((item, index) => (
                 <div key={index} className="flex items-start">
                   <div className="flex-shrink-0 mt-1">
                     <div className="p-2 bg-purple-100 rounded-lg">
                       <item.icon className="h-5 w-5 text-purple-600" />
                     </div>
                   </div>
                   <div className="ml-4">
                     <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                     <p className="text-gray-600">{item.description}</p>
                   </div>
                 </div>
               ))}
             </div>
           </motion.div>
         </div>
       </div>
     </section>

     {/* Timeline Section */}
<section className="py-20 bg-gray-50">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <span className="inline-block px-3 py-1 text-sm font-semibold text-purple-600 bg-purple-100 rounded-full mb-4">OUR HISTORY</span>
      <h2 className="text-3xl font-bold text-gray-900">Our Growth Journey</h2>
    </motion.div>
    
    <div className="relative">
      {/* Timeline line - hidden on mobile, shown on larger screens */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-purple-200"></div>
      
      <div className="space-y-8 md:space-y-12">
        {[
          {
            year: "2020",
            title: "Digital Marketing Launch",
            description: "Started with fundamentals of digital marketing and social media basics"
          },
          {
            year: "2021",
            title: "Curriculum Expansion",
            description: "Added advanced SEO techniques and content marketing strategies"
          },
          {
            year: "2022",
            title: "Industry Partnerships",
            description: "Formed partnerships with local businesses for real campaign experience"
          },
          {
            year: "2023",
            title: "Advanced Analytics Focus",
            description: "Integrated comprehensive data analysis and ROI tracking curriculum"
          }
        ].map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
          >
            {/* Content Container */}
            <div className="w-full md:w-1/2 px-4 md:px-8">
              <div className={`bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-lg border-l-4 border-purple-500 ${index % 2 === 0 ? 'md:text-right md:border-l-0 md:border-r-4' : ''}`}>
                {/* Year Badge */}
                <div className="inline-block bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                  {item.year}
                </div>
                <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>

            {/* Timeline Dot */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-white"
            />

            {/* Mobile Timeline Line and Dot */}
            <div className="md:hidden flex items-center justify-center w-full my-4">
              <div className="w-px h-16 bg-purple-200"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* Marketing Skills Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-3 py-1 text-sm font-semibold text-purple-600 bg-purple-100 rounded-full mb-4">CURRICULUM</span>
            <h2 className="text-3xl font-bold text-gray-900">Marketing Skills You'll Master</h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600">
              Our comprehensive curriculum covers all aspects of modern digital marketing to prepare you for industry success
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {marketingStack.map((stack, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-md p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-t-4 border-purple-500"
              >
                <h3 className="text-xl font-bold text-purple-600 mb-6">{stack.category}</h3>
                <div className="flex flex-wrap gap-3">
                  {stack.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium cursor-pointer hover:bg-purple-100 transition-colors"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Outline Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-3 py-1 text-sm font-semibold text-purple-600 bg-purple-100 rounded-full mb-4">PROGRAM STRUCTURE</span>
            <h2 className="text-3xl font-bold text-gray-900">Course Outline</h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600">
              Our 12-week curriculum is structured to take you from fundamentals to mastery
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {courseOutline.map((week, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="border-l-4 border-purple-500 rounded-lg p-6 bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 text-purple-800 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-4">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-600">{week.title}</h3>
                    <p className="text-gray-700 font-medium">{week.content}</p>
                  </div>
                </div>
                
                <ul className="space-y-3 pl-4">
                  {week.topics.map((topic, topicIndex) => (
                    <motion.li 
                      key={topicIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: topicIndex * 0.1 }}
                      className="flex items-center text-gray-600"
                    >
                      <Clock className="w-4 h-4 mr-2 text-purple-600 flex-shrink-0" />
                      <span>{topic}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
<section className="py-20 bg-white">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <span className="inline-block px-3 py-1 text-sm font-semibold text-purple-600 bg-purple-100 rounded-full mb-4">GOT QUESTIONS?</span>
      <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
      <p className="mt-4 max-w-2xl mx-auto text-gray-600">
        Find answers to common questions about our digital marketing program
      </p>
    </motion.div>
    
    <div className="max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="mb-4"
        >
          <motion.button
            className={`w-full p-6 text-left bg-white rounded-lg ${openFaq === index ? 'shadow-lg border-l-4 border-purple-500' : 'shadow-md hover:shadow-lg'} transition-all duration-300`}
            onClick={() => setOpenFaq(openFaq === index ? null : index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
              <motion.div
                animate={{ rotate: openFaq === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className={`${openFaq === index ? 'bg-purple-100' : 'bg-gray-100'} w-8 h-8 rounded-full flex items-center justify-center transition-colors`}
              >
                {openFaq === index ? (
                  <ChevronUp className="h-5 w-5 text-purple-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-600" />
                )}
              </motion.div>
            </div>
            {openFaq === index && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="mt-4 text-gray-600 border-t pt-4"
              >
                {faq.answer}
              </motion.div>
            )}
          </motion.button>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-700 py-16">
        <div className="absolute inset-0 opacity-20 bg-[url('/grid.svg')]"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="py-12 px-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl"
          >
            <h2 className="text-3xl font-bold text-white">Ready to Launch Your Digital Marketing Career?</h2>
            <p className="mt-4 text-xl text-purple-100">
              Join our upcoming Season 8 and master the skills employers are looking for.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://freeacademy.iyfkenya.org/register"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 text-base font-medium rounded-full text-purple-700 bg-white hover:bg-purple-50 transition-colors shadow-md"
              >
                Apply Now
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="inline-flex items-center px-6 py-3 text-base font-medium rounded-full text-white border border-white hover:bg-white/10 transition-colors"
              >
                Download Syllabus
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Success Stories Slider */}
      <section className="py-20 bg-gray-50">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <span className="inline-block px-3 py-1 text-sm font-semibold text-purple-600 bg-purple-100 rounded-full mb-4">SUCCESS STORIES</span>
      <h2 className="text-3xl font-bold text-gray-900">Our Graduates Are Everywhere</h2>
      <p className="mt-4 max-w-2xl mx-auto text-gray-600">
        Our alumni work at leading companies and agencies across the Kenyan marketing industry
      </p>
    </motion.div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          company: "I-hub Kenya",
          role: "Social Media Lead",
          name: "Njeri Kamau",
          initials: "NK",
          bgColor: "bg-purple-600",
          quote: "The hands-on campaign experience at IYF Academy gave me a competitive edge in my interviews at Safaricom and helped me land my dream role."
        },
        {
          company: "Mahanaim International School",
          role: "Digital Marketing Manager",
          name: "Daniel Ochieng",
          initials: "DO",
          bgColor: "bg-indigo-600",
          quote: "I secured multiple clients within six months of graduating from IYF Academy, and now I lead digital strategy for one of Kenya's largest media houses."
        },
        {
          company: "Jumia Kenya",
          role: "Growth Marketing Specialist",
          name: "Amina Wanjiku",
          initials: "AW",
          bgColor: "bg-pink-600",
          quote: "The analytics skills I learned at IYF Academy helped me increase our e-commerce conversion rates by 45% in my first quarter at Jumia."
        }
      ].map((story, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col"
        >
          <div className="flex items-center mb-6">
            <div className={`h-16 w-16 rounded-full mr-4 ${story.bgColor} text-white flex items-center justify-center font-semibold text-xl`}>
              {story.initials}
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{story.name}</h3>
              <p className="text-purple-600">{story.role}</p>
              <p className="text-sm text-gray-500">{story.company}</p>
            </div>
          </div>
          <blockquote className="text-gray-600 italic mb-4 flex-grow">
            "{story.quote}"
          </blockquote>
        </motion.div>
      ))}
    </div>
  </div>
</section>
    </div>
  );
};

export default AboutPage;