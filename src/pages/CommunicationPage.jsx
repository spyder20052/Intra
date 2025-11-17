
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Plus, Calendar, User, Megaphone, Layers, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const CommunicationPage = () => {
  const { toast } = useToast();

  const news = [
    {
      id: 1,
      title: 'L\'entreprise atteint une performance record au T4',
      excerpt: 'Nous sommes ravis d\'annoncer que Quality Corporate a dépassé toutes les attentes ce trimestre avec une croissance remarquable...',
      author: 'La Direction',
      date: '2025-11-15',
      category: 'Actualités',
    },
    {
      id: 2,
      title: 'Lancement du nouveau programme de bien-être',
      excerpt: 'Dès le mois prochain, tous les employés auront accès à notre programme de bien-être complet, incluant abonnements de sport, soutien psychologique...',
      author: 'Département RH',
      date: '2025-11-12',
      category: 'Avantages',
    },
    {
      id: 3,
      title: 'Mise à jour projet d\'agrandissement des bureaux',
      excerpt: 'La rénovation et l\'agrandissement de notre siège social avancent plus vite que prévu. Les nouveaux espaces de collaboration seront prêts d\'ici décembre...',
      author: 'Équipe Installations',
      date: '2025-11-10',
      category: 'Infrastructure',
    },
    {
      id: 4,
      title: 'Événement de Team Building - Réservez la date',
      excerpt: 'Notez dans vos agendas ! Notre séminaire annuel de team building est prévu du 15 au 17 décembre. Cette année, nous partons à la montagne pour une aventure...',
      author: 'Comité Événementiel',
      date: '2025-11-08',
      category: 'Événements',
    },
    {
      id: 5,
      title: 'Implémentation de la nouvelle stack technologique',
      excerpt: 'Le département IT déploie notre nouvelle infrastructure technologique. Des sessions de formation seront programmées pour tous les départements...',
      author: 'Département IT',
      date: '2025-11-05',
      category: 'Technologie',
    },
    {
      id: 6,
      title: 'Cérémonie de reconnaissance des employés',
      excerpt: 'Rejoignez-nous pour célébrer nos collaborateurs exceptionnels lors de la cérémonie trimestrielle. Les nominations sont ouvertes pour l\'Employé du Trimestre...',
      author: 'La Direction',
      date: '2025-11-03',
      category: 'Reconnaissance',
    },
  ];

  const handlePublish = () => {
    toast({
      title: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine instruction ! 🚀",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-1">Communication Interne</h1>
          <p className="text-gray-600">Actualités et annonces de l'entreprise</p>
        </div>
        <Button onClick={handlePublish} className="bg-gradient-to-r from-[#4A7C2E] to-[#2D5016] hover:from-[#2D5016] hover:to-[#4A7C2E] text-white flex items-center gap-2 rounded-xl shadow-lg">
          <Plus className="w-5 h-5" />
          Publier une actualité
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total articles', value: news.length, Icon: Layers, color: 'from-[#4A7C2E] to-[#2D5016]' },
          { label: 'Catégories', value: new Set(news.map(n => n.category)).size, Icon: Sparkles, color: 'from-[#76B947] to-[#4A7C2E]' },
          { label: 'Dernière semaine', value: news.filter(n => true).slice(0, 3).length, Icon: Megaphone, color: 'from-[#2D5016] to-[#1F3810]' },
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

      {/* News Wall */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article, index) => (
          <motion.article
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group cursor-pointer"
          >
            <div className="h-48 bg-gradient-to-br from-[#4A7C2E]/10 to-white flex items-center justify-center relative overflow-hidden">
              <MessageSquare className="w-20 h-20 text-[#4A7C2E]/30" />
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full text-xs font-semibold text-[#2D5016]">
                  {article.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h2 className="font-bold text-xl mb-3 text-gray-900 group-hover:text-[#2D5016] transition-colors">
                {article.title}
              </h2>
              <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{article.date}</span>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default CommunicationPage;
