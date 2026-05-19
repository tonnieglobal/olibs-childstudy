import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

export function Logo({ className = "", size = "md", showText = true }: LogoProps) {
  const sizes = {
    sm: { h: 32, w: 32, font: "text-lg" },
    md: { h: 48, w: 48, font: "text-2xl" },
    lg: { h: 64, w: 64, font: "text-4xl" },
    xl: { h: 120, w: 120, font: "text-6xl" },
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="relative group">
        <svg
          width={currentSize.w}
          height={currentSize.h}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main "O" Circle */}
          <circle cx="50" cy="55" r="32" stroke="#9333ea" strokeWidth="18" />
          <circle cx="50" cy="55" r="4" fill="#9333ea" />
          
          {/* Graduation Cap perched on O */}
          <g transform="translate(10, 2) scale(0.8)">
            <path
              d="M50 10L90 30L50 50L10 30L50 10Z"
              fill="#1e1b4b"
            />
            <path
              d="M25 35V50C25 50 35 55 50 55C65 55 75 50 75 50V35"
              fill="#1e1b4b"
            />
            <path
              d="M10 30L10 50"
              stroke="#1e1b4b"
              strokeWidth="2"
            />
          </g>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
           <div className="flex items-baseline">
              <span className={`font-black tracking-tighter ${currentSize.font} text-[#9333ea]`}>
                libs
              </span>
              <div className="ml-0.5 mb-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#ef4444">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
           </div>
           <div className="flex items-center gap-1 -mt-1">
              <span className={`font-black tracking-tight ${size === 'sm' ? 'text-[10px]' : 'text-[13px]'} text-[#4c1d95]`}>
                ChildStudy
              </span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#f59e0b">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
           </div>
        </div>
      )}
    </div>
  );
}
