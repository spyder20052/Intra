
import React from 'react';
import { motion } from 'framer-motion';
import { Headphones, Plus, AlertCircle, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ITSupportPage = () => {
  const { toast } = useToast();

  const tickets = [
    { id: 'IT-001', title: 'E-mail non synchronisé sur mobile', user: 'Alice Johnson', priority: 'haute', status: 'Ouvert', date: '2025-11-17' },
    { id: 'IT-002', title: 'Problèmes connexion imprimante', user: 'Bob Smith', priority: 'moyenne', status: 'En cours', date: '2025-11-17' },
    { id: 'IT-003', title: 'Demande d\'installation logiciel', user: 'Carol White', priority: 'basse', status: 'Ouvert', date: '2025-11-16' },
    { id: 'IT-004', title: 'Accès VPN ne fonctionne pas', user: 'David Brown', priority: 'haute', status: 'En cours', date: '2025-11-16' },
    { id: 'IT-005', title: 'Réinitialisation de mot de passe', user: 'Emma Davis', priority: 'moyenne', status: 'Résolu', date: '2025-11-15' },
    { id: 'IT-006', title: 'Ordinateur portable lent', user: 'Frank Wilson', priority: 'basse', status: 'Ouvert', date: '2025-11-15' },
    { id: 'IT-007', title: 'Problèmes de connectivité réseau', user: 'Grace Lee', priority: 'haute', status: 'En cours', date: '2025-11-14' },
    { id: 'IT-008', title: 'Activation de licence logicielle', user: 'Henry Chen', priority: 'moyenne', status: 'Résolu', date: '2025-11-14' },
  ];

  const priorityColors = {
    haute: 'bg-red-100 text-red-800',
    moyenne: 'bg-yellow-100 text-yellow-800',
    basse: 'bg-green-100 text-green-800',
  };

  const statusColors = {
    'Ouvert': 'bg-gray-100 text-gray-600',
    'En cours': 'bg-blue-100 text-blue-800',
    'Résolu': 'bg-green-100 text-green-800',
  };

  const handleDeclare = () => {
    toast({
      title: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine instruction ! 🚀",
    });
  };

  const handleViewTicket = (id) => {
    toast({
      title: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine instruction ! 🚀",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-1">Support IT & SAV</h1>
          <p className="text-gray-600">Gérez les tickets IT et les demandes de support technique</p>
        </div>
        <Button onClick={handleDeclare} className="bg-gradient-to-r from-[#4A7C2E] to-[#2D5016] hover:from-[#2D5016] hover:to-[#4A7C2E] text-white flex items-center gap-2 rounded-xl shadow-lg">
          <Plus className="w-5 h-5" />
          Déclarer un problème
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Tickets', value: tickets.length, Icon: Headphones, color: 'from-[#4A7C2E] to-[#2D5016]' },
          { label: 'Ouverts', value: tickets.filter(t => t.status === 'Ouvert').length, Icon: AlertTriangle, color: 'from-[#76B947] to-[#4A7C2E]' },
          { label: 'En cours', value: tickets.filter(t => t.status === 'En cours').length, Icon: Clock, color: 'from-[#2D5016] to-[#1F3810]' },
          { label: 'Résolus', value: tickets.filter(t => t.status === 'Résolu').length, Icon: CheckCircle2, color: 'from-[#C41E3A] to-[#8B1A2B]' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.03, y: -5 }}
            className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-lg`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <stat.Icon className="w-6 h-6" />
              </div>
              <div className="px-3 py-1 rounded-full text-sm bg-white/20 backdrop-blur-sm">MAJ</div>
            </div>
            <h3 className="text-white/80 text-sm font-medium">{stat.label}</h3>
            <p className="text-3xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Tickets Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-lg"
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Tickets IT</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">ID Ticket</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Problème</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Utilisateur</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Priorité</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Statut</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Date</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket, index) => (
                <motion.tr
                  key={ticket.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -2 }}
                  className="border-b border-gray-100 hover:bg-[#76B947]/5 transition-colors"
                >
                  <td className="px-6 py-4 font-semibold text-gray-900">{ticket.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-900">
                      <AlertCircle className="w-4 h-4 text-gray-400" />
                      <span>{ticket.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{ticket.user}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${priorityColors[ticket.priority]}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[ticket.status]}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{ticket.date}</td>
                  <td className="px-6 py-4">
                    <Button 
                      onClick={() => handleViewTicket(ticket.id)}
                      className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm px-4 py-2 rounded-lg shadow-sm"
                    >
                      Voir détails
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default ITSupportPage;
