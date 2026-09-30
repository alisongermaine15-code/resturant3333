import React, { useState } from 'react';
import { Utensils } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  className?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError || !src) {
    return (
      <div
        className={`bg-gradient-to-br from-[#EFEAE1] via-[#E4DDD0] to-[#D5CABC] flex flex-col items-center justify-center p-4 text-center ${className}`}
        role="img"
        aria-label={alt || 'Food image'}
      >
        <div className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center mb-2 shadow-xs text-[#8B5A2B]">
          <Utensils className="w-5 h-5" />
        </div>
        <span className="text-xs font-medium text-[#453327] max-w-[150px] truncate">
          {alt || 'Taste Haven Dish'}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-[#EFEAE1] animate-pulse" />
      )}
      <img
        src={src}
        alt={alt || 'Food item'}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        {...props}
      />
    </div>
  );
};
