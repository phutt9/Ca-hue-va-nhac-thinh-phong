/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Music, ImageOff } from 'lucide-react';

interface HeritageImageProps {
  src?: string;
  alt: string;
  caption?: string;
  className?: string;
  containerClassName?: string;
  recordId?: string;
  showCaptionOverlay?: boolean;
}

export const HeritageImage: React.FC<HeritageImageProps> = ({
  src,
  alt,
  caption,
  className = "w-full h-full object-cover",
  containerClassName = "relative w-full h-full overflow-hidden bg-stone-900",
  recordId,
  showCaptionOverlay = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!src || hasError) {
    return (
      <div className={`${containerClassName} flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#2F0D30] via-[#240B25] to-[#1A071B] text-[#FAF8F5]`}>
        <div className="w-10 h-10 rounded-full bg-[#FAF8F5]/10 flex items-center justify-center mb-2 border border-[#C59B27]/40 shadow-inner">
          <Music className="w-5 h-5 text-[#D4AF37]" />
        </div>
        <p className="text-xs font-serif font-semibold text-[#F9F1DC] text-center line-clamp-1">
          {alt}
        </p>
        <span className="text-[10px] text-stone-300 font-mono mt-1 px-2 py-0.5 rounded bg-black/40 border border-white/10">
          {recordId ? `[${recordId}] ` : ''}Tư liệu Di sản Ca Huế
        </span>
      </div>
    );
  }

  return (
    <div className={containerClassName}>
      {isLoading && (
        <div className="absolute inset-0 bg-stone-200 animate-pulse flex items-center justify-center z-1">
          <Music className="w-6 h-6 text-stone-400/50" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={`${className} transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      />
      {recordId && (
        <div className="absolute top-2.5 left-2.5 z-10 bg-[#2F0D30]/85 backdrop-blur-xs text-[#FAF8F5] text-[10px] font-mono px-2 py-0.5 rounded shadow-sm border border-[#C59B27]/30">
          {recordId}
        </div>
      )}
      {showCaptionOverlay && caption && !hasError && (
        <div className="absolute bottom-2 left-2 right-2 z-10 bg-[#2F0D30]/85 backdrop-blur-xs text-[#FAF8F5] text-[10px] px-2.5 py-1 rounded shadow-sm truncate border border-white/10">
          {caption}
        </div>
      )}
    </div>
  );
};

export default HeritageImage;
