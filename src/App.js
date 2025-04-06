import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router'; // Note: Use Navigate instead of BrowserRouter
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import NewsPage from './pages/NewsPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';

import './App.css';

function App() {
  const user = useSelector((state) => state.auth.user)

  return (
      <Router>
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <LoginPage />}
          />
          {/* Only show Header and Sidebar if the user is logged in */}
          <Route
            path="*"
            element={
              user ? (
                <div className="app-container">
                  <Header />
                  <div className="content-wrapper pt-16">
                    <Sidebar />
                    <main className="main-content">
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/news" element={<NewsPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Router>
  );
}

export default App;
