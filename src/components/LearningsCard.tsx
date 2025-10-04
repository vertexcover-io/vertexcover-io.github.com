import React from 'react';
import Link from '@docusaurus/Link';

interface LearningsCardProps {
  title: string;
  date: string;
  type: 'daily' | 'weekly';
  tags?: string[];
  excerpt?: string;
  link?: string;
}

export const LearningsCard: React.FC<LearningsCardProps> = ({
  title,
  date,
  type,
  tags,
  excerpt,
  link
}) => {
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const typeColors = {
    daily: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      text: 'text-blue-700 dark:text-blue-300',
      border: 'border-blue-200 dark:border-blue-700'
    },
    weekly: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      text: 'text-purple-700 dark:text-purple-300',
      border: 'border-purple-200 dark:border-purple-700'
    }
  };

  const typeStyle = typeColors[type];

  const cardContent = (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700
                 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md
                 transition-all duration-200 hover:-translate-y-0.5 p-5"
    >
      {/* Header with type badge and date */}
      <div className="flex items-center justify-between mb-3">
        <span
          className={`px-2.5 py-1 ${typeStyle.bg} ${typeStyle.text} ${typeStyle.border}
                     text-xs font-semibold rounded-md border uppercase tracking-wide`}
        >
          {type}
        </span>
        <time className="text-sm text-gray-500 dark:text-gray-400">
          {formatDate(date)}
        </time>
      </div>

      {/* Title */}
      <h3 className="font-bold text-xl text-gray-900 dark:text-white leading-tight mb-2">
        {title}
      </h3>

      {/* Excerpt */}
      {excerpt && (
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
          {excerpt}
        </p>
      )}

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300
                       text-xs font-medium rounded border border-gray-300 dark:border-gray-600"
            >
              #{tag}
            </span>
          ))}
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
