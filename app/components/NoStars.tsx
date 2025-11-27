'use client';
import { useEffect } from 'react';

export default function NoStars() {
  useEffect(() => {
    // Kill the exact container
    document.querySelectorAll('div.pointer-events-none.fixed.inset-0.z-\\[1\\].overflow-hidden')
      .forEach(el => (el as HTMLElement).style.display = 'none');

    // Extra: hide the three absolute SVGs if they escaped the container
    document.querySelectorAll('svg.absolute').forEach((el) => {
      const cls = el.getAttribute('class') || '';
      if (cls.includes('text-neutral-300/70') || cls.includes('text-neutral-300/60') || cls.includes('text-neutral-300/55')) {
        (el as HTMLElement).style.display = 'none';
      }
    });
  }, []);
  return null;
}
