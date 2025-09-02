import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

interface Image {
  src: string;
  caption?: string;
}

interface ImageSliderProps {
  images: Image[];
  className?: string;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  className = ""
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean[]>([]);

  useEffect(() => {
    setIsLoading(new Array(images.length).fill(true));
  }, [images]);

  const handleImageLoad = (index: number) => {
    setIsLoading(prev => {
      const newLoading = [...prev];
      newLoading[index] = false;
      return newLoading;
    });
  };

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const expandImage = (index: number) => {
    setCurrentIndex(index);
    setIsExpanded(true);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isExpanded) {
        if (e.key === 'Escape') setIsExpanded(false);
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isExpanded, currentIndex]);

  if (!images || images.length === 0) {
    return null;
  }

  const currentImage = images[currentIndex];

  return (
    <>
      {/* Main Gallery Display */}
      <div className={`w-full ${className}`}>
        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl overflow-hidden shadow-xl border border-gray-200/50 dark:border-gray-700/50">
          {/* Loading skeleton */}
          {isLoading[currentIndex] && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse" />
          )}
          
          <div className="aspect-video relative overflow-hidden group">
            <img 
              src={currentImage.src} 
              alt={currentImage.caption}
              className="w-full h-full object-contain bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
              loading="lazy"
              onLoad={() => handleImageLoad(currentIndex)}
              onError={(e) => {
                console.error('Image failed to load:', currentImage.src);
                handleImageLoad(currentIndex);
              }}
            />
            
            {/* Navigation Controls - Glass morphism style */}
            <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 md:opacity-100 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              {/* Left Arrow */}
              {images.length > 1 && (
                <button
                  className="backdrop-blur-md bg-white/20 dark:bg-gray-800/30 border border-white/30 dark:border-gray-600/30 text-gray-700 dark:text-gray-200 hover:bg-white/30 dark:hover:bg-gray-700/40 w-12 h-12 flex items-center justify-center rounded-xl shadow-lg transition-all duration-200 pointer-events-auto transform hover:scale-105"
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
              )}
              
              <div className="flex-1" /> {/* Spacer */}
              
              {/* Right Arrow */}
              {images.length > 1 && (
                <button
                  className="backdrop-blur-md bg-white/20 dark:bg-gray-800/30 border border-white/30 dark:border-gray-600/30 text-gray-700 dark:text-gray-200 hover:bg-white/30 dark:hover:bg-gray-700/40 w-12 h-12 flex items-center justify-center rounded-xl shadow-lg transition-all duration-200 pointer-events-auto transform hover:scale-105"
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>
            
            {/* Expand Button - Glass morphism */}
            <button
              className="absolute top-4 right-4 backdrop-blur-md bg-white/20 dark:bg-gray-800/30 border border-white/30 dark:border-gray-600/30 text-gray-700 dark:text-gray-200 hover:bg-white/30 dark:hover:bg-gray-700/40 w-12 h-12 flex items-center justify-center rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 opacity-0 md:opacity-100 group-hover:opacity-100"
              onClick={() => expandImage(currentIndex)}
              aria-label="Expand image"
            >
              <Maximize2 size={20} />
            </button>
          </div>
          
          {/* Caption and Image Counter */}
          <div className="p-4 bg-gradient-to-r from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-800/60 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                {currentImage.caption && (
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                    {currentImage.caption}
                  </p>
                )}
              </div>
              {images.length > 1 && (
                <div className="ml-4 flex-shrink-0">
                  <span className="text-sm text-gray-600 dark:text-gray-400 bg-gradient-to-r from-white/60 to-white/40 dark:from-gray-700/60 dark:to-gray-700/40 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-200/50 dark:border-gray-600/50 shadow-sm">
                    {currentIndex + 1} of {images.length}
                  </span>
                </div>
              )}
            </div>
            
            {/* Dot indicators for multiple images */}
            {images.length > 1 && (
              <div className="flex justify-center mt-3 space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 w-8 shadow-lg'
                        : 'bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 w-2 hover:from-gray-400 hover:to-gray-500 dark:hover:from-gray-500 dark:hover:to-gray-600'
                    }`}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Modal */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsExpanded(false);
            }
          }}
        >
          <div className="relative w-full h-full max-w-7xl max-h-full flex items-center justify-center">
            {/* Expanded Image Container */}
            <div className="flex items-center justify-center max-w-full max-h-full relative">
              <img 
                src={currentImage.src}
                alt={currentImage.caption}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
              
              {/* Close button - positioned above image */}
              <button 
                className="absolute -top-16 right-0 z-10 bg-white/90 dark:bg-gray-800/90 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 w-12 h-12 flex items-center justify-center rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
                onClick={() => setIsExpanded(false)}
                aria-label="Close expanded view"
              >
                <X size={24} />
              </button>
              
              {/* Navigation arrows - positioned outside image */}
              {images.length > 1 && (
                <>
                  <button
                    className="absolute -left-20 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 w-16 h-16 flex items-center justify-center rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
                    onClick={prevImage}
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    className="absolute -right-20 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 w-16 h-16 flex items-center justify-center rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
                    onClick={nextImage}
                    aria-label="Next image"
                  >
                    <ChevronRight size={32} />
                  </button>
                </>
              )}
            </div>
            
            {/* Caption and counter - subtle overlay at bottom */}
            {(currentImage.caption || images.length > 1) && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-black/60 text-white rounded-lg px-4 py-2 text-center backdrop-blur-sm shadow-lg">
                  {currentImage.caption && (
                    <p className="text-sm leading-relaxed mb-1">
                      {currentImage.caption}
                    </p>
                  )}
                  {images.length > 1 && (
                    <div className="text-xs text-gray-300">
                      {currentIndex + 1} of {images.length}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageSlider;