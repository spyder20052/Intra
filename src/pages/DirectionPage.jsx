import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts';
import { 
  Edit, Save, Search, Shield, ChevronLeft, ChevronRight, 
  ArrowUpDown, TrendingUp, Target, Award, Users, 
  CheckCircle2, XCircle, Filter, Download
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Sample Data
const revenueData = [
  { name: 'Jan', revenue: 4000 }, { name: 'Fév', revenue: 3000 }, { name: 'Mar', revenue: 5000 },
  { name: 'Avr', revenue: 4500 }, { name: 'Mai', revenue: 6000 }, { name: 'Juin', revenue: 5500 },
  { name: 'Juil', revenue: 6500 }, { name: 'Août', revenue: 7000 }, { name: 'Sep', revenue: 7500 },
  { name: 'Oct', revenue: 8000 }, { name: 'Nov', revenue: 9000 },
];

const departmentPerformanceData = [
  { name: 'DAL', performance: 85 }, { name: 'DCM', performance: 92 }, 
  { name: 'Finance', performance: 78 }, { name: 'RH', performance: 88 }, 
  { name: 'IT', performance: 95 }, { name: 'Projets', performance: 90 },
];

const projectStatusData = [
  { name: 'En cours', value: 40 }, 
  { name: 'Terminé', value: 30 }, 
  { name: 'En attente', value: 20 }, 
  { name: 'Bloqué', value: 10 }
];

const COLORS = { 
  'En cours': '#4A7C2E', 
  'Terminé': '#2D5016', 
  'En attente': '#76B947', 
  'Bloqué': '#C41E3A' 
};

const initialEmployees = [
  { id: 1, name: 'Alice Johnson', department: 'RH', roles: ['Manager'], email: 'alice.j@qualitycorporate.com', access: { Projets: true, DAL: false, DCM: false, Finance: true, RH: true, IT: false, Direction: false } },
  { id: 2, name: 'Bob Smith', department: 'IT', roles: ['Développeur Senior'], email: 'bob.s@qualitycorporate.com', access: { Projets: true, DAL: false, DCM: false, Finance: false, RH: false, IT: true, Direction: false } },
  { id: 3, name: 'Carol White', department: 'Finance', roles: ['Analyste'], email: 'carol.w@qualitycorporate.com', access: { Projets: false, DAL: true, DCM: true, Finance: true, RH: false, IT: false, Direction: false } },
  { id: 4, name: 'David Brown', department: 'DCM', roles: ['Responsable Commercial'], email: 'david.b@qualitycorporate.com', access: { Projets: true, DAL: true, DCM: true, Finance: true, RH: false, IT: false, Direction: true } },
  { id: 5, name: 'Emma Davis', department: 'Projets', roles: ['Chef de projet'], email: 'emma.d@qualitycorporate.com', access: { Projets: true, DAL: true, DCM: false, Finance: false, RH: false, IT: true, Direction: false } },
  { id: 6, name: 'Frank Miller', department: 'DAL', roles: ['Logisticien'], email: 'frank.m@qualitycorporate.com', access: { Projets: false, DAL: true, DCM: false, Finance: false, RH: false, IT: false, Direction: false } },
  { id: 7, name: 'Grace Wilson', department: 'Direction', roles: ['Directrice Générale'], email: 'grace.w@qualitycorporate.com', access: { Projets: true, DAL: true, DCM: true, Finance: true, RH: true, IT: true, Direction: true } },
  { id: 8, name: 'Henry Moore', department: 'IT', roles: ['Administrateur Système'], email: 'henry.m@qualitycorporate.com', access: { Projets: false, DAL: false, DCM: false, Finance: false, RH: false, IT: true, Direction: false } },
];

const modules = ['Projets', 'DAL', 'DCM', 'Finance', 'RH', 'IT', 'Direction'];
const ROWS_PER_PAGE = 6;

const DirectionPage = () => {
  const { toast } = useToast();
  const [employees, setEmployees] = useState(initialEmployees);
  const [editingId, setEditingId] = useState(null);
  const [tempAccess, setTempAccess] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('Tous');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);

  const kpis = [
    { 
      title: 'Chiffre d\'affaires', 
      value: '9.0M€', 
      change: '+12.5%', 
      icon: TrendingUp,
      color: 'from-[#4A7C2E] to-[#2D5016]'
    },
    { 
      title: 'Projets actifs', 
      value: '24', 
      change: '+3', 
      icon: Target,
      color: 'from-[#76B947] to-[#4A7C2E]'
    },
    { 
      title: 'Performance moyenne', 
      value: '88%', 
      change: '+5%', 
      icon: Award,
      color: 'from-[#2D5016] to-[#1F3810]'
    },
    { 
      title: 'Employés actifs', 
      value: initialEmployees.length, 
      change: '+2', 
      icon: Users,
      color: 'from-[#C41E3A] to-[#8B1A2B]'
    },
  ];

  const handleEdit = (employee) => {
    setEditingId(employee.id);
    setTempAccess(employee.access);
  };

  const handleSave = (id) => {
    setEmployees(employees.map(emp => emp.id === id ? { ...emp, access: tempAccess } : emp));
    setEditingId(null);
    toast({
      title: "✅ Permissions mises à jour",
      description: `Les accès pour ${employees.find(e => e.id === id).name} ont été sauvegardés.`,
    });
  };

  const handleAccessChange = (module, checked) => {
    setTempAccess(prev => ({ ...prev, [module]: checked }));
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = departmentFilter === 'Tous' || emp.department === departmentFilter;
      return matchesSearch && matchesDepartment;
    });
  }, [employees, searchTerm, departmentFilter]);

  const sortedEmployees = useMemo(() => {
    const sortableItems = [...filteredEmployees];
    sortableItems.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    return sortableItems;
  }, [filteredEmployees, sortConfig]);

  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    return sortedEmployees.slice(startIndex, startIndex + ROWS_PER_PAGE);
  }, [sortedEmployees, currentPage]);

  const totalPages = Math.ceil(sortedEmployees.length / ROWS_PER_PAGE);
  const departments = ['Tous', ...new Set(employees.map(e => e.department))];

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-4xl font-bold text-gray-900">Tableau de Bord Direction</h1>
        <p className="text-gray-600">Vue stratégique et gestion des permissions d'accès</p>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03, y: -5 }}
            className={`bg-gradient-to-br ${kpi.color} rounded-2xl p-6 text-white shadow-lg`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <kpi.icon className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
                <TrendingUp className="w-4 h-4" />
                {kpi.change}
              </div>
            </div>
            <h3 className="text-white/80 text-sm font-medium mb-2">{kpi.title}</h3>
            <p className="text-3xl font-bold">{kpi.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <section>
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold text-gray-900 mb-6"
        >
          Vue Stratégique
        </motion.h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Évolution du CA (k€)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB' }}
                  labelStyle={{ color: '#1F2937', fontWeight: 'bold' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#4A7C2E" 
                  strokeWidth={3} 
                  dot={{ fill: '#4A7C2E', r: 4 }} 
                  activeDot={{ r: 6, fill: '#2D5016' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Performance Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Départements (%)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={departmentPerformanceData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB' }}
                  labelStyle={{ color: '#1F2937', fontWeight: 'bold' }}
                />
                <Bar dataKey="performance" fill="#4A7C2E" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Project Status Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Statut des Projets</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB' }}
                />
                <Pie 
                  data={projectStatusData} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={80}
                  label={(entry) => `${entry.name}: ${entry.value}%`}
                  labelLine={false}
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                  ))}
                </Pie>
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </section>

      {/* Permissions Management */}
      <section>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Gestion des Permissions</h2>
            <p className="text-gray-600 mt-1">Attribuez et modifiez les accès aux modules de l'intranet</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm"
            >
              <Download className="w-4 h-4" />
              Exporter
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2.5 bg-gradient-to-r from-[#4A7C2E] to-[#2D5016] text-white rounded-xl hover:from-[#2D5016] hover:to-[#4A7C2E] transition-all flex items-center gap-2 shadow-lg"
            >
              <Shield className="w-4 h-4" />
              Sauvegarder tout
            </motion.button>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher par nom, département ou email..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4A7C2E] focus:border-transparent transition-all text-gray-900"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={departmentFilter}
              onChange={(e) => { setDepartmentFilter(e.target.value); setCurrentPage(1); }}
              className="pl-12 pr-8 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4A7C2E] focus:border-transparent transition-all appearance-none cursor-pointer text-gray-900"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="p-4 text-left font-semibold text-gray-700">Employé</th>
                  <th 
                    className="p-4 text-left font-semibold text-gray-700 cursor-pointer hover:text-[#4A7C2E] transition-colors"
                    onClick={() => handleSort('department')}
                  >
                    <div className="flex items-center gap-2">
                      Service 
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="p-4 text-left font-semibold text-gray-700">Rôles</th>
                  {modules.map(mod => (
                    <th key={mod} className="p-4 text-center font-semibold text-gray-700">
                      {mod}
                    </th>
                  ))}
                  <th className="p-4 text-center font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {paginatedEmployees.map((emp, index) => (
                    <motion.tr
                      key={emp.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-t border-gray-100 hover:bg-[#76B947]/5 transition-colors"
                    >
                      <td className="p-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 bg-gradient-to-br from-[#4A7C2E] to-[#2D5016] rounded-xl flex items-center justify-center font-semibold text-white shadow-md">
                            {getInitials(emp.name)}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{emp.name}</div>
                            <div className="text-xs text-gray-500">{emp.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-gray-700 whitespace-nowrap">
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium">
                          {emp.department}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600 whitespace-nowrap text-sm">
                        {emp.roles.join(', ')}
                      </td>
                      {modules.map(mod => (
                        <td key={mod} className="p-4 text-center">
                          <div className="flex justify-center">
                            {editingId === emp.id ? (
                              <motion.input
                                whileHover={{ scale: 1.1 }}
                                type="checkbox"
                                checked={tempAccess[mod]}
                                onChange={(e) => handleAccessChange(mod, e.target.checked)}
                                className="h-5 w-5 rounded border-gray-300 text-[#4A7C2E] focus:ring-[#4A7C2E] cursor-pointer"
                              />
                            ) : (
                              emp.access[mod] ? (
                                <CheckCircle2 className="w-5 h-5 text-[#4A7C2E]" />
                              ) : (
                                <XCircle className="w-5 h-5 text-gray-300" />
                              )
                            )}
                          </div>
                        </td>
                      ))}
                      <td className="p-4 text-center whitespace-nowrap">
                        {editingId === emp.id ? (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSave(emp.id)}
                            className="px-4 py-2 bg-gradient-to-r from-[#4A7C2E] to-[#2D5016] text-white rounded-lg hover:from-[#2D5016] hover:to-[#4A7C2E] transition-all flex items-center gap-2 text-sm shadow-md mx-auto"
                          >
                            <Save className="w-4 h-4" />
                            Sauvegarder
                          </motion.button>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleEdit(emp)}
                            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2 text-sm shadow-sm mx-auto"
                          >
                            <Edit className="w-4 h-4" />
                            Modifier
                          </motion.button>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
            <span className="text-sm text-gray-600">
              Affichage {((currentPage - 1) * ROWS_PER_PAGE) + 1} à {Math.min(currentPage * ROWS_PER_PAGE, sortedEmployees.length)} sur {sortedEmployees.length} employés
            </span>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Précédent
              </motion.button>
              <span className="px-4 py-2 text-sm font-medium text-gray-700">
                Page {currentPage} / {totalPages}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                Suivant
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default DirectionPage;