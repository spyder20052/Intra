
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import DashboardLayout from '@/components/DashboardLayout';
import HomePage from '@/pages/HomePage';
import DirectionPage from '@/pages/DirectionPage';
import HRPage from '@/pages/HRPage';
import AccountingPage from '@/pages/AccountingPage';
import PurchasingPage from '@/pages/PurchasingPage';
import ProjectsPage from '@/pages/ProjectsPage';
import CommercialPage from '@/pages/CommercialPage';
import CommunicationPage from '@/pages/CommunicationPage';
import ITSupportPage from '@/pages/ITSupportPage';
import ProfilePage from '@/pages/ProfilePage';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('Direction');

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    navigate('/');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <>
      <Helmet>
        <title>Intranet Quality Corporate</title>
        <meta name="description" content="Plateforme intranet moderne pour les employés de Quality Corporate" />
      </Helmet>
      <Routes>
        {/* Public route */}
        <Route
          path="/login"
          element={
            <>
              <Helmet>
                <title>Connexion - Intranet Quality Corporate</title>
              </Helmet>
              <LoginPage onLogin={handleLogin} />
            </>
          }
        />

        {/* Protected routes */}
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <DashboardLayout onLogout={handleLogout} userRole={userRole}>
                <Routes>
                  <Route path="/" element={<HomePage navigateToPage={() => {}} />} />
                  <Route path="/direction" element={<DirectionPage />} />
                  <Route path="/rh" element={<HRPage />} />
                  <Route path="/accounting" element={<AccountingPage />} />
                  <Route path="/purchasing" element={<PurchasingPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/commercial" element={<CommercialPage />} />
                  <Route path="/communication" element={<CommunicationPage />} />
                  <Route path="/it-support" element={<ITSupportPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Routes>
              </DashboardLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
