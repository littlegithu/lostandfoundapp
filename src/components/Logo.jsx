import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import lightLogo from '../Assets/Gif.gif';   // note: capital 'Assets'
import darkLogo from '../Assets/logoo.png';

const Logo = () => {
  const { darkMode } = useTheme();
  const logoWidth = '180px';
  const logoSrc = darkMode ? darkLogo : lightLogo;

  return (
    <div className="py-3 border-b border-gray-200 dark:border-gray-700 flex justify-center">
      <Link to="/">
        <img src={logoSrc} alt="Logo" style={{ width: logoWidth, height: 'auto', borderRadius: 0 }} />
      </Link>
    </div>
  );
};

export default Logo;