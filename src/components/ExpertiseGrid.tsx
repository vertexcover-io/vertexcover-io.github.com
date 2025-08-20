import React from 'react';

interface ExpertiseArea {
  title: string;
  description: string;
  icon: string;
  color: {
    bg: string;
    border: string;
    text: string;
    icon: string;
  };
}

interface ExpertiseGridProps {
  areas: ExpertiseArea[];
}

export const ExpertiseGrid: React.FC<ExpertiseGridProps> = ({ areas }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
      {areas.map((area, index) => (
        <div
          key={index}
          className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${area.color.bg} ${area.color.border}`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="currentColor">
              <circle cx="20" cy="20" r="2" />
              <circle cx="80" cy="20" r="2" />
              <circle cx="20" cy="80" r="2" />
              <circle cx="80" cy="80" r="2" />
              <circle cx="50" cy="50" r="1" />
            </svg>
          </div>

          <div className="relative p-6">
            {/* Icon and Title */}
            <div className="flex items-start gap-4 mb-4">
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${area.color.icon} shadow-sm`}>
                {area.icon}
              </div>
              <div className="flex-1">
                <h3 className={`text-xl font-bold ${area.color.text} mb-2 group-hover:text-opacity-90 transition-colors`}>
                  {area.title}
                </h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
              {area.description}
            </p>

            {/* Hover Effect Arrow */}
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};