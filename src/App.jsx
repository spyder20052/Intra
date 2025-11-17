
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [userRole, setUserRole] = useState('Direction');

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('home');
  };

  const navigateToPage = (pageId) => {
    setCurrentPage(pageId);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigateToPage={navigateToPage} />;
      case 'direction':
        return <DirectionPage />;
      case 'hr':
        return <HRPage />;
      case 'accounting':
        return <AccountingPage />;
      case 'purchasing':
        return <PurchasingPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'commercial':
        return <CommercialPage />;
      case 'communication':
        return <CommunicationPage />;
      case 'it-support':
        return <ITSupportPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage navigateToPage={navigateToPage} />;
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Connexion - Intranet Quality Corporate</title>
          <meta name="description" content="Accédez au portail intranet de Quality Corporate avec une authentification sécurisée" />
        </Helmet>
        <LoginPage onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Intranet Quality Corporate</title>
        <meta name="description" content="Plateforme intranet moderne pour les employés de Quality Corporate" />
      </Helmet>
      <DashboardLayout 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        onLogout={handleLogout}
        userRole={userRole}
      >
        {renderPage()}
      </DashboardLayout>
      <Toaster />
    </>
  );
}

export default App;
