import React from 'react';
import { 
  School, 
  Users, 
  ArrowRight, 
  ArrowLeft,
  Briefcase,
  GraduationCap,
  ShieldAlert,
  HelpCircle,
  UserPlus
} from 'lucide-react';

interface PortalPageProps {
  onBackToLanding: () => void;
  onSelectRoleSelection: () => void;
  onSelectParentLogin: () => void;
  onSelectRegistrationChoice: () => void;
}

export default function PortalPage({
  onBackToLanding,
  onSelectRoleSelection,
  onSelectParentLogin,
  onSelectRegistrationChoice
}: PortalPageProps) {
  return (
    <div id="portal-root" className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans relative overflow-hidden flex flex-col justify-between">
      
      {/* Background radial effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Header */}
      <header id="portal-header" className="border-b border-slate-800 bg-[#0d1326] px-4 py-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={onBackToLanding}>
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <School className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              OTO School
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={onBackToLanding}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retour au site</span>
            </button>
            
            {/* Inscription Button in header */}
            <button 
              onClick={onSelectRegistrationChoice}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-blue-500/10"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Inscription</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main explanation content and 2 CONTAINERS */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col justify-center gap-12">
        
        {/* Short explanation of the platform in the body */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-2xs font-bold uppercase tracking-wider">
            <span>Portail d'Hébergement Web</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Bienvenue sur l'Espace Numérique OTO School
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Notre plateforme web sécurisée fluidifie la répartition du travail académique pour l'administration et fournit aux parents un tableau de suivi journalier des devoirs, notes et assiduité en classe.
          </p>
        </div>

        {/* 2 CONTAINERS matching the layout of image 3 */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
          
          {/* CONTAINER 1: ESPACE ACADÉMIE */}
          <div className="bg-[#161d31] rounded-2xl border border-slate-800/80 p-8 flex flex-col justify-between shadow-xl shadow-slate-950/30 hover:shadow-blue-500/5 hover:border-slate-700 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/5 rounded-full pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>

            <div className="space-y-6 text-center">
              <div className="w-14 h-14 bg-blue-600/15 border border-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mx-auto transition-transform group-hover:scale-110 duration-300">
                <School className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white tracking-tight">Espace Académie</h2>
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
                  Administrez l'établissement, gérez le personnel, inscrivez les étudiants ou publiez des relevés scolaires officiels de votre école.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button 
                onClick={onSelectRoleSelection}
                className="w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-lg shadow-blue-600/15"
              >
                <span>Accéder à mon académie</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* CONTAINER 2: ESPACE PARENT (Stated styled precisely as the image 3 with green tone!) */}
          <div className="bg-[#161d31] rounded-2xl border border-slate-800/80 p-8 flex flex-col justify-between shadow-xl shadow-slate-950/30 hover:shadow-green-500/5 hover:border-slate-700 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/5 rounded-full pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>

            <div className="space-y-6 text-center">
              <div className="w-14 h-14 bg-emerald-600/15 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto transition-transform group-hover:scale-110 duration-300">
                <Users className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white tracking-tight">Espace Parent</h2>
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
                  Suivez la scolarité de vos enfants. Consultez les notes, absences, emplois du temps et communiqués importants de l'école.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button 
                onClick={onSelectParentLogin}
                className="w-full bg-[#059669] hover:bg-[#047857] active:scale-[0.98] text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-lg shadow-emerald-600/15"
              >
                <span>Suivre mon enfant</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>

        {/* Quick Help Link */}
        <div className="max-w-xs mx-auto text-center border border-slate-800 bg-[#0d1326] rounded-xl py-2 px-4 flex items-center justify-center gap-2 text-2xs text-slate-500 hover:text-slate-400 transition cursor-pointer" onClick={onBackToLanding}>
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Besoin d'aide ? Découvrir le mode d'emploi</span>
        </div>

      </main>

      {/* Mini footer */}
      <footer className="py-6 border-t border-slate-900 bg-[#0d1326] text-center text-slate-600 text-2xs">
        <p>© 2026 OTO School - Espace de gestion intégrée</p>
      </footer>

    </div>
  );
}
