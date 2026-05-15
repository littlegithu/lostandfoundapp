import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Signup from './components/Signup';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

// ---------- API Service ----------
const API_BASE_URL = 'https://6a01817236fb6ad04de10c7b.mockapi.io/api/app';
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});
const getItems = () => api.get('/items');
const getItemById = (id) => api.get(`/items/${id}`);
const addItem = (item) => api.post('/items', item);
const updateItem = (id, item) => api.put(`/items/${id}`, item);
const deleteItem = (id) => api.delete(`/items/${id}`);

// ---------- Components ----------
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUserName(JSON.parse(user).name);
    } else {
      setUserName('');
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUserName('');
    navigate('/');
  };

  // Don't show navbar on signup and login pages
  if (location.pathname === '/' || location.pathname === '/login') {
    return null;
  }

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="text-white text-xl font-bold">🔍 Lost & Found Campus</Link>
          <div className="flex space-x-6 items-center">
            <Link to="/dashboard" className="text-white hover:text-blue-200 transition">Dashboard</Link>
            <Link to="/add" className="text-white hover:text-blue-200 transition">Report Item</Link>
            <Link to="/about" className="text-white hover:text-blue-200 transition">About</Link>
            <div className="text-white">Welcome, {userName}!</div>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const ItemCard = ({ item, onDelete }) => {
  const navigate = useNavigate();
  const { id, name, location, status, description, date } = item;
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-5 border border-gray-100">
      <div className="flex justify-between items-start">
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${status === 'Lost' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {status.toUpperCase()}
        </span>
        {date && <span className="text-xs text-gray-400">{new Date(date).toLocaleDateString()}</span>}
      </div>
      <h3 className="text-xl font-semibold mt-3 text-gray-800">{name}</h3>
      <div className="flex items-center text-gray-600 mt-2">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        <span className="text-sm">{location}</span>
      </div>
      {description && <p className="text-gray-500 text-sm mt-3 line-clamp-2">{description}</p>}
      <div className="flex gap-3 mt-5 pt-3 border-t">
        <button onClick={() => navigate(`/edit/${id}`)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
        <button onClick={() => onDelete(id)} className="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
      </div>
    </div>
  );
};

const ItemForm = ({ initialData, onSubmit, buttonText, isLoading }) => {
  const [item, setItem] = useState(initialData || { name: '', location: '', status: 'Lost', description: '' });
  const handleChange = (e) => setItem(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!item.name.trim() || !item.location.trim()) return;
    onSubmit(item);
  };
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-5">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Item Name *</label><input type="text" name="name" value={item.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., iPhone 14, Student ID" required /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Location *</label><input type="text" name="location" value={item.location} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Library, Cafeteria" required /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Status</label><select name="status" value={item.status} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"><option value="Lost">Lost</option><option value="Found">Found</option></select></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea name="description" value={item.description} onChange={handleChange} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Describe color, brand, features..." /></div>
      <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50 font-medium">{isLoading ? 'Processing...' : buttonText}</button>
    </form>
  );
};

// ---------- Pages ----------
const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const loadItems = async () => {
    try { setLoading(true); const res = await getItems(); setItems(res.data); } catch (error) { console.error(error); } finally { setLoading(false); }
  };
  useEffect(() => { loadItems(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this item?')) { try { await deleteItem(id); loadItems(); } catch (error) { console.error(error); } }
  };

  const filteredItems = items.filter(item => {
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
    const matchesSearch = searchQuery === '' || item.name.toLowerCase().includes(searchQuery.toLowerCase()) || (item.description?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 border rounded-lg"><option value="All">All</option><option value="Lost">Lost Only</option><option value="Found">Found Only</option></select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-red-50 rounded-lg p-4 text-center"><p className="text-2xl font-bold text-red-600">{items.filter(i => i.status === 'Lost').length}</p><p className="text-gray-600">Lost</p></div>
        <div className="bg-green-50 rounded-lg p-4 text-center"><p className="text-2xl font-bold text-green-600">{items.filter(i => i.status === 'Found').length}</p><p className="text-gray-600">Found</p></div>
      </div>
      {loading ? <div className="text-center py-12"><div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div><p>Loading...</p></div> : filteredItems.length === 0 ? <div className="text-center py-12 bg-gray-50 rounded-lg"><p className="text-gray-500">No items found</p></div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{filteredItems.map(item => <ItemCard key={item.id} item={item} onDelete={handleDelete} />)}</div>}
    </div>
  );
};

const AddItem = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (itemData) => {
    try { setLoading(true); await addItem({ ...itemData, date: new Date().toISOString() }); navigate('/dashboard'); } catch (error) { alert('Failed to add.'); } finally { setLoading(false); }
  };
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-2">Report Lost or Found Item</h1>
      <ItemForm onSubmit={handleSubmit} buttonText="Submit Report" isLoading={loading} />
    </div>
  );
};

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [item, setItem] = useState(null);
  useEffect(() => {
    const load = async () => { try { const res = await getItemById(id); setItem(res.data); } catch (error) { setItem(null); } finally { setLoading(false); } };
    load();
  }, [id]);
  const handleSubmit = async (updatedData) => {
    try { setSubmitting(true); await updateItem(id, updatedData); navigate('/dashboard'); } catch (error) { alert('Update failed.'); } finally { setSubmitting(false); }
  };
  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!item) return <div className="text-center py-8 text-red-500">Item not found</div>;
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-2">Edit Item</h1>
      <ItemForm initialData={item} onSubmit={handleSubmit} buttonText="Save Changes" isLoading={submitting} />
    </div>
  );
};

const About = () => (
  <div className="container mx-auto px-4 py-8 max-w-4xl">
    <div className="bg-white rounded-lg shadow-md p-8">
      <h1 className="text-3xl font-bold mb-4">About Lost & Found Campus</h1>
      <p className="mb-4">Web-based platform to report, track, and recover lost/found items on campus.</p>
      <h2 className="text-xl font-semibold mt-6">Features</h2>
      <ul className="list-disc list-inside mt-2"><li>Report lost/found items</li><li>Search & filter</li><li>Edit/delete entries</li><li>Responsive design</li></ul>
    </div>
  </div>
);

// ---------- App with Protected Routes ----------
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          {/* Public routes (no login required) */}
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected routes (require login) */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/add" element={
            <ProtectedRoute>
              <AddItem />
            </ProtectedRoute>
          } />
          <Route path="/edit/:id" element={
            <ProtectedRoute>
              <EditItem />
            </ProtectedRoute>
          } />
          <Route path="/about" element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;