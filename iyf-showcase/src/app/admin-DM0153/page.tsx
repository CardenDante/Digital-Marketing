
'use client';

import React, { useState, useEffect } from 'react';
import { Upload, Calendar, Clock, CheckCircle, XCircle, Trash, Edit, Save, Plus } from 'lucide-react';
import { useSeasons } from '@/lib/contexts/SeasonContext';

interface Season {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  description: string;
}

interface ImportResult {
  success: boolean;
  message: string;
  count: number;
}

const AdminPage = () => {
  const { seasons, currentSeason, setCurrentSeason } = useSeasons();
  
  // Import states
  const [selectedSeasonId, setSelectedSeasonId] = useState<number | ''>('');
  const [studentsFile, setStudentsFile] = useState<File | null>(null);
  const [projectsFile, setProjectsFile] = useState<File | null>(null);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  
  // Season management states
  const [newSeason, setNewSeason] = useState({
    name: '',
    startDate: '',
    endDate: '',
    isActive: false,
    description: ''
  });
  const [editingSeasonId, setEditingSeasonId] = useState<number | null>(null);
  const [editSeason, setEditSeason] = useState<Partial<Season>>({});
  const [isAddingNewSeason, setIsAddingNewSeason] = useState(false);
  const [isSavingSeason, setIsSavingSeason] = useState(false);
  const [seasonError, setSeasonError] = useState<string | null>(null);
  
  // Update selected season when currentSeason changes
  useEffect(() => {
    if (currentSeason) {
      setSelectedSeasonId(currentSeason.id);
    }
  }, [currentSeason]);
  
  // Handle students file change
  const handleStudentsFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setStudentsFile(e.target.files[0]);
    }
  };
  
  // Handle projects file change
  const handleProjectsFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProjectsFile(e.target.files[0]);
    }
  };
  
  // Import students CSV
  const importStudents = async () => {
    if (!studentsFile || !selectedSeasonId) return;
    
    setIsImporting(true);
    setImportResult(null);
    
    try {
      const formData = new FormData();
      formData.append('file', studentsFile);
      formData.append('seasonId', selectedSeasonId.toString());
      
      const response = await fetch('/api/import/students', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to import students');
      }
      
      setImportResult(result);
      // Clear file input
      setStudentsFile(null);
    } catch (error) {
      setImportResult({
        success: false,
        message: (error as Error).message,
        count: 0
      });
    } finally {
      setIsImporting(false);
    }
  };
  
  // Import projects CSV
  const importProjects = async () => {
    if (!projectsFile || !selectedSeasonId) return;
    
    setIsImporting(true);
    setImportResult(null);
    
    try {
      const formData = new FormData();
      formData.append('file', projectsFile);
      formData.append('seasonId', selectedSeasonId.toString());
      
      const response = await fetch('/api/import/projects', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to import projects');
      }
      
      setImportResult(result);
      // Clear file input
      setProjectsFile(null);
    } catch (error) {
      setImportResult({
        success: false,
        message: (error as Error).message,
        count: 0
      });
    } finally {
      setIsImporting(false);
    }
  };
  
  // Handle season selection change
  const handleSeasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedSeasonId(value === '' ? '' : parseInt(value));
  };
  
  // Add new season
  const addNewSeason = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newSeason.name || !newSeason.startDate || !newSeason.endDate) {
      setSeasonError('Name, start date, and end date are required');
      return;
    }
    
    try {
      setIsSavingSeason(true);
      setSeasonError(null);
      
      const response = await fetch('/api/seasons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSeason)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create season');
      }
      
      // Reset form
      setNewSeason({
        name: '',
        startDate: '',
        endDate: '',
        isActive: false,
        description: ''
      });
      
      setIsAddingNewSeason(false);
      
      // Reload page to update seasons
      window.location.reload();
    } catch (error) {
      setSeasonError((error as Error).message);
    } finally {
      setIsSavingSeason(false);
    }
  };
  
  // Start editing a season
  const startEditSeason = (season: Season) => {
    setEditingSeasonId(season.id);
    setEditSeason({
      name: season.name,
      startDate: season.startDate,
      endDate: season.endDate,
      isActive: season.isActive,
      description: season.description
    });
  };
  
  // Cancel editing a season
  const cancelEditSeason = () => {
    setEditingSeasonId(null);
    setEditSeason({});
    setSeasonError(null);
  };
  
  // Save edited season
  const saveEditSeason = async (seasonId: number) => {
    if (editSeason.name === '' || editSeason.startDate === '' || editSeason.endDate === '') {
      setSeasonError('Name, start date, and end date are required');
      return;
    }
    
    try {
      setIsSavingSeason(true);
      setSeasonError(null);
      
      const response = await fetch(`/api/seasons/${seasonId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editSeason)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update season');
      }
      
      setEditingSeasonId(null);
      setEditSeason({});
      
      // Reload page to update seasons
      window.location.reload();
    } catch (error) {
      setSeasonError((error as Error).message);
    } finally {
      setIsSavingSeason(false);
    }
  };
  
  // Delete a season
  const deleteSeason = async (seasonId: number) => {
    if (!window.confirm('Are you sure you want to delete this season? This action cannot be undone.')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/seasons/${seasonId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete season');
      }
      
      // Reload page to update seasons
      window.location.reload();
    } catch (error) {
      setSeasonError((error as Error).message);
    }
  };
  
  // Set a season as active
  const setSeasonActive = async (seasonId: number) => {
    try {
      const response = await fetch(`/api/seasons/${seasonId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive: true })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to set season as active');
      }
      
      // Reload page to update seasons
      window.location.reload();
    } catch (error) {
      setSeasonError((error as Error).message);
    }
  };
  
  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="relative bg-green-600 py-12">
        <div className="absolute inset-0">
          <div className="h-full w-full bg-gradient-to-b from-green-700 to-green-600"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Admin Dashboard
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-green-100">
              Import data and manage seasons for the IYF Academy showcase
            </p>
          </div>
        </div>
      </section>
      
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-2">
        {/* Import Data Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Import Data</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Season
            </label>
            <select 
              value={selectedSeasonId} 
              onChange={handleSeasonChange}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            >
              <option value="">Select a season</option>
              {seasons.map((season) => (
                <option key={season.id} value={season.id}>
                  {season.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Students Import */}
          <div className="p-4 rounded-lg border border-gray-200 mb-4">
            <h3 className="text-lg font-semibold mb-2">Import Students CSV</h3>
            <p className="text-sm text-gray-600 mb-4">
              CSV should have columns: <code>name</code>, <code>profileUrl</code> (optional)
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Students CSV File
              </label>
              <div className="flex items-center">
                <label className="flex-1">
                  <div className="relative flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <div className="text-sm text-center">
                      <span className="font-medium text-green-600">
                        {studentsFile ? studentsFile.name : 'Click to upload students CSV'}
                      </span>
                    </div>
                    <input
                      type="file"
                      accept=".csv"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleStudentsFileChange}
                    />
                  </div>
                </label>
                <button
                  onClick={importStudents}
                  disabled={!studentsFile || !selectedSeasonId || isImporting}
                  className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Import
                </button>
              </div>
            </div>
          </div>
          
          {/* Projects Import */}
          <div className="p-4 rounded-lg border border-gray-200 mb-4">
            <h3 className="text-lg font-semibold mb-2">Import Projects CSV</h3>
            <p className="text-sm text-gray-600 mb-4">
              CSV should have columns: <code>student</code>, <code>url</code>, <code>title</code> (optional), 
              <code>description</code> (optional), <code>githubUrl</code> (optional), 
              <code>category</code> (optional), <code>grade</code> (optional), <code>isFeatured</code> (optional, "true" or "false")
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Projects CSV File
              </label>
              <div className="flex items-center">
                <label className="flex-1">
                  <div className="relative flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <div className="text-sm text-center">
                      <span className="font-medium text-green-600">
                        {projectsFile ? projectsFile.name : 'Click to upload projects CSV'}
                      </span>
                    </div>
                    <input
                      type="file"
                      accept=".csv"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleProjectsFileChange}
                    />
                  </div>
                </label>
                <button
                  onClick={importProjects}
                  disabled={!projectsFile || !selectedSeasonId || isImporting}
                  className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Import
                </button>
              </div>
            </div>
          </div>
          
          {/* Import Result */}
          {importResult && (
            <div className={`p-4 rounded-lg mb-4 ${importResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-start">
                {importResult.success ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
                )}
                <div>
                  <h4 className={`text-md font-semibold ${importResult.success ? 'text-green-800' : 'text-red-800'}`}>
                    {importResult.success ? 'Import Successful' : 'Import Failed'}
                  </h4>
                  <p className="text-sm mt-1">
                    {importResult.message}
                  </p>
                  {importResult.success && (
                    <p className="text-sm font-medium mt-2">
                      {importResult.count} items imported
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Season Management Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Manage Seasons</h2>
            <button
              onClick={() => setIsAddingNewSeason(true)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Season
            </button>
          </div>
          
          {/* Add/Edit Season Form */}
          {isAddingNewSeason && (
            <div className="mb-6 p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Add New Season</h3>
              <form onSubmit={addNewSeason}>
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Season Name
                    </label>
                    <input
                      type="text"
                      value={newSeason.name}
                      onChange={(e) => setNewSeason({...newSeason, name: e.target.value})}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="e.g., Season 8"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={newSeason.startDate}
                        onChange={(e) => setNewSeason({...newSeason, startDate: e.target.value})}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={newSeason.endDate}
                        onChange={(e) => setNewSeason({...newSeason, endDate: e.target.value})}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newSeason.description}
                      onChange={(e) => setNewSeason({...newSeason, description: e.target.value})}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      rows={3}
                      placeholder="Brief description of this season"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={newSeason.isActive}
                      onChange={(e) => setNewSeason({...newSeason, isActive: e.target.checked})}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                      Set as active season
                    </label>
                  </div>
                  
                  {seasonError && (
                    <div className="text-sm text-red-600">
                      {seasonError}
                    </div>
                  )}
                  
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingNewSeason(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSavingSeason}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      {isSavingSeason ? 'Saving...' : 'Save Season'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
          
          {/* Seasons List */}
          <div className="space-y-4">
            {seasons.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No seasons found. Add your first season to get started.</p>
            ) : (
              seasons.map((season) => (
                <div key={season.id} className="border rounded-lg overflow-hidden">
                  {editingSeasonId === season.id ? (
                    // Edit mode
                    <div className="p-4">
                      <div className="grid gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Season Name
                          </label>
                          <input
                            type="text"
                            value={editSeason.name ?? ''}
                            onChange={(e) => setEditSeason({...editSeason, name: e.target.value})}
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            placeholder="e.g., Season 8"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Start Date
                            </label>
                            <input
                              type="date"
                              value={editSeason.startDate ?? ''}
                              onChange={(e) => setEditSeason({...editSeason, startDate: e.target.value})}
                              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              End Date
                            </label>
                            <input
                              type="date"
                              value={editSeason.endDate ?? ''}
                              onChange={(e) => setEditSeason({...editSeason, endDate: e.target.value})}
                              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                          </label>
                          <textarea
                            value={editSeason.description ?? ''}
                            onChange={(e) => setEditSeason({...editSeason, description: e.target.value})}
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            rows={3}
                          />
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={`isActive-${season.id}`}
                            checked={editSeason.isActive ?? false}
                            onChange={(e) => setEditSeason({...editSeason, isActive: e.target.checked})}
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <label htmlFor={`isActive-${season.id}`} className="ml-2 text-sm text-gray-700">
                            Set as active season
                          </label>
                        </div>
                        
                        {seasonError && (
                          <div className="text-sm text-red-600">
                            {seasonError}
                          </div>
                        )}
                        
                        <div className="flex justify-end space-x-2">
                          <button
                            type="button"
                            onClick={cancelEditSeason}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => saveEditSeason(season.id)}
                            disabled={isSavingSeason}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                          >
                            {isSavingSeason ? 'Saving...' : 'Save Changes'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // View mode
                    <>
                      <div className="bg-gray-50 px-4 py-2 flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="font-medium">{season.name}</span>
                          {season.isActive && (
                            <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Active
                            </span>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => startEditSeason(season)}
                            className="p-1 text-gray-500 hover:text-gray-700"
                            title="Edit Season"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteSeason(season.id)}
                            className="p-1 text-gray-500 hover:text-red-600"
                            title="Delete Season"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-2 gap-4 mb-2">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600">
                              {new Date(season.startDate).toLocaleDateString()} - {new Date(season.endDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600">
                              {new Date(season.startDate) > new Date() 
                                ? 'Upcoming' 
                                : new Date(season.endDate) < new Date() 
                                  ? 'Completed' 
                                  : 'In Progress'}
                            </span>
                          </div>
                        </div>
                        {season.description && (
                          <p className="text-sm text-gray-600 mt-2">{season.description}</p>
                        )}
                        
                        {!season.isActive && (
                          <button
                            onClick={() => setSeasonActive(season.id)}
                            className="mt-3 inline-flex items-center text-sm font-medium text-green-600 hover:text-green-800"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Set as Active
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;