import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { getItems, deleteItem } from '../services/api';
import ItemCard from '../components/ItemCard';
import { FaUserCircle, FaSun, FaMoon } from 'react-icons/fa';

const Home = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const loadItems = async () => {
    try {
      setLoading(true);
      const res = await getItems();
      setItems(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this item?')) {
      try {
        await deleteItem(id);
        loadItems();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const filteredItems = items.filter(item => {
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
    const matchesSearch = searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="flex-shrink-0 p-4 px-8 pt-4">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
            {user ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <FaUserCircle size={24} className="text-gray-500 dark:text-gray-400" />
                    )}
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Welcome, {user.firstName || user.name?.split(' ')[0] || user.name}!</span>
                </div>
                <button
                  onClick={logout}
                  className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-2"
                >
                  <FaUserCircle size={18} />
                  Sign Out
                </button>
              </>
            ) : (
              // This should never show because ProtectedRoute redirects to login
              <button
                onClick={() => window.location.href = '/login'}
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-2"
              >
                <FaUserCircle size={18} />
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Sticky search bar */}
        <div
          className="sticky top-0 z-20 rounded-xl p-3 mb-4 shadow-sm"
          style={{
            backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.8)' : 'rgba(249, 250, 251, 0.7)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white"
            >
              <option value="All">All Items</option>
              <option value="Lost">Lost Only</option>
              <option value="Found">Found Only</option>
            </select>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Total Items</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{items.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Lost Items</p>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">{items.filter(i => i.status === 'Lost').length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Found Items</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{items.filter(i => i.status === 'Found').length}</p>
          </div>
        </div>
      </div>

      {/* Scrollable items */}
      <div className="flex-1 overflow-y-auto px-8 pb-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Loading...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">No items found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => <ItemCard key={item.id} item={item} onDelete={handleDelete} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;