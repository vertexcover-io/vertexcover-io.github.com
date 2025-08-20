import React from 'react';
import Link from '@docusaurus/Link';

interface ProjectData {
  name: string;
  description: string;
  category: string;
  downloads?: string;
  link: string;
  stars?: number;
  language?: string;
  highlights?: string[];
}

interface ProjectTableProps {
  projects: ProjectData[];
}

const categoryColors = {
  'UI Automation': { dot: 'bg-purple-500', text: 'text-purple-600 dark:text-purple-400' },
  'API Tools': { dot: 'bg-green-500', text: 'text-green-600 dark:text-green-400' },
  'Productivity': { dot: 'bg-blue-500', text: 'text-blue-600 dark:text-blue-400' },
  'Library': { dot: 'bg-orange-500', text: 'text-orange-600 dark:text-orange-400' },
  'Systems': { dot: 'bg-gray-500', text: 'text-gray-600 dark:text-gray-400' }
};

export const ProjectTable: React.FC<ProjectTableProps> = ({ projects }) => {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3 bg-gray-50 dark:bg-gray-800">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Open Source Projects</h3>
      </div>

      {/* Compact Cards */}
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {projects.map((project, index) => {
          const colors = categoryColors[project.category] || categoryColors['Systems'];
          
          return (
            <div 
              key={index}
              className="group px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
            >
              {/* Main Row - Gmail-style compact */}
              <div className="flex items-center gap-3 text-sm">
                {/* Project Name */}
                <div className="min-w-0 w-28 truncate">
                  {project.link ? (
                    <Link
                      href={project.link}
                      className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 no-underline hover:no-underline transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.name}
                    </Link>
                  ) : (
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {project.name}
                    </div>
                  )}
                </div>
                
                {/* Description - takes remaining space */}
                <div className="text-gray-600 dark:text-gray-400 flex-1 min-w-0 truncate">
                  {project.description}
                </div>
                
                {/* Right Side Info */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  {/* Category Badge */}
                  <span className={`text-xs px-2 py-1 rounded ${colors.text} bg-gray-50 dark:bg-gray-800 border border-current/20`}>
                    {project.category}
                  </span>
                  
                  {/* Stars or Downloads */}
                  {project.stars ? (
                    <div className="flex items-center gap-1 text-xs text-gray-500 px-2 py-1 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>{project.stars}</span>
                    </div>
                  ) : project.downloads ? (
                    <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 px-2 py-1 bg-green-50 dark:bg-green-900/20 rounded">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span>{project.downloads}</span>
                    </div>
                  ) : null}
                  
                  {/* View Link with Eye Icon */}
                  <Link
                    href={project.link}
                    className="flex items-center gap-1.5 text-xs px-2 py-1 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded border border-blue-200 dark:border-blue-700 hover:border-blue-300 transition-colors no-underline hover:no-underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    View
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};