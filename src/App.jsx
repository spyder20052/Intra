
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Routes, Route, useNavigate } from 'react-router-dom';
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
  const [userRole, setUserRole] = useState('Employé');

  const handleLogin = (role) => {
    setUserRole(role || 'Employé');
    navigate('/');
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>Intranet Quality Corporate</title>
        <meta name="description" content="Plateforme intranet moderne pour les employés de Quality Corporate" />
      </Helmet>
      <Routes>
        {/* Optional login route, not required for access */}
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

        {/* All routes are public */}
        <Route
          path="/*"
          element={
            <DashboardLayout userRole={userRole} onLogout={handleLogout}>
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
          }
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
