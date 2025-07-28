import React from "react";

interface Link {
  url: string;
  title: string;
  description?: string;
}

interface ScriptAttributionProps {
  title?: string;
  description?: string;
  attribution?: string;
  links?: Link[];
  warning?: string;
}

const ScriptAttribution: React.FC<ScriptAttributionProps> = ({ 
  title = "Script Information", 
  description,
  attribution, 
  links = [],
  warning
}) => {
  return (
    <div className="relative bg-blue-50/30 dark:bg-blue-950/10 rounded-xl p-6 my-8 border-2 border-blue-200 dark:border-blue-800">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
          <svg 
            className="w-5 h-5 text-blue-600 dark:text-blue-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 m-0">
            {title}
          </h3>
        </div>
      </div>
      
      {/* Content */}
      <div className="space-y-4">
        {description && (
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {description}
          </p>
        )}

        {attribution && (
          <div className="bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <svg 
                className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
                  clipRule="evenodd" 
                />
              </svg>
              <div>
                <p className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-1">
                  Attribution Notice
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  {attribution}
                </p>
              </div>
            </div>
          </div>
        )}

        {links.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Related Links
            </h4>
            <div className="space-y-2">
              {links.map((link, index) => (
                <div key={index} className="border-l-4 border-blue-300 dark:border-blue-700 pl-4">
                  <a 
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium transition-colors"
                  >
                    {link.title}
                  </a>
                  {link.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {link.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {warning && (
          <div className="bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <svg 
                className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
                  clipRule="evenodd" 
                />
              </svg>
              <div>
                <p className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">
                  Warning
                </p>
                <p className="text-sm text-red-700 dark:text-red-300">
                  {warning}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScriptAttribution;