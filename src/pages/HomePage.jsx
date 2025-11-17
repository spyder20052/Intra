import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Users, 
  Calculator, 
  ShoppingCart, 
  FolderKanban, 
  TrendingUp, 
  MessageSquare, 
  Headphones,
  Building2,
  Calendar,
  Clock,
  ArrowRight,
  Award,
  Target,
  Sparkles
} from 'lucide-react';

const HomePage = ({ navigateToPage }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const news = [
    {
      id: 1,
      title: "Nouveau projet stratégique lancé",
      description: "Quality Corporate lance une initiative majeure pour digitaliser nos processus internes",
      date: "Il y a 2 heures",
      category: "Direction",
      color: "from-[#2D5016] to-[#1F3810]",
      icon: Building2
    },
    {
      id: 2,
      title: "Formation équipe commerciale",
      description: "Session de formation avancée sur les nouvelles techniques de vente prévue le 25 novembre",
      date: "Il y a 5 heures",
      category: "RH",
      color: "from-[#4A7C2E] to-[#2D5016]",
      icon: Users
    },
    {
      id: 3,
      title: "Résultats trimestriels exceptionnels",
      description: "Q3 2025 affiche une croissance de 23% par rapport à l'année précédente",
      date: "Hier",
      category: "Finance",
      color: "from-[#C41E3A] to-[#8B1A2B]",
      icon: TrendingUp
    }
  ];

  const departments = [
    {
      id: 'direction',
      name: 'Direction',
      icon: Building2,
      color: 'from-[#2D5016] to-[#1F3810]',
      description: 'Stratégie & Gouvernance',
      stats: '3 réunions'
    },
    {
      id: 'hr',
      name: 'Ressources Humaines',
      icon: Users,
      color: 'from-[#4A7C2E] to-[#356120]',
      description: 'Gestion du personnel',
      stats: '12 collaborateurs'
    },
    {
      id: 'accounting',
      name: 'Comptabilité',
      icon: Calculator,
      color: 'from-[#5FA142] to-[#4A7C2E]',
      description: 'Finance & Budget',
      stats: '5 rapports'
    },
    {
      id: 'purchasing',
      name: 'Achats',
      icon: ShoppingCart,
      color: 'from-[#76B947] to-[#5FA142]',
      description: 'Approvisionnements',
      stats: '8 commandes'
    },
    {
      id: 'projects',
      name: 'Projets',
      icon: FolderKanban,
      color: 'from-[#C41E3A] to-[#A01828]',
      description: 'Gestion de projets',
      stats: '6 en cours'
    },
    {
      id: 'commercial',
      name: 'Commercial',
      icon: TrendingUp,
      color: 'from-[#1A1A1A] to-[#0D0D0D]',
      description: 'Ventes & Développement',
      stats: '15 opportunités'
    },
    {
      id: 'communication',
      name: 'Communication',
      icon: MessageSquare,
      color: 'from-[#356120] to-[#2D5016]',
      description: 'Marketing & Communication',
      stats: '4 campagnes'
    },
    {
      id: 'it-support',
      name: 'Support IT',
      icon: Headphones,
      color: 'from-[#4A7C2E] to-[#2D5016]',
      description: 'Assistance technique',
      stats: '2 tickets'
    }
  ];

  const kpis = [
    {
      title: 'Taux de satisfaction',
      value: '94%',
      change: '+5%',
      trend: 'up',
      icon: Award,
      color: 'from-[#4A7C2E] to-[#356120]'
    },
    {
      title: 'Projets actifs',
      value: '12',
      change: '+3',
      trend: 'up',
      icon: Target,
      color: 'from-[#76B947] to-[#5FA142]'
    },
    {
      title: 'Productivité',
      value: '87%',
      change: '+12%',
      trend: 'up',
      icon: TrendingUp,
      color: 'from-[#C41E3A] to-[#8B1A2B]'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Bienvenue sur l'Intranet
            </h1>
            <p className="text-gray-600 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {currentTime.toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
              <span className="mx-2">•</span>
              <Clock className="w-4 h-4" />
              {currentTime.toLocaleTimeString('fr-FR', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Sparkles className="w-8 h-8 text-[#4A7C2E]" />
          </motion.div>
        </motion.div>

        {/* KPI Dashboard */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpis.map((kpi, index) => (
            <motion.div
              key={index}
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
              <p className="text-4xl font-bold">{kpi.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* News Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Bell className="w-6 h-6 text-[#4A7C2E]" />
                Actualités internes
              </h2>
              <button className="text-[#4A7C2E] hover:text-[#2D5016] font-medium text-sm flex items-center gap-1">
                Voir tout
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {news.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-100"
                >
                  <div className="flex items-start gap-4">
                    <div className={`bg-gradient-to-br ${item.color} rounded-xl p-3 text-white`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                        <span className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${item.color} text-white`}>
                          {item.category}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                      <div className="flex items-center text-xs text-gray-400">
                        <Clock className="w-3 h-3 mr-1" />
                        {item.date}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Access Sidebar */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Accès rapide</h2>
            <div className="bg-gradient-to-br from-[#2D5016] to-[#1F3810] rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Raccourcis utiles</h3>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl p-3 text-left transition-all flex items-center justify-between"
                  onClick={() => navigateToPage('profile')}
                >
                  <span>Mon profil</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl p-3 text-left transition-all flex items-center justify-between"
                >
                  <span>Mes documents</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl p-3 text-left transition-all flex items-center justify-between"
                >
                  <span>Calendrier</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#C41E3A] to-[#8B1A2B] rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Événement à venir</h3>
              <p className="text-sm text-white/90 mb-4">Réunion générale</p>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4" />
                <span>25 novembre 2025, 14h00</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Departments Grid */}
        <motion.div variants={itemVariants} className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Départements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {departments.map((dept, index) => (
              <motion.button
                key={dept.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigateToPage(dept.id)}
                className={`bg-gradient-to-br ${dept.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all text-left`}
              >
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 w-fit mb-4">
                  <dept.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg mb-1">{dept.name}</h3>
                <p className="text-white/80 text-sm mb-3">{dept.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    {dept.stats}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;