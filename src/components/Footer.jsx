import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400">
      <div className="container mx-auto px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
          <div>
            <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Company</h4>
            <ul className="space-y-1">
              <li>About</li>
              <li>Jobs</li>
              <li>For the Record</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Communities</h4>
            <ul className="space-y-1">
              <li>For Artists</li>
              <li>Developers</li>
              <li>Advertising</li>
              <li>Investors</li>
              <li>Vendors</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Useful links</h4>
            <ul className="space-y-1">
              <li>Support</li>
              <li>Free Mobile App</li>
              <li>Popular by Country</li>
              <li>Import your music</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Plans</h4>
            <ul className="space-y-1">
              <li>Premium Individual</li>
              <li>Premium Duo</li>
              <li>Premium Family</li>
              <li>Premium Student</li>
              <li>Spotify Free</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Legal</h4>
            <ul className="space-y-1">
              <li>Safety & Privacy Center</li>
              <li>Privacy Policy</li>
              <li>Cookies</li>
              <li>About Ads</li>
              <li>Accessibility</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-gray-400 dark:text-gray-500 border-t border-gray-200 dark:border-gray-800 mt-8 pt-6">
          © {new Date().getFullYear()} Lost & Found Campus App
        </div>
      </div>
    </footer>
  );
};

export default Footer;