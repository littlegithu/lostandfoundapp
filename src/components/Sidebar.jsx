import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaExclamationTriangle, FaUserCircle } from 'react-icons/fa';
import Logo from './Logo';

const Sidebar = () => {
  const location = useLocation();
  const navLinks = [
    { path: '/', label: 'Dashboard', icon: <FaHome size={24} /> },
    { path: '/add', label: 'Report Item', icon: <FaExclamationTriangle size={24} /> },
    { path: '/profile', label: 'Profile', icon: <FaUserCircle size={24} /> }
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 h-screen overflow-x-hidden whitespace-nowrap flex-shrink-0 flex flex-col">
      <Logo />
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl m-3 p-3 flex-1">
        <nav className="p-0">
          <div className="flex flex-col gap-2">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition ${
                  location.pathname === link.path
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {link.icon}
                <span className="text-sm">{link.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;