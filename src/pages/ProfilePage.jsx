
import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Briefcase, Building, Calendar, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ProfilePage = () => {
  const { toast } = useToast();

  const userInfo = {
    name: 'John Doe',
    email: 'john.doe@qualitycorporate.com',
    position: 'Manager de Direction',
    department: 'Direction',
    joinDate: '2020-03-15',
    phone: '+33 6 12 34 56 78',
  };

  const requestHistory = [
    { type: 'Demande de congé', date: '2025-11-10', status: 'Approuvée' },
    { type: 'Support IT', date: '2025-11-05', status: 'Résolue' },
    { type: 'Demande d\'achat', date: '2025-10-28', status: 'Approuvée' },
    { type: 'Demande de congé', date: '2025-10-15', status: 'Approuvée' },
  ];

  const handleEdit = () => {
    toast({
      title: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine instruction ! 🚀",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-1 text-gray-900">Mon Profil</h1>
        <p className="text-gray-600">Gérez vos informations personnelles et consultez votre activité</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="lg:col-span-1 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow"
        >
          <div className="text-center mb-6">
            <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-[#4A7C2E] to-[#2D5016] text-white flex items-center justify-center text-4xl font-bold mx-auto mb-4 shadow-md">JD</div>
            <h2 className="text-2xl font-bold mb-1 text-gray-900">{userInfo.name}</h2>
            <p className="text-gray-500">{userInfo.position}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-500">
              <Mail className="w-5 h-5 text-[#4A7C2E]" />
              <span className="text-sm">{userInfo.email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              <Briefcase className="w-5 h-5 text-[#4A7C2E]" />
              <span className="text-sm">{userInfo.position}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              <Building className="w-5 h-5 text-[#4A7C2E]" />
              <span className="text-sm">{userInfo.department}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              <Calendar className="w-5 h-5 text-[#4A7C2E]" />
              <span className="text-sm">Membre depuis le {userInfo.joinDate}</span>
            </div>
          </div>

          <Button onClick={handleEdit} className="w-full mt-6 bg-gradient-to-r from-[#4A7C2E] to-[#2D5016] hover:from-[#2D5016] hover:to-[#4A7C2E] text-white flex items-center justify-center gap-2 rounded-xl shadow-lg">
            <Edit className="w-4 h-4" />
            Modifier le profil
          </Button>
        </motion.div>

        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Informations Personnelles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Nom complet", value: userInfo.name },
              { label: "Adresse e-mail", value: userInfo.email },
              { label: "N° de téléphone", value: userInfo.phone },
              { label: "Département", value: userInfo.department },
              { label: "Poste", value: userInfo.position },
              { label: "Date d'arrivée", value: userInfo.joinDate },
            ].map((field, index) => (
               <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 + 0.2 }}
               >
                <label className="block text-sm font-medium text-gray-500 mb-2">{field.label}</label>
                <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900">
                  {field.value}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Request History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-lg"
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Historique des demandes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Type de demande</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Date</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Statut</th>
              </tr>
            </thead>
            <tbody>
              {requestHistory.map((request, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="border-b border-gray-100 hover:bg-[#76B947]/5 transition-colors"
                >
                  <td className="px-6 py-4 text-gray-900">{request.type}</td>
                  <td className="px-6 py-4 text-gray-500">{request.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      request.status === 'Approuvée' || request.status === 'Résolue'
                        ? 'bg-[#76B947]/15 text-[#2D5016]'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {request.status}
                    </span>
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

export default ProfilePage;
