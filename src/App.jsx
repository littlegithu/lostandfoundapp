import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AddItem from './pages/AddItem';
import EditItem from './pages/EditItem';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 flex flex-col">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/add" element={<AddItem />} />
                  <Route path="/edit/:id" element={<EditItem />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
                <Footer />
              </main>
            </div>
          </div>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;