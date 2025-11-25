import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, Users, DollarSign, ShoppingCart, FolderKanban, 
  Briefcase, MessageSquare, Headphones, User, LogOut,
  Search, Bell, Menu, X, BarChart3, ChevronRight
} from 'lucide-react';

const DashboardLayout = ({ children, onLogout, userRole = 'Employé' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Accueil', icon: Home },
    { path: '/direction', label: 'Direction', icon: BarChart3 },
    { path: '/rh', label: 'RH', icon: Users },
    { path: '/accounting', label: 'Comptabilité', icon: DollarSign },
    { path: '/purchasing', label: 'Achats', icon: ShoppingCart },
    { path: '/projects', label: 'Projets', icon: FolderKanban },
    { path: '/commercial', label: 'Commercial', icon: Briefcase },
    { path: '/communication', label: 'Communication', icon: MessageSquare },
    { path: '/it-support', label: 'Support IT', icon: Headphones },
    { path: '/profile', label: 'Mon Profil', icon: User },
  ];

  const notifications = [
    { id: 1, text: 'Nouvelle demande de congé en attente', time: 'il y a 5 min', unread: true },
    { id: 2, text: 'Ticket IT #1234 résolu', time: 'il y a 1 heure', unread: true },
    { id: 3, text: 'Jalon de projet atteint', time: 'il y a 2 heures', unread: false },
  ];
  
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-72 bg-gradient-to-b from-[#2D5016] to-[#1F3810] flex flex-col fixed h-full z-40 shadow-2xl"
          >
            {/* Logo Section */}
            <div className="p-6 border-b border-white/10">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <img 
                  src="/images/logo.png"
                  alt="Quality Corporate" 
                  className="h-14"
                />
              </motion.div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive: active }) => `w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl transition-all group relative overflow-hidden ${
                        active ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm' : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {({ isActive: active }) => (
                        <>
                          {active && (
                            <motion.div
                              layoutId="activeTab"
                              className="absolute inset-0 bg-gradient-to-r from-[#76B947]/30 to-transparent rounded-xl"
                              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                            />
                          )}
                          <div className="flex items-center gap-3 relative z-10">
                            <div className={`p-2 rounded-lg ${active ? 'bg-white/20' : 'bg-white/10'}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="font-medium">{item.label}</span>
                          </div>
                          {active && <ChevronRight className="w-4 h-4 relative z-10" />}
                        </>
                      )}
                    </NavLink>
                  </motion.div>
                );
              })}
            </nav>

            {/* Logout Button (optional) */}
            {onLogout && (
              <div className="p-4 border-t border-white/10">
                <motion.button
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-4 py-3.5 bg-gradient-to-r from-[#C41E3A] to-[#8B1A2B] hover:from-[#8B1A2B] hover:to-[#C41E3A] text-white rounded-xl transition-all shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Déconnexion</span>
                </motion.button>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-72' : 'ml-0'}`}>
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2.5 text-[#2D5016] hover:bg-[#76B947]/10 rounded-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>

              <div className="relative w-96 hidden md:block">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher dans l'intranet..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A7C2E] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <div className="relative">
                <motion.button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2.5 text-[#2D5016] hover:bg-[#76B947]/10 rounded-xl transition-all relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bell className="w-6 h-6" />
                  {notifications.some(n => n.unread) && (
                    <motion.span 
                      className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#C41E3A] rounded-full border-2 border-white"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.button>

                <AnimatePresence>
                  {notificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ type: "spring", duration: 0.3 }}
                      className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden"
                    >
                      <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-[#4A7C2E]/5 to-transparent">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">Notifications</h3>
                          <span className="text-xs bg-[#C41E3A] text-white px-2 py-1 rounded-full">
                            {notifications.filter(n => n.unread).length} nouvelles
                          </span>
                        </div>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notif) => (
                          <motion.div 
                            key={notif.id} 
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-all cursor-pointer ${notif.unread ? 'bg-[#76B947]/5' : ''}`}
                            whileHover={{ x: 5 }}
                          >
                            <div className="flex items-start gap-3">
                              {notif.unread && (
                                <div className="w-2 h-2 bg-[#C41E3A] rounded-full mt-2 flex-shrink-0" />
                              )}
                              <div className="flex-1">
                                <p className={`text-sm ${notif.unread ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                                  {notif.text}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <div className="p-3 bg-gray-50 text-center">
                        <button className="text-sm text-[#4A7C2E] hover:text-[#2D5016] font-medium">
                          Voir toutes les notifications
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Profile */}
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <motion.div 
                  className="w-11 h-11 bg-gradient-to-br from-[#4A7C2E] to-[#2D5016] rounded-xl flex items-center justify-center font-semibold text-white shadow-md"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                >
                  JD
                </motion.div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">{userRole}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="in"
              exit="out"
              transition={pageTransition}
            >
              {/* Apply inner padding/container on all pages except homepage */}
              {location.pathname !== '/' ? (
                <div className="w-full max-w-7xl mx-auto px-6 py-6 md:px-8 md:py-8">
                  {children}
                </div>
              ) : (
                children
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 px-6 py-4 mt-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#4A7C2E] rounded-full animate-pulse"></span>
              © 2025 Quality Corporate. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <button className="hover:text-[#4A7C2E] transition-colors font-medium">
                Mentions légales
              </button>
              <span className="text-gray-400">•</span>
              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                v2.1.0
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;