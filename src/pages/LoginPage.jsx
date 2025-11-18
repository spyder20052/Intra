import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur l'intranet de Quality Corporate",
      });
      setTimeout(() => onLogin('Direction'), 500);
    } else {
      toast({
        title: "Erreur",
        description: "Veuillez saisir votre e-mail et votre mot de passe",
        variant: "destructive",
      });
    }
  };

  const handleMicrosoftSSO = () => {
    toast({
      title: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine instruction ! 🚀",
    });
  };

  const handleForgotPassword = () => {
    toast({
      title: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine instruction ! 🚀",
    });
  };

  return (
    <div className="min-h-screen bg-[#EAF7FF] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-white rounded-[28px] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2"
      >
        {/* Left: Form */}
        <div className="p-8 sm:p-10 lg:p-12 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Bonjour <span className="inline-block">👋</span></h1>
              <p className="text-gray-500 mt-1">Comment commencer ? Connectez-vous pour accéder à l'intranet</p>
            </motion.div>

            {/* Social buttons */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <motion.button
                onClick={handleMicrosoftSSO}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 h-11 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 23 23" fill="none">
                  <path d="M11 11H0V0h11v11z" fill="#f25022"/>
                  <path d="M23 11H12V0h11v11z" fill="#00a4ef"/>
                  <path d="M11 23H0V12h11v11z" fill="#7fba00"/>
                  <path d="M23 23H12V12h11v11z" fill="#ffb900"/>
                </svg>
                <span className="text-sm font-medium text-gray-700">Sign in with Microsoft</span>
              </motion.button>
              <motion.button
                onClick={handleMicrosoftSSO}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 h-11 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm font-medium text-gray-700">Sign in with Google</span>
              </motion.button>
            </div>

            <div className="my-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs text-gray-500">ou se connecter avec e-mail</span>
              </div>
            </div>

            {/* Email */}
            <motion.form onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A7C2E]"
                  placeholder="ex: jean.dupont@qualitycorporate.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A7C2E]"
                  placeholder="Votre mot de passe"
                />
              </div>

              <div className="flex items-center justify-between -mt-1">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#4A7C2E] focus:ring-[#4A7C2E]" />
                  <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
                </label>
                <button type="button" onClick={handleForgotPassword} className="text-sm text-[#2D5016] hover:text-[#4A7C2E] font-medium">
                  Mot de passe oublié ?
                </button>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-12 rounded-full bg-gradient-to-r from-[#4A7C2E] to-[#2D5016] hover:from-[#2D5016] hover:to-[#4A7C2E] text-white font-semibold shadow-lg flex items-center justify-center gap-2"
              >
                Login
                <LogIn className="w-5 h-5" />
              </motion.button>
            </motion.form>

            <p className="text-center text-gray-500 text-sm mt-6">
              Pas encore de compte ? <button className="text-[#2D5016] hover:text-[#4A7C2E] font-medium">Demander un accès</button>
            </p>
          </div>
        </div>

        {/* Right: Visual Panel */}
        <div className="relative hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-[#4A7C2E] to-[#2D5016]" />
          {/* Wavy Pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="waves" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M0 40 Q 20 10 40 40 T 80 40" fill="none" stroke="white" strokeWidth="8" strokeLinecap="round" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#waves)" />
          </svg>

          <div className="relative z-10 h-full flex items-center justify-center p-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="w-[82%] bg-white/10 backdrop-blur-xl rounded-[28px] p-10 shadow-2xl relative">
              <div className="grid grid-cols-12 gap-6 items-center">
                <div className="col-span-6 text-white">
                  <h3 className="text-[34px] leading-tight font-extrabold">
                    <span className="block">De très belles</span>
                    <span className="block">œuvres vous</span>
                    <span className="block">attendent</span>
                  </h3>
                  <div className="mt-5 flex items-center gap-3 text-white/90">
                    <span className="text-2xl">✌️</span>
                    <span className="text-lg">Au travail</span>
                  </div>
                </div>
                <div className="col-span-6 flex items-center justify-center">
                  <div className="rounded-[22px] overflow-hidden border border-white/25 shadow-2xl bg-white/5">
                    <img src="/images/login.png" alt="Welcome" className="w-60 h-80 object-cover" />
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div className="absolute -left-6 bottom-8 bg-white rounded-full p-3 shadow-xl" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
                <span className="text-[#4A7C2E]">⭐</span>
              </motion.div>
              <motion.div className="absolute -right-6 top-10 bg-white rounded-full p-3 shadow-xl" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
                <span className="text-[#4A7C2E]">💯</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <p className="absolute bottom-4 text-center text-gray-600 text-sm">© 2025 Quality Corporate. Tous droits réservés.</p>
    </div>
  );
};

export default LoginPage;