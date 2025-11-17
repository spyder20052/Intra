
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import { 
  AlertTriangle, Plus, Filter, ChevronDown, CheckCircle, Clock, XCircle, FileText, Download, MoreVertical,
  DollarSign, BarChart2, Calendar, User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

// Sample Data
const criticalAlertsData = [
    { id: 1, type: 'Budget dépassé', project: 'Projet Phoenix', message: 'Le budget alloué est dépassé de 15%.', icon: AlertTriangle },
    { id: 2, type: 'Échéance proche', project: 'Migration Cloud', message: 'La deadline est dans moins de 3 jours.', icon: Clock },
    { id: 3, type: 'DAO manquant', project: 'Refonte CRM', message: 'Le DAO pour le fournisseur principal n\'est pas signé.', icon: FileText },
    { id: 4, type: 'Tâche bloquée', project: 'Projet Phoenix', message: 'Déploiement en attente de validation sécurité.', icon: XCircle },
];

const daoData = [
    { id: 'DAO-023', project: 'Projet Phoenix', available: 5, signed: 4, processed: 3, status: 'En cours' },
    { id: 'DAO-024', project: 'Migration Cloud', available: 2, signed: 2, processed: 2, status: 'Terminé' },
    { id: 'DAO-025', project: 'Refonte CRM', available: 8, signed: 3, processed: 1, status: 'Bloqué' },
    { id: 'DAO-026', project: 'Déploiement ERP', available: 12, signed: 12, processed: 10, status: 'En cours' },
];

const projectsData = {
    todo: [
        { id: 1, title: 'Planification phase 2 - Phoenix', responsible: 'C. Durand', deadline: '2025-12-10', priority: 'haute', budget: '5k €' },
    ],
    inProgress: [
        { id: 2, title: 'Développement API - Refonte CRM', responsible: 'A. Martin', deadline: '2025-11-30', priority: 'haute', budget: '25k €' },
        { id: 3, title: 'Tests unitaires - Migration Cloud', responsible: 'L. Petit', deadline: '2025-12-05', priority: 'moyenne', budget: '8k €' },
    ],
    done: [
        { id: 4, title: 'Audit de sécurité initial - Phoenix', responsible: 'C. Durand', deadline: '2025-11-10', priority: 'haute', budget: '3k €' },
    ]
};

const expensesData = [
    { id: 1, date: '2025-11-15', description: 'Licences logicielles', amount: 2500, project: 'Refonte CRM', status: 'Approuvée' },
    { id: 2, date: '2025-11-12', description: 'Serveurs de test', amount: 1200, project: 'Migration Cloud', status: 'Approuvée' },
    { id: 3, date: '2025-11-10', description: 'Consultant externe', amount: 3000, project: 'Projet Phoenix', status: 'En attente' },
    { id: 4, date: '2025-11-08', description: 'Frais de déplacement', amount: 450, project: 'Refonte CRM', status: 'Rejetée' },
];

const financingData = { total: 250000, spent: 112500 };

const AnimatedCounter = ({ to }) => {
    const nodeRef = useRef();
    const isInView = useInView(nodeRef, { once: true });

    useEffect(() => {
        if (isInView) {
            const node = nodeRef.current;
            const controls = animate(0, to, {
                duration: 1.5,
                onUpdate(value) {
                    node.textContent = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
                },
            });
            return () => controls.stop();
        }
    }, [to, isInView]);

    return <span ref={nodeRef}>0,00 €</span>;
};


const ProjectsPage = () => {
    const { toast } = useToast();
    const [alerts, setAlerts] = useState(criticalAlertsData);

    const handleAction = (message) => {
        toast({
            title: "Action déclenchée",
            description: message,
        });
    };
    
    const resolveAlert = (id) => {
        setAlerts(prev => prev.filter(a => a.id !== id));
        toast({
            title: "Alerte résolue",
            description: "L'alerte a été marquée comme résolue.",
        });
    };

    const priorityStyles = {
        haute: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-500' },
        moyenne: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-500' },
        basse: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-500' },
    };
    
    const daoStatusStyles = {
        'En cours': 'bg-blue-100 text-blue-800',
        'Terminé': 'bg-green-100 text-green-800',
        'Bloqué': 'bg-red-100 text-red-800',
    };
    
    const expenseStatusStyles = {
        'Approuvée': 'bg-green-100 text-green-800',
        'En attente': 'bg-yellow-100 text-yellow-800',
        'Rejetée': 'bg-red-100 text-red-800',
    };

    const remainingBudget = financingData.total - financingData.spent;
    const spentPercentage = (financingData.spent / financingData.total) * 100;

    return (
        <div className="space-y-8">
            {/* Header & Filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900">Projets & Opérations</h1>
                    <p className="text-gray-600">Vue d'ensemble pour DPTM/DPIS/DPES</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl"><Filter className="w-4 h-4 mr-2" />Filtres <ChevronDown className="w-4 h-4 ml-2" /></Button>
                    <Button className="bg-gradient-to-r from-[#4A7C2E] to-[#2D5016] hover:from-[#2D5016] hover:to-[#4A7C2E] text-white rounded-xl"><Plus className="w-4 h-4 mr-2" />Nouveau Projet</Button>
                </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total projets', value: Object.values(projectsData).reduce((a, b) => a + b.length, 0), color: 'from-[#4A7C2E] to-[#2D5016]' },
                    { label: 'En cours', value: projectsData.inProgress.length, color: 'from-[#76B947] to-[#4A7C2E]' },
                    { label: 'À faire', value: projectsData.todo.length, color: 'from-[#2D5016] to-[#1F3810]' },
                    { label: 'Terminés', value: projectsData.done.length, color: 'from-[#C41E3A] to-[#8B1A2B]' },
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
                            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1 text-sm">{idx === 0 ? '+2%' : 'MAJ'}</div>
                        </div>
                        <h3 className="text-white/80 text-sm font-medium">{kpi.label}</h3>
                        <p className="text-3xl font-bold">{kpi.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Critical Alerts */}
            <AnimatePresence>
                {alerts.length > 0 && (
                    <motion.section 
                        layout 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                    >
                        <h2 className="text-xl font-bold text-[#1B2C4A]">Alertes critiques</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {alerts.map((alert, index) => (
                                <motion.div 
                                    key={alert.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-white p-4 rounded-2xl shadow-lg border-l-4 border-[#DC143C]"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="text-[#DC143C] mt-1"><alert.icon className="w-5 h-5" /></div>
                                        <div>
                                            <p className="font-bold text-[#1B2C4A]">{alert.type} - {alert.project}</p>
                                            <p className="text-sm text-gray-600 mb-3">{alert.message}</p>
                                            <Button onClick={() => resolveAlert(alert.id)} size="sm" className="bg-[#DC143C]/10 text-[#DC143C] hover:bg-[#DC143C]/20">Résoudre</Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* DAO Management */}
            <section className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Gestion des DAO</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 text-gray-700">
                            <tr>
                                <th className="p-3">Projet</th>
                                <th className="p-3 text-center">DAO Disponibles</th>
                                <th className="p-3 text-center">DAO Signées</th>
                                <th className="p-3 text-center">DAO Traitées</th>
                                <th className="p-3">Statut</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {daoData.map(dao => (
                                <tr key={dao.id} className="border-b hover:bg-[#76B947]/5 transition-colors">
                                    <td className="p-3 font-medium text-gray-900">{dao.project}</td>
                                    <td className="p-3 text-center font-semibold">{dao.available}</td>
                                    <td className="p-3 text-center font-semibold">{dao.signed}</td>
                                    <td className="p-3 text-center font-semibold">{dao.processed}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${daoStatusStyles[dao.status]}`}>{dao.status}</span>
                                    </td>
                                    <td className="p-3">
                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleAction(`Voir détails de ${dao.id}`)}><MoreVertical className="w-4 h-4 text-gray-500" /></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Project Kanban */}
            <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Suivi des Projets</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Object.entries(projectsData).map(([status, tasks]) => (
                        <div key={status} className="bg-gray-100 rounded-2xl p-4 space-y-4">
                            <h3 className="font-bold text-lg text-gray-900 capitalize">{status.replace('inProgress', 'En cours').replace('todo', 'À faire').replace('done', 'Terminé')} <span className="text-gray-400 font-normal text-sm">({tasks.length})</span></h3>
                            {tasks.map((task, index) => (
                                <motion.div 
                                    key={task.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`bg-white rounded-2xl shadow-md p-4 space-y-3 border-l-4 ${priorityStyles[task.priority].border}`}
                                >
                                    <p className="font-bold text-gray-900">{task.title}</p>
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2 text-gray-500"><User className="w-4 h-4" /> {task.responsible}</div>
                                        <div className="flex items-center gap-2 text-gray-500"><Calendar className="w-4 h-4" /> {task.deadline}</div>
                                    </div>
                                    <div className="flex items-center justify-between pt-2 border-t">
                                        <span className="text-sm font-semibold text-gray-600">{task.budget}</span>
                                        <span className={`px-2 py-1 text-xs font-bold rounded-full capitalize ${priorityStyles[task.priority].bg} ${priorityStyles[task.priority].text}`}>{task.priority}</span>
                                    </div>
                                </motion.div>
                            ))}
                            <Button variant="ghost" className="w-full text-gray-600 hover:bg-gray-200"><Plus className="w-4 h-4 mr-2" />Ajouter une tâche</Button>
                        </div>
                    ))}
                </div>
            </section>
            
            {/* Expenses and Missions */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900">Dépenses & Missions</h2>
                        <Button className="bg-gradient-to-r from-[#4A7C2E] to-[#2D5016] hover:from-[#2D5016] hover:to-[#4A7C2E] text-white rounded-xl" onClick={() => handleAction('Ouverture du modal de dépense')}><Plus className="w-4 h-4 mr-2" />Nouvelle Dépense</Button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 text-gray-700">
                                <tr>
                                    <th className="p-3">Date</th>
                                    <th className="p-3">Description</th>
                                    <th className="p-3">Projet</th>
                                    <th className="p-3 text-right">Montant</th>
                                    <th className="p-3 text-center">Statut</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expensesData.map(expense => (
                                    <tr key={expense.id} className="border-b hover:bg-[#76B947]/5 transition-colors">
                                        <td className="p-3 text-gray-600">{expense.date}</td>
                                        <td className="p-3 font-medium text-gray-900">{expense.description}</td>
                                        <td className="p-3 text-gray-600">{expense.project}</td>
                                        <td className="p-3 text-right font-semibold">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(expense.amount)}</td>
                                        <td className="p-3 text-center">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${expenseStatusStyles[expense.status]}`}>{expense.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col justify-between">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Historique des financements</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500">Budget Total</p>
                            <p className="text-2xl font-bold text-gray-900"><AnimatedCounter to={financingData.total} /></p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Dépensé</p>
                            <p className="text-2xl font-bold text-[#DC143C]"><AnimatedCounter to={financingData.spent} /></p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Restant</p>
                            <p className="text-2xl font-bold text-[#2D5016]"><AnimatedCounter to={remainingBudget} /></p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
                            <span>Progression</span>
                            <span>{spentPercentage.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <motion.div 
                                className="bg-gradient-to-r from-[#76B947] to-[#2D5016] h-2.5 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${spentPercentage}%` }}
                                transition={{ duration: 1.5, ease: 'easeOut' }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProjectsPage;
