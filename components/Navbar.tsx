"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on Escape & click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isProfileDropdownOpen) {
        setIsProfileDropdownOpen(false);
      }
    };
    
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  // Mocking professional logged-in state based on user request
  const isLoggedIn = true;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Artisans', path: '/artisans' },
    { name: 'Explore', path: '/explore' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-surface/90 dark:bg-surface-dim/90 backdrop-blur-md shadow-sm border-b border-outline-variant/20">
      <div className="flex justify-between items-center px-4 md:px-12 py-3 max-w-container-max mx-auto">
        
        <div className="flex items-center gap-4">
          <button 
            className="lg:hidden p-2 text-on-surface-variant hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="material-symbols-outlined text-[28px]">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
          <Link href="/" className="focus:outline-none focus:ring-2 focus:ring-primary rounded-lg">
            <Logo className="h-10 w-auto object-contain" />
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-8 font-label-md text-label-md">
          {navLinks.map((link) => {
            const isActive = pathname === link.path || (link.path !== '/' && pathname?.startsWith(link.path));
            return (
              <Link 
                key={link.name}
                href={link.path}
                className={`transition-colors font-bold relative py-2 focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-2 ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-inverse-primary'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-t-full"></span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link href="/login" className="font-label-md text-label-md font-bold text-on-surface-variant hover:text-primary transition-colors hidden md:block focus:outline-none focus:ring-2 focus:ring-primary rounded-lg px-3 py-2">
                Log In
              </Link>
              <Link href="/register" className="px-6 py-2 bg-primary text-on-primary font-label-md text-label-md rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                Join the Atelier
              </Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button 
                className="flex items-center gap-2 p-1 rounded-full hover:bg-surface-variant/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                aria-haspopup="true"
                aria-expanded={isProfileDropdownOpen}
                aria-label="User profile menu"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-surface-variant shadow-sm">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuANf5msGfpBwraVf80zGPy0n3JBSPQp6MJnVF9YgMG58-etwGk_a54lmk8QfX1EXbv_uilQ--5g1qGqkj96Jq1s1HxQHwrKM6G_8JXsDi61ArduC2YHPX5ze6HdbARr2B9o5apGNiSMVlfuqennc3iCRJIveZmPd62P4gyjNBOTihnjFjw_D11zWSkiNWJOe3Z6RVlGJURqPC2HDH2q0aCLd_2puyyNjN6gV3ToAS27HUt0Pgw4OeZJWV2jaKEJ_mkq1zOIZGRgRo4" 
                    alt="Lina Benyahia Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="material-symbols-outlined text-on-surface-variant text-[20px] hidden md:block">
                  expand_more
                </span>
              </button>

              {isProfileDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsProfileDropdownOpen(false)}
                    aria-hidden="true"
                  ></div>
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-surface-container-high rounded-2xl shadow-xl border border-outline-variant/20 z-50 overflow-hidden transform origin-top-right transition-all">
                    <div className="p-4 border-b border-outline-variant/20 bg-surface-container-low/50">
                      <p className="font-title-lg text-title-lg text-on-surface">Lina Benyahia</p>
                      <p className="font-label-md text-label-md text-on-surface-variant">Fashion Designer</p>
                    </div>
                    <div className="flex flex-col py-2">
                      <Link href="/profile" className="flex items-center gap-3 px-4 py-3 text-on-surface hover:bg-surface-variant/50 transition-colors focus:bg-surface-variant/50 focus:outline-none" onClick={() => setIsProfileDropdownOpen(false)}>
                        <span className="material-symbols-outlined text-[20px]">person</span>
                        <span className="font-label-md">My Profile</span>
                      </Link>
                      <Link href="/user" className="flex items-center gap-3 px-4 py-3 text-on-surface hover:bg-surface-variant/50 transition-colors focus:bg-surface-variant/50 focus:outline-none" onClick={() => setIsProfileDropdownOpen(false)}>
                        <span className="material-symbols-outlined text-[20px]">dashboard</span>
                        <span className="font-label-md">My Dashboard</span>
                      </Link>
                      <Link href="/settings" className="flex items-center gap-3 px-4 py-3 text-on-surface hover:bg-surface-variant/50 transition-colors focus:bg-surface-variant/50 focus:outline-none" onClick={() => setIsProfileDropdownOpen(false)}>
                        <span className="material-symbols-outlined text-[20px]">settings</span>
                        <span className="font-label-md">Settings</span>
                      </Link>
                      <Link href="/messages" className="flex items-center gap-3 px-4 py-3 text-on-surface hover:bg-surface-variant/50 transition-colors focus:bg-surface-variant/50 focus:outline-none" onClick={() => setIsProfileDropdownOpen(false)}>
                        <span className="material-symbols-outlined text-[20px]">mail</span>
                        <span className="font-label-md">Messages</span>
                      </Link>
                      <div className="h-px bg-outline-variant/20 my-1"></div>
                      <button className="flex items-center gap-3 px-4 py-3 text-error hover:bg-error-container/20 transition-colors w-full text-left focus:bg-error-container/20 focus:outline-none" onClick={() => {
                        setIsProfileDropdownOpen(false);
                        alert("Logged out (preview)");
                        window.location.href = '/login';
                      }}>
                        <span className="material-symbols-outlined text-[20px]">logout</span>
                        <span className="font-label-md">Log Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-surface dark:bg-surface-dim border-b border-outline-variant/20 shadow-lg animate-in slide-in-from-top-2">
          <div className="flex flex-col py-4 px-6 gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.path || (link.path !== '/' && pathname?.startsWith(link.path));
              return (
                <Link 
                  key={link.name}
                  href={link.path}
                  className={`flex items-center px-4 py-3 rounded-xl transition-colors font-bold font-label-md text-label-md ${
                    isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-on-surface-variant hover:bg-surface-variant/50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
