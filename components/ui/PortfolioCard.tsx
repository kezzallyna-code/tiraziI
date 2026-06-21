import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PortfolioCardProps {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  category?: string;
}

export function PortfolioCard({ id, title, author, imageUrl, category }: PortfolioCardProps) {
  return (
    <Link href={`/showcase/${id}`} className="group block">
      <div className="bg-surface rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(75,153,145,0.08)] transition-transform duration-300 group-hover:-translate-y-1">
        {/* Fixed 4:5 Aspect Ratio Container */}
        <div className="relative w-full aspect-[4/5] bg-surface-dim overflow-hidden">
          <Image 
            src={imageUrl} 
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {category && (
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-primary">
              {category}
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-5">
          <h3 className="text-title-lg text-text-primary mb-1 truncate">{title}</h3>
          <p className="text-body-md text-text-secondary truncate">{author}</p>
        </div>
      </div>
    </Link>
  );
}
