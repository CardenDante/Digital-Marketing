// src/lib/data.ts

export interface Project {
    id: number;
    title: string;
    student: string;
    category: string;
    description: string;
    image: string;
    liveUrl: string;
    githubUrl: string;
    grade: string;
    technologies: string[];
  }
  
  export const projects: Project[] = [
    {
      id: 1,
      title: "SkillBoost - Learn Enterprise",
      student: "Evans Odhiambo",
      category: "education",
      description: "A comprehensive learning management platform for enterprise training and development",
      image: "/api/placeholder/400/300",
      liveUrl: "https://example.com/skillboost",
      githubUrl: "https://github.com/example/skillboost",
      grade: "A",
      technologies: ["React", "Node.js", "MongoDB"]
    },
    {
      id: 2,
      title: "Doctor Finder",
      student: "Gabriel Esma",
      category: "healthcare",
      description: "An online platform to find and book appointments with healthcare professionals",
      image: "/api/placeholder/400/300",
      liveUrl: "https://example.com/doctor-finder",
      githubUrl: "https://github.com/example/doctor-finder",
      grade: "A",
      technologies: ["Next.js", "Tailwind CSS", "PostgreSQL"]
    },
    // Add more projects following the same structure
  ];