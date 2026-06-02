import React, { useState } from 'react';
import { 
  School, 
  User, 
  ArrowRight, 
  ArrowLeft, 
  Briefcase, 
  ShieldCheck, 
  CheckCircle,
  Loader2,
  Lock,
  Mail,
  Phone,
  Hash,
  MapPin,
  Building
} from 'lucide-react';
import { INITIAL_SCHOOLS, School as SchoolType } from '../mockData';

interface RegistrationFlowsProps {
  initialSchools: SchoolType[];
  onBackToPortal: () => void;
  onGoToRoleSelection: () => void;
  onAdminRegisterSuccess: (newSchool: any, adminCreds: any) => void;
  onParentRegisterSuccess: (newParent: any) => void;
}

export default function RegistrationFlows({
  initialSchools,
  onBackToPortal,
  onGoToRoleSelection,
  onAdminRegisterSuccess,
  onParentRegisterSuccess
}: RegistrationFlowsProps) {
  
  // Registration type choice or steps
  // 'choice' | 'school-step1' | 'school-step2' | 'school-loading' | 'school-success' | 'parent-form' | 'parent-loading' | 'parent-success'
  const [flowState, setFlowState] = useState<'choice' | 'school-step1' | 'school-step2' | 'school-loading' | 'school-success' | 'parent-form' | 'parent-loading' | 'parent-success'>('choice');

  // School step 1 fields
  const [schoolData, setSchoolData] = useState({
    name: '',
    city: '',
    poBox: '',
    founder: '',
    email: '',
    phone: '',
    description: ''
  });

  // School step 2 fields
  const [adminData, setAdminData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Parent fields
  const [parentData, setParentData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profession: '',
    selectedSchoolId: initialSchools[0]?.id || 'lycee-excellence'
  });

  // Loading animation state log lines
  const [loadingStep, setLoadingStep] = useState(0);
  const loadingLogs = [
    "Réception du dossier d'enregistrement...",
    "Vérification de l'existence de l'établissement auprès du bureau national...",
    "Création sécurisée des clés d'administrateur...",
    "Instanciation de l'Espace Académie dédié...",
    "Dossier OTO validé avec succès !"
  ];

  const parentLoadingLogs = [
    "Dépôt d'affiliation parent-élève en cours...",
    "Vérification des numéros scolaires...",
    " Liaison des bulletins d'évaluation...",
    "Validation du comité parental...",
    "Filiation parentale enregistrée avec succès !"
  ];

  // Errors
  const [errorMsg, setErrorMsg] = useState('');

  const handleNextSchoolStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolData.name || !schoolData.city || !schoolData.founder || !schoolData.email || !schoolData.phone) {
      setErrorMsg("Veuillez remplir tous les champs obligatoires (*)");
      return;
    }
    setErrorMsg('');
    setFlowState('school-step2');
  };

  const startSchoolLoadingSim = () => {
    setLoadingStep(0);
    const interval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev >= loadingLogs.length - 1) {
          clearInterval(interval);
          setFlowState('school-success');
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
  };

  const handleSchoolSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminData.firstName || !adminData.lastName || !adminData.email || !adminData.password || !adminData.confirmPassword) {
      setErrorMsg("Veuillez remplir tous les champs obligatoires (*)");
      return;
    }
    if (adminData.password !== adminData.confirmPassword) {
      setErrorMsg("Les mots de passe ne correspondent pas");
      return;
    }
    setErrorMsg('');
    setFlowState('school-loading');
    startSchoolLoadingSim();
  };

  const startParentLoadingSim = () => {
    setLoadingStep(0);
    const interval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev >= parentLoadingLogs.length - 1) {
          clearInterval(interval);
          setFlowState('parent-success');
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleParentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentData.firstName || !parentData.lastName || !parentData.email || !parentData.phone || !parentData.profession) {
      setErrorMsg("Veuillez remplir tous les champs de l'identité parentale (*)");
      return;
    }
    setErrorMsg('');
    setFlowState('parent-loading');
    startParentLoadingSim();
  };

  const handleAccessAdminDashboard = () => {
    const freshSchoolId = 'school-' + Date.now();
    const newSchool: SchoolType = {
      id: freshSchoolId,
      name: schoolData.name,
      city: schoolData.city,
      poBox: schoolData.poBox || 'Sans B.P.',
      founder: schoolData.founder,
      email: schoolData.email,
      phone: schoolData.phone,
      description: schoolData.description,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };

    const newAdmin = {
      id: 'admin-' + Date.now(),
      firstName: adminData.firstName,
      lastName: adminData.lastName,
      email: adminData.email,
      schoolId: freshSchoolId
    };

    onAdminRegisterSuccess(newSchool, newAdmin);
  };

  const handleAccessParentDashboard = () => {
    const parentId = 'parent-' + Date.now();
    const newParent = {
      id: parentId,
      firstName: parentData.firstName,
      lastName: parentData.lastName,
      email: parentData.email,
      phone: parentData.phone,
      profession: parentData.profession,
      schoolIds: [parentData.selectedSchoolId],
      children: [
        {
          id: 'child-' + Date.now(),
          firstName: 'Enfant - ' + parentData.lastName,
          lastName: parentData.lastName,
          class: 'Second Grade A',
          notes: [
            { subject: 'Mathématiques', score: 15, date: '2026-05-18' },
            { subject: 'Français', score: 14, date: '2026-05-19' }
          ],
          absences: 0,
          unjustifiedAbsences: 0
        }
      ]
    };
    onParentRegisterSuccess(newParent);
  };

  return (
    <div id="registration-root" className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* CHOICE PAGE - Inscrire école ou parent */}
      {flowState === 'choice' && (
        <div id="choice-container" className="max-w-md mx-auto w-full bg-[#151d31] rounded-2xl border border-slate-800 p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
          
          <div className="text-center space-y-3 mb-8">
            <h2 className="text-2xl font-extrabold text-white">Créer un Compte OTO</h2>
            <p className="text-slate-400 text-sm">Choisissez le parcours adapté à votre profil d'utilisateur</p>
          </div>

          <div className="space-y-4">
            
            {/* Choose School Option */}
            <button
              onClick={() => setFlowState('school-step1')}
              className="w-full text-left bg-[#1c263f] hover:bg-[#233152] border border-slate-700/80 hover:border-blue-500 rounded-xl p-5 transition duration-300 flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="bg-blue-600/20 text-blue-400 p-3 rounded-lg group-hover:scale-110 transition">
                  <School className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm sm:text-base">Inscrire mon école</h3>
                  <p className="text-xs text-slate-400 mt-1">Écoles publiques, privées ou structures académiques.</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition" />
            </button>

            {/* Choose Parent Option */}
            <button
              onClick={() => setFlowState('parent-form')}
              className="w-full text-left bg-[#1c263f] hover:bg-[#233152] border border-slate-700/80 hover:border-emerald-500 rounded-xl p-5 transition duration-300 flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="bg-emerald-600/20 text-emerald-400 p-3 rounded-lg group-hover:scale-110 transition">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm sm:text-base">Inscrire mon parent</h3>
                  <p className="text-xs text-slate-400 mt-1">Suivi parental, cahier de texte et notes scolaires.</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 transition" />
            </button>

          </div>

          <div className="mt-8 pt-4 border-t border-slate-800 text-center">
            <button 
              onClick={onBackToPortal}
              className="text-xs font-semibold text-slate-400 hover:text-white transition flex items-center justify-center gap-1.5 mx-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retourner aux Espaces de connexion</span>
            </button>
          </div>
        </div>
      )}

      {/* INSCRIRE ÉCOLE - ÉTAPE 1 / 2 */}
      {flowState === 'school-step1' && (
        <div id="school-step1-container" className="max-w-xl mx-auto w-full bg-[#1e2544] rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl relative">
          
          {/* Progress blue bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-[#1e2544] overflow-hidden rounded-t-2xl">
            <div className="h-full w-1/2 bg-blue-500"></div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-600 p-2.5 rounded-xl text-white">
              <School className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">Inscrire mon école</h2>
              <p className="text-xs text-slate-400 mt-1">Gestation d'établissement • Étape 1 / 2</p>
            </div>
          </div>

          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-700/60 pb-2 mb-4">
            INFORMATIONS DE L'ÉCOLE
          </h3>

          {errorMsg && <p className="text-red-400 text-xs mb-4 font-semibold">{errorMsg}</p>}

          <form onSubmit={handleNextSchoolStep} className="space-y-4">
            
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-semibold">Nom de l'école *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                  <Building className="w-4 h-4" />
                </span>
                <input 
                  type="text"
                  required
                  placeholder="Lycée de l'Excellence d'Abidjan"
                  value={schoolData.name}
                  onChange={e => setSchoolData({...schoolData, name: e.target.value})}
                  className="w-full bg-[#272e50] border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-semibold">Ville *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <input 
                    type="text"
                    required
                    placeholder="Abidjan"
                    value={schoolData.city}
                    onChange={e => setSchoolData({...schoolData, city: e.target.value})}
                    className="w-full bg-[#272e50] border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-semibold">Boîte postale</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                    <Hash className="w-4 h-4" />
                  </span>
                  <input 
                    type="text"
                    placeholder="BP 123"
                    value={schoolData.poBox}
                    onChange={e => setSchoolData({...schoolData, poBox: e.target.value})}
                    className="w-full bg-[#272e50] border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-semibold">Nom du fondateur *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                  <User className="w-4 h-4" />
                </span>
                <input 
                  type="text"
                  required
                  placeholder="Jean Dupont"
                  value={schoolData.founder}
                  onChange={e => setSchoolData({...schoolData, founder: e.target.value})}
                  className="w-full bg-[#272e50] border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-semibold">Email de l'école *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input 
                    type="email"
                    required
                    placeholder="contact@ecole.ci"
                    value={schoolData.email}
                    onChange={e => setSchoolData({...schoolData, email: e.target.value})}
                    className="w-full bg-[#272e50] border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-semibold">Téléphone *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                    <Phone className="w-4 h-4" />
                  </span>
                  <input 
                    type="tel"
                    required
                    placeholder="+225 01 23 45 67"
                    value={schoolData.phone}
                    onChange={e => setSchoolData({...schoolData, phone: e.target.value})}
                    className="w-full bg-[#272e50] border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-semibold">Description</label>
              <textarea 
                rows={3}
                placeholder="Décrivez votre école..."
                value={schoolData.description}
                onChange={e => setSchoolData({...schoolData, description: e.target.value})}
                className="w-full bg-[#272e50] border border-slate-700/80 rounded-xl p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm resize-none"
              ></textarea>
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/20"
              >
                <span>Continuer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>

          <div className="mt-6 text-center border-t border-slate-700/40 pt-4">
            <span className="text-xs text-slate-400">Déjà inscrit ? </span>
            <button 
              onClick={onGoToRoleSelection} 
              className="text-xs font-bold text-blue-400 hover:text-blue-300 hover:underline"
            >
              Accéder à mon académie
            </button>
          </div>

        </div>
      )}

      {/* INSCRIRE ÉCOLE - ÉTAPE 2 / 2 */}
      {flowState === 'school-step2' && (
        <div id="school-step2-container" className="max-w-xl mx-auto w-full bg-[#1e2544] rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl relative">
          
          {/* Progress blue bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-[#1e2544] overflow-hidden rounded-t-2xl">
            <div className="h-full w-full bg-blue-500"></div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-600 p-2.5 rounded-xl text-white">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">Inscrire mon école</h2>
              <p className="text-xs text-slate-400 mt-1">Gestation d'établissement • Étape 2 / 2</p>
            </div>
          </div>

          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-700/60 pb-2 mb-2">
            COMPTE CRÉATEUR
          </h3>
          <p className="text-2xs text-slate-400 mb-4">Ce compte aura un accès total à l'Espace Administration OTO de votre école.</p>

          {errorMsg && <p className="text-red-400 text-xs mb-4 font-semibold">{errorMsg}</p>}

          <form onSubmit={handleSchoolSubmit} className="space-y-4">
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-semibold">Prénom *</label>
                <input 
                  type="text"
                  required
                  placeholder="Jean"
                  value={adminData.firstName}
                  onChange={e => setAdminData({...adminData, firstName: e.target.value})}
                  className="w-full bg-[#272e50] border border-slate-700/80 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-semibold">Nom *</label>
                <input 
                  type="text"
                  required
                  placeholder="Dupont"
                  value={adminData.lastName}
                  onChange={e => setAdminData({...adminData, lastName: e.target.value})}
                  className="w-full bg-[#272e50] border border-slate-700/80 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-semibold">Email Personnel *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                  <Mail className="w-4 h-4" />
                </span>
                <input 
                  type="email"
                  required
                  placeholder="jean.dupont@email.com"
                  value={adminData.email}
                  onChange={e => setAdminData({...adminData, email: e.target.value})}
                  className="w-full bg-[#272e50] border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-semibold">Mot de passe *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input 
                    type="password"
                    required
                    placeholder="••••••••"
                    value={adminData.password}
                    onChange={e => setAdminData({...adminData, password: e.target.value})}
                    className="w-full bg-[#272e50] border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-semibold">Confirmer *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input 
                    type="password"
                    required
                    placeholder="••••••••"
                    value={adminData.confirmPassword}
                    onChange={e => setAdminData({...adminData, confirmPassword: e.target.value})}
                    className="w-full bg-[#272e50] border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex gap-4">
              <button 
                type="button"
                onClick={() => setFlowState('school-step1')}
                className="w-1/3 bg-[#2a304e] hover:bg-[#343b61] border border-slate-700/80 text-slate-200 py-3.5 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Retour</span>
              </button>
              
              <button 
                type="submit"
                className="w-2/3 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Inscrire mon école</span>
              </button>
            </div>

          </form>

          <div className="mt-6 text-center border-t border-slate-700/40 pt-4">
            <span className="text-xs text-slate-400">Déjà inscrit ? </span>
            <button 
              onClick={onGoToRoleSelection} 
              className="text-xs font-bold text-blue-400 hover:text-blue-300 hover:underline"
            >
              Accéder à mon académie
            </button>
          </div>

        </div>
      )}

      {/* SCHOOL REGISTRATION WAIT/PENDING VERIFICATION VALIDATION SCREEN */}
      {flowState === 'school-loading' && (
        <div id="school-loading-container" className="max-w-md mx-auto w-full bg-[#151f38] rounded-2xl border border-slate-800 p-8 shadow-2xl text-center space-y-6">
          <div className="inline-flex py-1 px-3 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-2xs text-yellow-400 font-bold uppercase tracking-wider items-center gap-1.5">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Vérification en cours (Back-office)</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-white">Validation du Dossier OTO</h2>
          <p className="text-slate-400 text-sm">
            Une validation doit être faite du côté de notre équipe back-office de vérification pour préserver l'étanchéité des données scolaires.
          </p>

          {/* Simulated logs running */}
          <div className="bg-[#0b0f19] border border-slate-800 rounded-xl p-4 text-left font-mono text-[11px] leading-relaxed space-y-2 h-44 overflow-y-auto">
            {loadingLogs.map((log, i) => (
              <div 
                key={i} 
                className={`transition-all duration-300 ${
                  i < loadingStep 
                    ? 'text-green-400/95' 
                    : i === loadingStep 
                      ? 'text-blue-400 animate-pulse font-bold' 
                      : 'text-slate-600'
                }`}
              >
                <span>{i < loadingStep ? '✓ ' : i === loadingStep ? '➤ ' : '• '}</span>
                <span>{log}</span>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-slate-500 animate-pulse">
            Configuration de la clé exclusive de l'école... Ne fermez pas cette page.
          </p>
        </div>
      )}

      {/* SCHOOL REGISTRATION SUCCESSFULLY VALIDATED SCREEN */}
      {flowState === 'school-success' && (
        <div id="school-success-container" className="max-w-md mx-auto w-full bg-[#151f38] rounded-2xl border border-slate-800 p-8 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 bg-green-500/15 border border-green-500/30 text-green-400 rounded-full flex items-center justify-center mx-auto animate-bounce shadow-lg shadow-green-500/10">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-2xs font-extrabold text-green-400 uppercase tracking-widest block">STATUT : VALIDÉ</span>
            <h2 className="text-2xl font-bold text-white">Inscription Réussie !</h2>
            <p className="text-slate-300 text-sm">
              Félicitations ! L'académie **"{schoolData.name}"** est désormais formellement constituée dans les serveurs OTO.
            </p>
          </div>

          <div className="bg-[#0b0f19]/80 border border-slate-800/80 p-4 rounded-xl text-left space-y-1.5 text-xs">
            <p className="text-slate-400"><span className="text-slate-500 font-semibold">Fondateur :</span> {schoolData.founder}</p>
            <p className="text-slate-400"><span className="text-slate-500 font-semibold">Ville :</span> {schoolData.city}</p>
            <p className="text-slate-400"><span className="text-slate-500 font-semibold">Admin Système :</span> {adminData.firstName} {adminData.lastName}</p>
            <p className="text-slate-400"><span className="text-slate-500 font-semibold">Identifiant Administratif :</span> admin_{schoolData.email.split('@')[0]}</p>
          </div>

          <button 
            onClick={handleAccessAdminDashboard}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
          >
            <span>Accéder au Dashboard Admin</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* PARENT REGISTRATION SCREEN */}
      {flowState === 'parent-form' && (
        <div id="parent-form-container" className="max-w-md mx-auto w-full bg-[#151e33] rounded-2xl border border-slate-800 p-8 shadow-2xl relative">
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-500"></div>

          <div className="flex items-center gap-4 mb-6">
            <div className="bg-emerald-600 p-2.5 rounded-xl text-white">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Inscrire un Parent</h2>
              <p className="text-xs text-slate-400 mt-1">Espace de suivi familial sécurisé</p>
            </div>
          </div>

          {errorMsg && <p className="text-red-400 text-xs mb-4 font-semibold">{errorMsg}</p>}

          <form onSubmit={handleParentSubmit} className="space-y-4">
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-semibold">Prénom *</label>
                <input 
                  type="text"
                  required
                  placeholder="Jean"
                  value={parentData.firstName}
                  onChange={e => setParentData({...parentData, firstName: e.target.value})}
                  className="w-full bg-[#1e2942] border border-slate-700/80 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-semibold">Nom *</label>
                <input 
                  type="text"
                  required
                  placeholder="Kouassi"
                  value={parentData.lastName}
                  onChange={e => setParentData({...parentData, lastName: e.target.value})}
                  className="w-full bg-[#1e2942] border border-slate-700/80 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-semibold">Adresse Email *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                  <Mail className="w-4 h-4" />
                </span>
                <input 
                  type="email"
                  required
                  placeholder="parent@email.com"
                  value={parentData.email}
                  onChange={e => setParentData({...parentData, email: e.target.value})}
                  className="w-full bg-[#1e2942] border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-semibold">Numéro de Téléphone *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                  <Phone className="w-4 h-4" />
                </span>
                <input 
                  type="tel"
                  required
                  placeholder="+225 07 12 34 56 78"
                  value={parentData.phone}
                  onChange={e => setParentData({...parentData, phone: e.target.value})}
                  className="w-full bg-[#1e2942] border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-semibold">Profession *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                  <Briefcase className="w-4 h-4" />
                </span>
                <input 
                  type="text"
                  required
                  placeholder="Enseignant, Avocat, Commerçant..."
                  value={parentData.profession}
                  onChange={e => setParentData({...parentData, profession: e.target.value})}
                  className="w-full bg-[#1e2942] border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>
            </div>

            {/* Select Children's School */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-semibold">École de inscription des enfants *</label>
              <select
                value={parentData.selectedSchoolId}
                onChange={e => setParentData({...parentData, selectedSchoolId: e.target.value})}
                className="w-full bg-[#1e2942] border border-slate-700/80 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-emerald-500 text-sm"
              >
                {initialSchools.map(sch => (
                  <option key={sch.id} value={sch.id}>{sch.name} ({sch.city})</option>
                ))}
              </select>
            </div>

            <div className="pt-2 flex gap-4">
              <button 
                type="button"
                onClick={() => setFlowState('choice')}
                className="w-1/3 bg-[#20293d] hover:bg-[#2b3752] border border-slate-700/80 text-slate-200 py-3 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Retour</span>
              </button>
              
              <button 
                type="submit"
                className="w-2/3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
              >
                <span>S'inscrire</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        </div>
      )}

      {/* PARENT REGISTRATION LOADING SCREEN */}
      {flowState === 'parent-loading' && (
        <div id="parent-loading-container" className="max-w-md mx-auto w-full bg-[#151f38] rounded-2xl border border-slate-800 p-8 shadow-2xl text-center space-y-6">
          <div className="inline-flex py-1 px-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-2xs text-emerald-400 font-bold uppercase tracking-wider items-center gap-1.5">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Création du Compte Parent en cours</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-white">Validation du Compte Parent</h2>
          <p className="text-slate-400 text-sm">
            Notre système apparie les informations d'identité du parent avec les inscriptions physiques reçues dans les établissements OTO.
          </p>

          <div className="bg-[#0b0f19] border border-slate-800 rounded-xl p-4 text-left font-mono text-[11px] leading-relaxed space-y-2 h-44 overflow-y-auto">
            {parentLoadingLogs.map((log, i) => (
              <div 
                key={i} 
                className={`transition-all duration-300 ${
                  i < loadingStep 
                    ? 'text-emerald-400/95' 
                    : i === loadingStep 
                      ? 'text-blue-400 animate-pulse font-bold' 
                      : 'text-slate-600'
                }`}
              >
                <span>{i < loadingStep ? '✓ ' : i === loadingStep ? '➤ ' : '• '}</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PARENT REGISTRATION SUCCESS PAGE WITH SCHOOL DISCOVERY */}
      {flowState === 'parent-success' && (
        <div id="parent-success-container" className="max-w-md mx-auto w-full bg-[#151f38] rounded-2xl border border-slate-800 p-8 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto animate-bounce shadow-lg shadow-emerald-500/10">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-2xs font-extrabold text-emerald-400 uppercase tracking-widest block">STATUT : ÉTABLI ✓</span>
            <h2 className="text-2xl font-bold text-white">Affiliation Réussie !</h2>
            <p className="text-slate-300 text-sm">
              Votre compte parent pour **"{parentData.firstName} {parentData.lastName}"** a été enregistré et vérifié avec succès.
            </p>
          </div>

          <div className="bg-[#0b0f19]/80 border border-slate-800/80 p-4 rounded-xl text-left space-y-1.5 text-xs">
            <p className="text-slate-400"><span className="text-slate-500 font-semibold">Parent référent :</span> {parentData.firstName} {parentData.lastName}</p>
            <p className="text-slate-400"><span className="text-slate-500 font-semibold">Profession déclarée :</span> {parentData.profession}</p>
            <p className="text-slate-400"><span className="text-slate-500 font-semibold">Établissements autorisés :</span> {initialSchools.find(s => s.id === parentData.selectedSchoolId)?.name || 'Lycée d\'Excellence'}</p>
          </div>

          <button 
            onClick={handleAccessParentDashboard}
            className="w-full bg-[#059669] hover:bg-[#047857] text-white font-bold py-3.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            <span>Ouvrir l'Espace Élèves & Bulletins</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}
