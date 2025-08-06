import React from 'react';
import Link from '@docusaurus/Link';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  demoLink?: string;
  githubLink?: string;
  preview?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tags,
  demoLink,
  githubLink,
  preview
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 p-8 hover:-translate-y-1">
      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-base">
        {description}
      </p>
      
      {/* Preview Text */}
      {preview && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 italic bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border-l-4 border-blue-400 dark:border-blue-500">
          {preview}
        </p>
      )}
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full border border-blue-200 dark:border-blue-700"
          >
            {tag}
          </span>
        ))}
      </div>
      
      {/* Action Links */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        {demoLink && (
          <Link
            to={demoLink}
            className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white! font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 no-underline hover:no-underline hover:text-white!"
          >
            Read More
          </Link>
        )}
        {githubLink && (
          <Link
            href={githubLink}
            className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-green-600 dark:text-green-400 font-medium rounded-lg border-2 border-green-600 dark:border-green-400 hover:border-green-700 dark:hover:border-green-300 shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 no-underline hover:no-underline"
          >
            View Code
          </Link>
        )}
      </div>
    </div>
  );
};