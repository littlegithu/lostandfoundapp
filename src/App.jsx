import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AddItem from './pages/AddItem';
import EditItem from './pages/EditItem';
import Signup from './components/Signup';
import Login from './components/Login';

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user') || localStorage.getItem('lostFoundUser');
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Layout with Sidebar + Footer (for authenticated pages)
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
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            <Routes>
              {/* Public routes (no sidebar, no login required) */}
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              
              {/* Protected routes (require login, have sidebar + footer) */}
              <Route path="/" element={
                <ProtectedRoute>
                  <MainLayout>
                    <Home />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
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
              
              {/* Catch all - redirect to login */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;