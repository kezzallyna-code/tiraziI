import React from 'react';

export default function Logo({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <svg 
      className={className}
      viewBox="0 0 300 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Woven Mark */}
      <g transform="translate(10, 10) scale(0.7)">
        <g transform="rotate(45 60 60)">
          {/* Vertical (Red) */}
          <rect x="36" y="20" width="20" height="80" rx="10" fill="#bc3c35" />
          <rect x="64" y="20" width="20" height="80" rx="10" fill="#bc3c35" />
          {/* Horizontal (Teal & Yellow) */}
          <rect x="20" y="36" width="80" height="20" rx="10" fill="#369994" />
          <rect x="20" y="64" width="80" height="20" rx="10" fill="#d8912e" />
          {/* Weave Intersections (Red goes over) */}
          <rect x="36" y="36" width="20" height="20" fill="#bc3c35" />
          <rect x="64" y="64" width="20" height="20" fill="#bc3c35" />
        </g>
      </g>

      {/* Main Arabic Text */}
      <text 
        x="105" 
        y="65" 
        fontFamily="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" 
        fontSize="54" 
        fontWeight="900" 
        fill="#d8912e"
        style={{ letterSpacing: '-2px' }}
      >
        طرازي
      </text>

      {/* Top Swoosh & Dot */}
      <path 
        d="M 130 35 Q 180 15 240 25" 
        stroke="#d8912e" 
        strokeWidth="2" 
        fill="transparent" 
      />
      <circle cx="240" cy="25" r="5" fill="#369994" />

      {/* Bottom Color Bars */}
      <rect x="115" y="75" width="20" height="6" fill="#369994" rx="2" />
      <rect x="115" y="85" width="20" height="6" fill="#bc3c35" rx="2" />

      {/* Subtext */}
      <text 
        x="170" 
        y="88" 
        fontFamily="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" 
        fontSize="14" 
        fontWeight="bold" 
        fill="#bc3c35"
      >
        مُصَمَّم... وَأَكْثَر
      </text>
    </svg>
  );
}
