
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Calendar, FileText, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const HRPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('employees');

  const employees = [
    { name: 'Alice Johnson', position: 'Manager RH', status: 'Actif', photo: 'AJ' },
    { name: 'Bob Smith', position: 'Développeur Logiciel', status: 'Actif', photo: 'BS' },
    { name: 'Carol White', position: 'Analyste Financier', status: 'Actif', photo: 'CW' },
    { name: 'David Brown', position: 'Commercial', status: 'En congé', photo: 'DB' },
    { name: 'Emma Davis', position: 'Coordinatrice Marketing', status: 'Actif', photo: 'ED' },
  ];

  const leaveRequests = [
    { employee: 'David Brown', type: 'Vacances', from: '2025-11-20', to: '2025-11-25', status: 'En attente' },
    { employee: 'Emma Davis', type: 'Arrêt maladie', from: '2025-11-18', to: '2025-11-19', status: 'Approuvé' },
    { employee: 'Bob Smith', type: 'Personnel', from: '2025-12-01', to: '2025-12-03', status: 'En attente' },
    { employee: 'Alice Johnson', type: 'Vacances', from: '2025-12-15', to: '2025-12-22', status: 'Rejeté' },
  ];

  const documents = [
    { name: 'Manuel de l\'employé 2025', type: 'PDF', size: '2.4 Mo' },
    { name: 'Politique de congés', type: 'PDF', size: '1.1 Mo' },
    { name: 'Guide des avantages', type: 'PDF', size: '3.2 Mo' },
    { name: 'Code de conduite', type: 'PDF', size: '1.8 Mo' },
  ];

  const handleAction = (action) => {
    toast({
      title: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine instruction ! 🚀",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-1">Ressources Humaines</h1>
          <p className="text-gray-600">Gestion des employés, congés et documents RH</p>
        </div>
        <Button onClick={() => handleAction('add')} className="bg-gradient-to-r from-[#4A7C2E] to-[#2D5016] hover:from-[#2D5016] hover:to-[#4A7C2E] text-white flex items-center gap-2 rounded-xl shadow-lg">
          <Plus className="w-5 h-5" />
          Ajouter un employé
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Employés actifs', value: 128, change: '+3', color: 'from-[#4A7C2E] to-[#2D5016]' },
          { title: 'En congé actuellement', value: 6, change: '+1', color: 'from-[#76B947] to-[#4A7C2E]' },
          { title: 'Nouveaux ce mois', value: 4, change: '+2', color: 'from-[#2D5016] to-[#1F3810]' },
          { title: 'Docs mis à jour', value: 12, change: '+5%', color: 'from-[#C41E3A] to-[#8B1A2B]' },
        ].map((kpi, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.03, y: -5 }}
            className={`bg-gradient-to-br ${kpi.color} rounded-2xl p-6 text-white shadow-lg`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1 text-sm">{kpi.change}</div>
            </div>
            <h3 className="text-white/80 text-sm font-medium mb-1">{kpi.title}</h3>
            <p className="text-3xl font-bold">{kpi.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {[
          { key: 'employees', label: 'Employés' },
          { key: 'leave', label: 'Congés' },
          { key: 'documents', label: 'Documents' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 font-medium capitalize rounded-xl transition-all ${
              activeTab === tab.key
                ? 'bg-gradient-to-r from-[#4A7C2E] to-[#2D5016] text-white shadow'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'employees' && (
            <div className="space-y-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher des employés..."
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A7C2E] focus:border-transparent transition-all"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {employees.map((employee, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#4A7C2E] to-[#2D5016] text-white flex items-center justify-center text-xl font-bold shadow-md">{employee.photo}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900">{employee.name}</h3>
                        <p className="text-gray-500 text-sm">{employee.position}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        employee.status === 'Actif' ? 'bg-[#76B947]/15 text-[#2D5016]' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {employee.status}
                      </span>
                      <Button onClick={() => handleAction('view')} className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg">
                        Voir Profil
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'leave' && (
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">Employé</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">Type</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">Du</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">Au</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">Statut</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveRequests.map((request, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ y: -2 }}
                        className="border-b border-gray-100 hover:bg-[#76B947]/5 transition-colors"
                      >
                        <td className="px-6 py-4 text-gray-900 font-medium">{request.employee}</td>
                        <td className="px-6 py-4 text-gray-500">{request.type}</td>
                        <td className="px-6 py-4 text-gray-500">{request.from}</td>
                        <td className="px-6 py-4 text-gray-500">{request.to}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            request.status === 'Approuvé' ? 'bg-[#76B947]/15 text-[#2D5016]' :
                            request.status === 'En attente' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-[#C41E3A]/15 text-[#8B1A2B]'
                          }`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button onClick={() => handleAction('approve')} className="bg-gradient-to-r from-[#4A7C2E] to-[#2D5016] hover:from-[#2D5016] hover:to-[#4A7C2E] text-white text-xs px-3 py-1 rounded-lg">
                              Approuver
                            </Button>
                            <Button onClick={() => handleAction('reject')} className="bg-gradient-to-r from-[#C41E3A] to-[#8B1A2B] hover:from-[#8B1A2B] hover:to-[#C41E3A] text-white text-xs px-3 py-1 rounded-lg">
                              Rejeter
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {documents.map((doc, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => handleAction('download')}
                >
                  <FileText className="w-12 h-12 text-[#4A7C2E] mb-4" />
                  <h3 className="font-semibold mb-2 text-gray-900">{doc.name}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{doc.type}</span>
                    <span>{doc.size}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HRPage;
