import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AddItem from './pages/AddItem';
import EditItem from './pages/EditItem';
import Login from './auth/Login';
import Signup from './auth/Signup';
import ItemDetail from './components/ItemDetail';
import  { useState, useEffect } from 'react';

// Layout with Sidebar + Footer (for authenticated pages only)
const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-1">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        {children}
        <Footer />
      </main>
    </div>
  );
};

function App() {

  const [items, setItems] = useState([]);
  
  useEffect(() => {
    const stored = localStorage.getItem('lostAndFoundItems');
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lostAndFoundItems', JSON.stringify(items));
  }, [items]);

  const handleDeleteItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            <Routes>
              {/* Public routes - NO SIDEBAR, NO LOGIN REQUIRED */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected routes - REQUIRE LOGIN + HAVE SIDEBAR */}
              <Route path="/" element={
                <ProtectedRoute>
                  <MainLayout>
                    <Home />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/add" element={
                <ProtectedRoute>
                  <MainLayout>
                    <AddItem />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/edit/:id" element={
                <ProtectedRoute>
                  <MainLayout>
                    <EditItem />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <MainLayout>
                    <Profile />
                  </MainLayout>
                </ProtectedRoute>
              } />

              {/* item detail route*/}
              <Route path="/item/:id" element={
                <ProtectedRoute>
                  <MainLayout>
                    <ItemDetail items={items} onDelete={handleDeleteItem} />
                  </MainLayout>
                </ProtectedRoute>
              } />

              {/* Redirect any unknown path to login */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;