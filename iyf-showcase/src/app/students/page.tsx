'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Filter, Award } from 'lucide-react';
import { useSeasons } from '@/lib/contexts/SeasonContext';

interface Student {
  id: number;
  name: string;
  seasonId: number;
  season: string; // Add season name
  profileUrl?: string;
}

const StudentsPage = () => {
  const { seasons, isLoading: isLoadingSeason } = useSeasons();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSeasonId, setSelectedSeasonId] = useState<number | null>(null);
  const studentsPerPage = 10;

  // Fetch all students initially, but can be filtered by season
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Construct URL based on whether a season filter is applied
        const url = selectedSeasonId 
          ? `/api/students?seasonId=${selectedSeasonId}&withSeasonInfo=true`
          : `/api/students?withSeasonInfo=true`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        
        const data = await response.json();
        setStudents(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStudents();
  }, [selectedSeasonId]);

  // Handle season filter change
  const handleSeasonFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedSeasonId(value === '' ? null : parseInt(value));
    setCurrentPage(1); // Reset to first page when changing filter
  };

  // Filter students based on search term
  const filteredStudents = useMemo(() => 
    students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [searchTerm, students]
  );

  // Paginate filtered students
  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * studentsPerPage;
    return filteredStudents.slice(startIndex, startIndex + studentsPerPage);
  }, [filteredStudents, currentPage]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('');
  };

  // Get background color for initials based on student id
  const getInitialBgColor = (id: number) => {
    const colors = [
      'bg-purple-100 text-purple-600',
      'bg-indigo-100 text-indigo-600',
      'bg-pink-100 text-pink-600',
      'bg-blue-100 text-blue-600',
      'bg-teal-100 text-teal-600'
    ];
    return colors[id % colors.length];
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-700 py-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Our Digital Marketers
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-purple-100">
              Meet the talented individuals from all seasons of IYF Digital Marketing Academy
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="relative -mt-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white shadow-lg p-4 border-t-4 border-purple-500">
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
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

      {/* Students List */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            // Loading state
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {[...Array(5)].map((_, index) => (
                  <li key={index} className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse"></div>
                      <div className="ml-4 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : error ? (
            // Error state
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Error loading students
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
          ) : paginatedStudents.length > 0 ? (
            <>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {paginatedStudents.map((student) => (
                    <li
                      key={student.id}
                      className="relative group hover:bg-purple-50 transition-colors"
                    >
                      <div className="flex items-center px-6 py-5">
                        <div className="flex-shrink-0">
                          <div className={`h-12 w-12 rounded-full ${getInitialBgColor(student.id)} flex items-center justify-center font-medium text-lg`}>
                            {getInitials(student.name)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="text-base font-medium text-gray-900">{student.name}</p>
                          <div className="flex items-center mt-1">
                            <span className="inline-flex items-center rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-medium text-purple-700">
                              {student.season}
                            </span>
                          </div>
                        </div>
                        {student.profileUrl && (
                          <div className="ml-auto">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <a
                                href={student.profileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center rounded-full bg-purple-100 px-4 py-1.5 text-sm font-medium text-purple-700 hover:bg-purple-200 transition-colors"
                              >
                                <Award className="h-4 w-4 mr-1.5" />
                                View Portfolio
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
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
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No students found
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

export default StudentsPage;