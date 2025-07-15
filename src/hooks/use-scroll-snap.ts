'use client';

import { useEffect, useRef } from 'react';

export function useScrollSnap() {
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTimeRef = useRef(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (document.body.style.overflow === 'hidden') {
        return;
      }
      // Throttle scroll events
      const now = Date.now();
      if (now - lastScrollTimeRef.current < 100) {
        e.preventDefault();
        return;
      }
      lastScrollTimeRef.current = now;
      
      // Prevent default scroll behavior
      e.preventDefault();
      
      // If already scrolling, ignore
      if (isScrollingRef.current) return;
      
      // Only trigger on significant wheel movement
      if (Math.abs(e.deltaY) < 10) return;
      
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set scrolling flag
      isScrollingRef.current = true;
      
      // Determine scroll direction
      const deltaY = e.deltaY;
      const currentScrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Check if footer is visible in viewport
      const footerElement = document.querySelector('footer');
      const isAtBottom = footerElement ? 
        (footerElement.getBoundingClientRect().top < viewportHeight) : 
        (currentScrollY + viewportHeight >= documentHeight - 10); // fallback
      
      // Calculate current section
      const currentSectionIndex = Math.round(currentScrollY / viewportHeight);
      
      // Special handling for footer scroll
      if (isAtBottom && deltaY < 0) {
        // Footer is visible, scroll up: position where footer just disappears from viewport
        const footerHeight = footerElement ? footerElement.offsetHeight : 400; // fallback to 400px
        const targetY = Math.max(0, documentHeight - footerHeight - viewportHeight);
        window.scrollTo({ 
          top: targetY, 
          behavior: 'smooth' 
        });
      } else {
        // Normal section scrolling
        let targetSectionIndex = currentSectionIndex;
        if (deltaY > 0) {
          // Scroll down
          targetSectionIndex = Math.min(currentSectionIndex + 1, 5); // Assuming 6 sections (0-5)
        } else {
          // Scroll up  
          targetSectionIndex = Math.max(currentSectionIndex - 1, 0);
        }
        
        // Calculate target scroll position
        const targetY = targetSectionIndex * viewportHeight;
        
        // Smooth scroll to target
        window.scrollTo({ 
          top: targetY, 
          behavior: 'smooth' 
        });
      }
      
      // Reset scrolling flag after animation
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000); // Longer duration for smoother experience
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        if (!isScrollingRef.current) {
          const currentScrollY = window.scrollY;
          const viewportHeight = window.innerHeight;
          const currentSectionIndex = Math.round(currentScrollY / viewportHeight);
          const targetSectionIndex = Math.min(currentSectionIndex + 1, 5);
          const targetY = targetSectionIndex * viewportHeight;
          
          isScrollingRef.current = true;
          window.scrollTo({ top: targetY, behavior: 'smooth' });
          
          if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = setTimeout(() => {
            isScrollingRef.current = false;
          }, 1000);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (!isScrollingRef.current) {
          const currentScrollY = window.scrollY;
          const viewportHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          
          // Check if footer is visible in viewport
          const footerElement = document.querySelector('footer');
          const isAtBottom = footerElement ? 
            (footerElement.getBoundingClientRect().top < viewportHeight) : 
            (currentScrollY + viewportHeight >= documentHeight - 10); // fallback
          
          if (isAtBottom) {
            // Footer is visible, scroll up: position where footer just disappears from viewport
            const footerHeight = footerElement ? footerElement.offsetHeight : 400; // fallback to 400px
            const targetY = Math.max(0, documentHeight - footerHeight - viewportHeight);
            window.scrollTo({ top: targetY, behavior: 'smooth' });
          } else {
            // Normal section scrolling
            const currentSectionIndex = Math.round(currentScrollY / viewportHeight);
            const targetSectionIndex = Math.max(currentSectionIndex - 1, 0);
            const targetY = targetSectionIndex * viewportHeight;
            window.scrollTo({ top: targetY, behavior: 'smooth' });
          }
          
          isScrollingRef.current = true;
          
          if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = setTimeout(() => {
            isScrollingRef.current = false;
          }, 1000);
        }
      }
    };

    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    
    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);
}
