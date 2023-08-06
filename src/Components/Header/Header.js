import React, { useState, useEffect, useRef } from 'react';
import MainHeader from './MainHeader/MainHeader';
import MiniHeader from './MiniHeader/MiniHeader';

const Header = () => {
  const [showMiniHeader, setShowMiniHeader] = useState(false);
  const mainHeaderRef = useRef(null);
  const mainHeaderHeight = mainHeaderRef.current?.clientHeight || 0;
  const scrollThreshold = 50; // Adjust this threshold as needed

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > mainHeaderHeight) {
      setShowMiniHeader(true);
    } else if (currentScrollY < mainHeaderHeight + scrollThreshold) {
      setShowMiniHeader(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="App">
      <MainHeader ref={mainHeaderRef} />
      <MiniHeader showMiniHeader={showMiniHeader} />
    </div>
  );
};

export default Header;
