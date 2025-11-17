
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, Plus, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const AccountingPage = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const invoices = [
    { id: 'INV-001', amount: '5,240 €', supplier: 'Tech Solutions Inc', date: '2025-11-15', status: 'Payé' },
    { id: 'INV-002', amount: '3,890 €', supplier: 'Office Supplies Co', date: '2025-11-14', status: 'En attente' },
    { id: 'INV-003', amount: '12,500 €', supplier: 'Marketing Agency', date: '2025-11-13', status: 'Payé' },
    { id: 'INV-004', amount: '2,100 €', supplier: 'Cloud Services Ltd', date: '2025-11-12', status: 'En retard' },
    { id: 'INV-005', amount: '8,750 €', supplier: 'Consulting Group', date: '2025-11-11', status: 'Payé' },
    { id: 'INV-006', amount: '4,320 €', supplier: 'Equipment Rental', date: '2025-11-10', status: 'En attente' },
    { id: 'INV-007', amount: '6,890 €', supplier: 'Legal Services', date: '2025-11-09', status: 'Payé' },
    { id: 'INV-008', amount: '1,540 €', supplier: 'Utilities Provider', date: '2025-11-08', status: 'Payé' },
    { id: 'INV-009', amount: '9,200 €', supplier: 'Software Licenses', date: '2025-11-07', status: 'En attente' },
    { id: 'INV-010', amount: '3,450 €', supplier: 'Travel Agency', date: '2025-11-06', status: 'Payé' },
    { id: 'INV-011', amount: '7,800 €', supplier: 'Training Provider', date: '2025-11-05', status: 'En attente' },
    { id: 'INV-012', amount: '2,900 €', supplier: 'Maintenance Services', date: '2025-11-04', status: 'Payé' },
  ];

  const totalPages = Math.ceil(invoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInvoices = invoices.slice(startIndex, endIndex);

  const handleNewPayment = () => {
    toast({
      title: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine instruction ! 🚀",
    });
  };

  const handleFilter = () => {
    toast({
      title: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine instruction ! 🚀",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-1">Comptabilité & Finances</h1>
          <p className="text-gray-600">Gérez les factures, dépenses et demandes de paiement</p>
        </div>
        <Button onClick={handleNewPayment} className="bg-gradient-to-r from-[#4A7C2E] to-[#2D5016] hover:from-[#2D5016] hover:to-[#4A7C2E] text-white flex items-center gap-2 rounded-xl shadow-lg">
          <Plus className="w-5 h-5" />
          Nouvelle demande de paiement
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total factures', value: '68,680 €', change: '+8%', color: 'from-[#4A7C2E] to-[#2D5016]' },
          { label: 'Payé', value: '42,130 €', change: '+3%', color: 'from-[#76B947] to-[#4A7C2E]' },
          { label: 'En attente', value: '24,450 €', change: '-2%', color: 'from-[#2D5016] to-[#1F3810]' },
          { label: 'En retard', value: '2,100 €', change: '+1', color: 'from-[#C41E3A] to-[#8B1A2B]' },
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
                <DollarSign className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
                {stat.change}
              </div>
            </div>
            <h3 className="text-white/80 text-sm font-medium mb-1">{stat.label}</h3>
            <p className="text-3xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Invoices Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-lg"
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Factures & Dépenses</h2>
          <Button onClick={handleFilter} className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 flex items-center gap-2 rounded-xl shadow-sm">
            <Filter className="w-4 h-4" />
            Filtrer
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">ID Facture</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Montant</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Fournisseur</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Date</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Statut</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <AnimatePresence>
            <tbody>
              {currentInvoices.map((invoice, index) => (
                <motion.tr
                  key={invoice.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -2 }}
                  className="border-b border-gray-100 hover:bg-[#76B947]/5 transition-colors"
                >
                  <td className="px-6 py-4 font-semibold text-gray-900">{invoice.id}</td>
                  <td className="px-6 py-4 text-[#2D5016] font-semibold">{invoice.amount}</td>
                  <td className="px-6 py-4 text-gray-500">{invoice.supplier}</td>
                  <td className="px-6 py-4 text-gray-500">{invoice.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      invoice.status === 'Payé' ? 'bg-[#76B947]/15 text-[#2D5016]' :
                      invoice.status === 'En attente' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-[#C41E3A]/15 text-[#8B1A2B]'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm px-4 py-2 rounded-lg shadow-sm">
                      Voir détails
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
            </AnimatePresence>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-100 flex items-center justify-between bg-gray-50">
          <p className="text-sm text-gray-600">
            Affiche {startIndex + 1} à {Math.min(endIndex, invoices.length)} sur {invoices.length} factures
          </p>
          <div className="flex gap-2">
            <Button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`${
                  currentPage === page
                    ? 'bg-gradient-to-r from-[#4A7C2E] to-[#2D5016] hover:from-[#2D5016] hover:to-[#4A7C2E] text-white'
                    : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700'
                } rounded-lg`}
              >
                {page}
              </Button>
            ))}
            <Button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AccountingPage;
