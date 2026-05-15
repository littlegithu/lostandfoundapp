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

// Layout with Sidebar + Footer (for all pages)
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
              {/* All routes are accessible – sign‑in happens inside Home via modal */}
              <Route path="/" element={
                <MainLayout>
                  <Home />
                </MainLayout>
              } />
              <Route path="/add" element={
                <MainLayout>
                  <AddItem />
                </MainLayout>
              } />
              <Route path="/edit/:id" element={
                <MainLayout>
                  <EditItem />
                </MainLayout>
              } />
              <Route path="/profile" element={
                <MainLayout>
                  <Profile />
                </MainLayout>
              } />
              {/* Redirect any unknown path to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;