
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Search, Check, X, Package, Truck, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const PurchasingPage = () => {
  const { toast } = useToast();

  const purchaseRequests = [
    { id: 'DA-001', product: 'Chaises de bureau (x20)', quantity: 20, requester: 'Département RH', date: '2025-11-15', status: 'En transit', progress: 75 },
    { id: 'DA-002', product: 'Ordinateurs portables (x5)', quantity: 5, requester: 'Département IT', date: '2025-11-14', status: 'En attente d\'approbation', progress: 25 },
    { id: 'DA-003', product: 'Fournitures imprimante', quantity: 50, requester: 'Admin', date: '2025-11-13', status: 'Livré', progress: 100 },
    { id: 'DA-004', product: 'Équipement salle de conf.', quantity: 1, requester: 'Direction', date: '2025-11-12', status: 'En traitement', progress: 50 },
    { id: 'DA-005', product: 'Licences logicielles (x10)', quantity: 10, requester: 'Département IT', date: '2025-11-11', status: 'En attente d\'approbation', progress: 10 },
  ];

  const handleValidate = (id) => {
    toast({
      title: "Demande validée",
      description: `La demande d'achat ${id} a été approuvée.`,
    });
  };

  const handleRefuse = (id) => {
    toast({
      title: "Demande refusée",
      description: `La demande d'achat ${id} a été rejetée.`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-1">Achats & Logistique</h1>
          <p className="text-gray-600">Gérez les demandes d'achat et suivez les livraisons</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[ 
          { label: 'Total demandes', value: purchaseRequests.length, Icon: ClipboardList, color: 'from-[#4A7C2E] to-[#2D5016]' },
          { label: 'En attente d\'approbation', value: purchaseRequests.filter(r => r.status.includes('approbation')).length, Icon: Package, color: 'from-[#76B947] to-[#4A7C2E]' },
          { label: 'Livrées ce mois', value: purchaseRequests.filter(r => r.status === 'Livré').length, Icon: Truck, color: 'from-[#2D5016] to-[#1F3810]' },
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

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Rechercher des demandes d'achat..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A7C2E] focus:border-transparent transition-all"
        />
      </div>

      {/* Purchase Requests */}
      <div className="space-y-4">
        {purchaseRequests.map((request, index) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.01 }}
            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4A7C2E] to-[#2D5016] flex items-center justify-center text-white shadow-md">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1 text-gray-900">{request.product}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                    <span>ID: {request.id}</span>
                    <span>Qté: {request.quantity}</span>
                    <span>Demandeur: {request.requester}</span>
                    <span>Date: {request.date}</span>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                request.status === 'Livré' ? 'bg-[#76B947]/15 text-[#2D5016]' :
                request.status === 'En transit' ? 'bg-blue-100 text-blue-800' :
                request.status === 'En traitement' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-600'
              }`}>
                {request.status}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Progression de la livraison</span>
                <span className="text-sm font-semibold text-[#2D5016]">{request.progress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${request.progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.1 }}
                  className="h-full bg-gradient-to-r from-[#4A7C2E] to-[#2D5016] rounded-full"
                />
              </div>
            </div>

            {/* Actions */}
            {request.status === 'En attente d\'approbation' && (
              <div className="flex gap-2">
                <Button
                  onClick={() => handleValidate(request.id)}
                  className="bg-gradient-to-r from-[#4A7C2E] to-[#2D5016] hover:from-[#2D5016] hover:to-[#4A7C2E] text-white flex items-center gap-2 rounded-lg"
                >
                  <Check className="w-4 h-4" />
                  Valider
                </Button>
                <Button
                  onClick={() => handleRefuse(request.id)}
                  className="bg-gradient-to-r from-[#C41E3A] to-[#8B1A2B] hover:from-[#8B1A2B] hover:to-[#C41E3A] text-white flex items-center gap-2 rounded-lg"
                >
                  <X className="w-4 h-4" />
                  Refuser
                </Button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PurchasingPage;
