import { useState, useEffect } from 'react';

export default function useDesktopRange() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth > 768);
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isDesktop;
}