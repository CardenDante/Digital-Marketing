'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';
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
    { value: "12", label: "Weeks Per Season" }
  ];

  const techStack = [
    {
      category: "Frontend",
      technologies: ["HTML5", "CSS3", "JavaScript", "React", "Next.js", "Tailwind CSS"]
    },
    {
      category: "Backend",
      technologies: ["Node.js", "Express.js", "MongoDB", "REST APIs"]
    },
    {
      category: "Tools",
      technologies: ["Git", "GitHub", "VS Code", "Linux", "Command Line", "Codespaces"]
    }
  ];

  const courseOutline = [
    {
      title: "Weeks 1-3",
      content: "Introduction to Web Development and Linux",
      topics: ["Web Development Basics", "Linux Commands", "HTML & CSS Fundamentals"]
    },
    {
      title: "Weeks 4-5",
      content: "Advanced HTML, CSS, and JavaScript",
      topics: ["Semantic HTML", "CSS Layout", "JavaScript Basics"]
    },
    {
      title: "Weeks 6-9",
      content: "JavaScript and Front-End Frameworks",
      topics: ["Advanced JavaScript", "React Fundamentals", "State Management"]
    },
    {
      title: "Weeks 10-12",
      content: "Node.js and Backend Development",
      topics: ["Node.js Basics", "Express.js", "MongoDB Integration"]
    }
  ];

  const faqs: FAQ[] = [
    {
      question: "How long is the program?",
     answer: "The program runs for 12 weeks, with classes held during weekends. Each session is carefully structured to ensure comprehensive learning while accommodating working professionals and students."
    },
    {
      question: "What are the prerequisites?",
      answer: "No prior programming experience is required. However, basic computer literacy and a strong desire to learn are essential."
    },
    {
      question: "What will I be able to build after the course?",
      answer: "By the end of the course, you'll be able to build full-stack web applications, including front-end interfaces, backend APIs, and database integration. You'll have practical experience with modern web technologies."
    },
    {
      question: "Is there support after graduation?",
      answer: "Yes, we provide ongoing support through our alumni network, job placement assistance, and continued access to our learning resources and community."
    },
  ];

  const AnimatedStat: React.FC<AnimatedStatProps> = ({ value, label }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      const finalValue = parseInt(value);
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
        className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
      >
        <p className="text-4xl font-bold text-green-600">
          {count}{value.includes('+') ? '+' : ''}
        </p>
        <p className="mt-2 text-sm text-gray-600">{label}</p>
      </motion.div>
    );
  };
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative bg-green-600 py-20">
        <div className="absolute inset-0">
          <div className="h-full w-full bg-gradient-to-b from-green-700 to-green-600"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Empowering Future Developers
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-green-100">
              Since our first season, IYF Academy has been committed to providing 
              comprehensive programming education through our weekend sessions.
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

     {/* Timeline Section */}
<section className="py-20 bg-gray-50">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-3xl font-bold text-center text-gray-900 mb-12"
    >
      Our Growth Journey
    </motion.h2>
    <div className="relative">
      {/* Timeline line - hidden on mobile, shown on larger screens */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-green-200"></div>
      
      <div className="space-y-8 md:space-y-12">
        {[
          {
            year: "2020",
            title: "Season 1 Launch",
            description: "Started with basic web development fundamentals"
          },
          {
            year: "2021",
            title: "Curriculum Expansion",
            description: "Introduced advanced JavaScript and React"
          },
          {
            year: "2022",
            title: "Backend Integration",
            description: "Added Node.js and database management"
          },
          {
            year: "2023",
            title: "Full Stack Development",
            description: "Complete modern web development stack"
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
              <div className={`bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                {/* Year Badge */}
                <div className="inline-block bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold mb-3">
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
              className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full border-4 border-white"
            />

            {/* Mobile Timeline Line and Dot */}
            <div className="md:hidden flex items-center justify-center w-full my-4">
              <div className="w-px h-16 bg-green-200"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Technologies You'll Master
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {techStack.map((stack, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <h3 className="text-xl font-bold text-green-600 mb-6">{stack.category}</h3>
                <div className="flex flex-wrap gap-3">
                  {stack.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      whileHover={{ scale: 1.1 }}
                      className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium cursor-pointer hover:bg-green-100"
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
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Course Outline
          </motion.h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {courseOutline.map((week, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="border rounded-lg p-6 bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-bold text-green-600 mb-2">{week.title}</h3>
                <p className="text-gray-900 font-medium mb-4">{week.content}</p>
                <ul className="space-y-2">
                  {week.topics.map((topic, topicIndex) => (
                    <motion.li 
                      key={topicIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: topicIndex * 0.1 }}
                      className="flex items-center text-gray-600"
                    >
                      <Clock className="w-4 h-4 mr-2 text-green-600" />
                      {topic}
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
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-3xl font-bold text-center text-gray-900 mb-12"
    >
      Frequently Asked Questions
    </motion.h2>
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
            className="w-full p-6 text-left bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            onClick={() => setOpenFaq(openFaq === index ? null : index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
              <motion.div
                animate={{ rotate: openFaq === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {openFaq === index ? (
                  <ChevronUp className="h-5 w-5 text-green-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-green-600" />
                )}
              </motion.div>
            </div>
            {openFaq === index && (
              <div className="mt-4 text-gray-600">
                {faq.answer}
              </div>
            )}
          </motion.button>
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
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white">Ready to Start Your Journey?</h2>
            <p className="mt-4 text-xl text-green-100">
              Join our upcoming Season 8 and transform your programming skills.
            </p>
            <div className="mt-8">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://freeacademy.iyfkenya.org/register"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-green-600 bg-white hover:bg-green-50 transition-colors"
              >
                Apply Now
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;