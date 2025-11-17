
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Mail, Phone, FileText, CheckCircle, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const CommercialPage = () => {
  const { toast } = useToast();

  const clients = [
    { name: 'Tech Innovations Ltd', initials: 'TI', email: 'contact@techinnovations.com', phone: '+1 234 567 8900', contracts: 3, status: 'Actif' },
    { name: 'Global Solutions Inc', initials: 'GS', email: 'info@globalsolutions.com', phone: '+1 234 567 8901', contracts: 5, status: 'Actif' },
    { name: 'Digital Dynamics', initials: 'DD', email: 'hello@digitaldynamics.com', phone: '+1 234 567 8902', contracts: 2, status: 'En attente' },
    { name: 'Future Systems', initials: 'FS', email: 'contact@futuresystems.com', phone: '+1 234 567 8903', contracts: 4, status: 'Actif' },
  ];

  const proposals = [
    { id: 'PROP-001', client: 'Tech Innovations Ltd', title: 'Services de migration Cloud', value: '125,000 €', date: '2025-11-15', status: 'Envoyé' },
    { id: 'PROP-002', client: 'Global Solutions Inc', title: 'Développement logiciel sur mesure', value: '250,000 €', date: '2025-11-14', status: 'En revue' },
    { id: 'PROP-003', client: 'Digital Dynamics', title: 'Campagne marketing digitale', value: '75,000 €', date: '2025-11-13', status: 'Accepté' },
  ];

  const pipeline = [
    { stage: 'Prospect', count: 12, value: '450,000 €' },
    { stage: 'Qualifié', count: 8, value: '320,000 €' },
    { stage: 'Proposition', count: 5, value: '625,000 €' },
    { stage: 'Négociation', count: 3, value: '380,000 €' },
    { stage: 'Gagné', count: 2, value: '275,000 €' },
  ];

  const handleAction = (action) => {
    toast({
      title: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine instruction ! 🚀",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-1">Commercial & Clients</h1>
          <p className="text-gray-600">Gérez les relations clients et les propositions commerciales</p>
        </div>
        <Button onClick={() => handleAction('add')} className="bg-gradient-to-r from-[#4A7C2E] to-[#2D5016] hover:from-[#2D5016] hover:to-[#4A7C2E] text-white flex items-center gap-2 rounded-xl shadow-lg">
          <Briefcase className="w-5 h-5" />
          Nouveau Client
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Clients actifs', value: clients.filter(c => c.status === 'Actif').length, Icon: Users, color: 'from-[#4A7C2E] to-[#2D5016]' },
          { label: 'Propositions en cours', value: proposals.length, Icon: FileText, color: 'from-[#76B947] to-[#4A7C2E]' },
          { label: 'Acceptées', value: proposals.filter(p => p.status === 'Accepté').length, Icon: CheckCircle, color: 'from-[#2D5016] to-[#1F3810]' },
          { label: 'Opportunités', value: pipeline.reduce((acc, s) => acc + s.count, 0), Icon: TrendingUp, color: 'from-[#C41E3A] to-[#8B1A2B]' },
        ].map((kpi, idx) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ scale: 1.03, y: -5 }}
            className={`bg-gradient-to-br ${kpi.color} rounded-2xl p-6 text-white shadow-lg`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <kpi.Icon className="w-6 h-6" />
              </div>
              <div className="px-3 py-1 rounded-full text-sm bg-white/20 backdrop-blur-sm">MAJ</div>
            </div>
            <h3 className="text-white/80 text-sm font-medium">{kpi.label}</h3>
            <p className="text-3xl font-bold">{kpi.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Contract Pipeline */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Pipeline des Contrats</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {pipeline.map((stage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow"
            >
              <h3 className="font-semibold mb-2 text-gray-600">{stage.stage}</h3>
              <p className="text-2xl font-bold text-[#2D5016] mb-1">{stage.count}</p>
              <p className="text-sm text-gray-500">{stage.value}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Client List */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Portefeuille Clients</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#4A7C2E] to-[#2D5016] text-white flex items-center justify-center text-xl font-bold shadow-md">{client.initials}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1 text-gray-900">{client.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    client.status === 'Actif' ? 'bg-[#76B947]/15 text-[#2D5016]' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {client.status}
                  </span>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Mail className="w-4 h-4" />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Phone className="w-4 h-4" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FileText className="w-4 h-4" />
                  <span>{client.contracts} Contrats Actifs</span>
                </div>
              </div>
              <Button onClick={() => handleAction('view')} className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg shadow-sm">
                Voir détails
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Commercial Proposals */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Propositions Commerciales</h2>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">ID Prop.</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Client</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Titre</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Valeur</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Statut</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {proposals.map((proposal, index) => (
                  <motion.tr
                    key={proposal.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                    className="border-b border-gray-100 hover:bg-[#76B947]/5 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900">{proposal.id}</td>
                    <td className="px-6 py-4 text-gray-500">{proposal.client}</td>
                    <td className="px-6 py-4 text-gray-900">{proposal.title}</td>
                    <td className="px-6 py-4 text-[#2D5016] font-semibold">{proposal.value}</td>
                    <td className="px-6 py-4 text-gray-500">{proposal.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        proposal.status === 'Accepté' ? 'bg-[#76B947]/15 text-[#2D5016]' :
                        proposal.status === 'En revue' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {proposal.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Button onClick={() => handleAction('view')} className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm px-4 py-2 rounded-lg shadow-sm">
                        Voir
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CommercialPage;
