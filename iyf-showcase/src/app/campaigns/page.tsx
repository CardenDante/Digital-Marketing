'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { Search, ExternalLink, MessageCircle, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import SeasonSelector from '@/components/SeasonSelector';
import { useSeasons } from '@/lib/contexts/SeasonContext';

interface Project {
  id: number;
  student: string;
  url: string;
  title?: string;
  description?: string;
  githubUrl?: string;
  category?: string;
  grade: string;
  season: string; // Add season name
  seasonId: number; // Add season ID
}

const CampaignsPage = () => {
  const { seasons, currentSeason, isLoading: isLoadingSeason } = useSeasons();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSeasonId, setSelectedSeasonId] = useState<number | null>(null);
  const projectsPerPage = 12;

  // Fetch all projects initially, but can be filtered by season
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Construct URL based on whether a season filter is applied
        const url = selectedSeasonId 
          ? `/api/projects?seasonId=${selectedSeasonId}&withStudentInfo=true`
          : `/api/projects?withStudentInfo=true`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch campaigns');
        }
        
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProjects();
  }, [selectedSeasonId]);

  // Handle season filter change
  const handleSeasonFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedSeasonId(value === '' ? null : parseInt(value));
    setCurrentPage(1); // Reset to first page when changing filter
  };

  // Filter projects based on search term
  const filteredProjects = useMemo(() => 
    projects.filter(project =>
      project.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.title && project.title.toLowerCase().includes(searchTerm.toLowerCase()))
    ),
    [searchTerm, projects]
  );

  // Paginate filtered projects
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * projectsPerPage;
    return filteredProjects.slice(startIndex, startIndex + projectsPerPage);
  }, [filteredProjects, currentPage]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Matching Purple Theme */}
      <section className="relative bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-700 min-h-[400px] flex items-center">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Digital Marketing Campaigns
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-purple-50">
            Explore our collection of innovative marketing campaigns created by talented students
          </p>
        </div>
      </section>

      {/* Search and Filter Section - Elevated Design */}
      <section className="relative -mt-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white shadow-lg p-4 border-t-4 border-purple-500">
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students or campaigns..."
                  className="w-full rounded-xl border-gray-200 pl-12 pr-4 py-3 focus:border-purple-500 focus:ring-purple-500 text-base"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page when searching
                  }}
                />
              </div>
              
              {/* Season Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={selectedSeasonId || ''}
                  onChange={handleSeasonFilterChange}
                  className="flex-1 rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                >
                  <option value="">All Seasons</option>
                  {seasons.map((season) => (
                    <option key={season.id} value={season.id}>
                      {season.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid - Enhanced Layout */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            // Loading state
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, index) => (
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
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Error loading campaigns
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
          ) : paginatedProjects.length > 0 ? (
            <>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedProjects.map((project) => (
                  <div
                    key={project.id}
                    className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    {/* Campaign Preview with Desktop View */}
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
                      <div className="flex items-center justify-between mb-1">
                        <h2 className="text-lg font-semibold text-gray-900">
                          {project.student}
                        </h2>
                      </div>
                      {/* Season Badge */}
                      <div className="flex items-center mb-2">
                        <span className="inline-flex items-center rounded-full bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple-700">
                          {project.season}
                        </span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700">
                          {project.grade}
                        </span>
                      </div>
                      {project.title && (
                        <h3 className="text-md font-medium text-gray-700 mb-2">
                          {project.title}
                        </h3>
                      )}
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MessageCircle className="h-4 w-4" />
                        <span>{project.category || 'Campaign'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-center items-center mt-8 space-x-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-700" />
                </button>
                <span className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-full bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-gray-700" />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No campaigns found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search terms to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CampaignsPage;