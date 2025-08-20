import React from 'react';
import Link from '@docusaurus/Link';

interface ClientCardProps {
  name: string;
  description: string;
  logo?: string;
  logoAlt?: string;
  link?: string;
  videoLink?: string;
  tags?: string[];
  revenue?: string;
  compact?: boolean;
}

export const ClientCard: React.FC<ClientCardProps> = ({
  name,
  description,
  logo,
  logoAlt,
  link,
  videoLink,
  tags,
  revenue,
  compact = true
}) => {
  const cardContent = (
    <div 
      className={`
        bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 
        hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md 
        transition-all duration-200 hover:-translate-y-0.5
        ${compact ? 'p-4' : 'p-6'}
      `}
    >
      {/* Header with logo and title */}
      <div className="flex items-start gap-3 mb-3">
        {logo && (
          <div className="flex-shrink-0">
            <img
              src={logo}
              alt={logoAlt || `${name} logo`}
              className={`object-contain ${compact ? 'w-8 h-8' : 'w-10 h-10'} rounded`}
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className={`font-bold text-gray-900 dark:text-white leading-tight ${compact ? 'text-lg' : 'text-xl'}`}>
            {name}
          </h3>
          {revenue && (
            <div className={`text-green-600 dark:text-green-400 font-semibold ${compact ? 'text-xs' : 'text-sm'} mt-1`}>
              {revenue}
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <p className={`text-gray-700 dark:text-gray-300 leading-relaxed mb-3 ${compact ? 'text-sm' : 'text-base'}`}>
        {description}
      </p>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 
                         font-medium rounded-md border border-blue-200 dark:border-blue-700
                         ${compact ? 'text-xs' : 'text-sm'}`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Action Links */}
      {(link || videoLink) && (
        <div className="flex gap-2 pt-2">
          {link && (
            <Link
              to={link}
              className={`inline-flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 
                         dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 
                         font-medium rounded border border-gray-300 dark:border-gray-600 
                         hover:border-gray-400 dark:hover:border-gray-500 transition-colors 
                         no-underline hover:no-underline ${compact ? 'text-xs' : 'text-sm'}`}
            >
              View
            </Link>
          )}
          {videoLink && (
            <Link
              to={videoLink}
              className={`inline-flex items-center px-3 py-1.5 bg-red-50 hover:bg-red-100 
                         dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-700 dark:text-red-400 
                         font-medium rounded border border-red-200 dark:border-red-700 
                         hover:border-red-300 dark:hover:border-red-600 transition-colors 
                         no-underline hover:no-underline ${compact ? 'text-xs' : 'text-sm'}`}
            >
              📹 Demo
            </Link>
          )}
        </div>
      )}
    </div>
  );

  return link ? (
    <Link to={link} className="block no-underline hover:no-underline">
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
};