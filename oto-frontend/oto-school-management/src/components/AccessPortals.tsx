import React, { useState, useEffect } from 'react';
import { 
  School, 
  User, 
  Lock, 
  Mail, 
  ArrowLeft, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle, 
  UserCheck, 
  BookOpen, 
  Shield,
  Users,
  Search,
  Key
} from 'lucide-react';
import { School as SchoolType, ParentUser, Employee } from '../mockData';

interface AccessPortalsProps {
  schools: SchoolType[];
  parentsList: ParentUser[];
  staffList: Employee[];
  initialRole?: 'admin' | 'teacher' | 'secretary' | 'supervisor' | 'parent' | 'custom';
  onBackToPortal: () => void;
  onLoginSuccess: (role: 'admin' | 'teacher' | 'secretary' | 'supervisor' | 'parent' | 'custom', chosenSchool: SchoolType) => void;
}

export default function AccessPortals({
  schools,
  parentsList,
  staffList,
  initialRole,
  onBackToPortal,
  onLoginSuccess
}: AccessPortalsProps) {

  // Input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password123'); // friendly default
  const [errorMsg, setErrorMsg] = useState('');
  const [detectedRole, setDetectedRole] = useState<'admin' | 'teacher' | 'secretary' | 'supervisor' | 'parent' | 'custom'>('admin');
  const [showSchoolSelector, setShowSchoolSelector] = useState(false);
  const [pendingSchoolSelection, setPendingSchoolSelection] = useState<{
    role: 'admin' | 'teacher' | 'secretary' | 'supervisor' | 'parent' | 'custom';
    schoolList: SchoolType[];
  } | null>(null);

  // Auto-detect role whenever email changes
  useEffect(() => {
    // Strictly restrict the role detection and force 'parent' if entered through Espace Parent
    if (initialRole === 'parent') {
      setDetectedRole('parent');
      return;
    }

    const query = email.toLowerCase().trim();
    if (!query) {
      // Default fallback or use initialRole
      if (initialRole) {
        setDetectedRole(initialRole);
      } else {
        setDetectedRole('admin');
      }
      return;
    }

    // 1. Check in staffList first
    const staffMatch = staffList.find(s => s.email.toLowerCase() === query);
    if (staffMatch) {
      if (staffMatch.role === 'Admin') setDetectedRole('admin');
      else if (staffMatch.role === 'Enseignant') setDetectedRole('teacher');
      else if (staffMatch.role === 'Secrétaire') setDetectedRole('secretary');
      else if (staffMatch.role === 'Superviseur') setDetectedRole('supervisor');
      return;
    }

    // 2. Check in parentsList next
    const parentMatch = parentsList.find(p => p.email.toLowerCase() === query);
    if (parentMatch) {
      setDetectedRole('parent');
      return;
    }

    // 3. Substring heuristic check
    if (query.includes('admin') || query.includes('amadou') || query.includes('diallo') || query === 'direction') {
      setDetectedRole('admin');
    } else if (query.includes('prof') || query.includes('teacher') || query.includes('sarah') || query.includes('gbagbo') || query.includes('koffi') || query.includes('enseignant')) {
      setDetectedRole('teacher');
    } else if (query.includes('secretaire') || query.includes('secretary') || query.includes('ibrahim') || query.includes('toure')) {
      setDetectedRole('secretary');
    } else if (query.includes('supervi') || query.includes('assetou') || query.includes('kone')) {
      setDetectedRole('supervisor');
    } else if (query.includes('parent') || query.includes('michel') || query.includes('kouassi') || query.includes('@gmail') || query.includes('@yahoo')) {
      setDetectedRole('parent');
    } else {
      // Default fallback
      setDetectedRole('admin');
    }
  }, [email, staffList, parentsList, initialRole]);

  const getRoleBadgeInfo = (r: typeof detectedRole) => {
    switch(r) {
      case 'admin':
        return { label: 'Administrateur Principal', icon: Shield, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' };
      case 'teacher':
        return { label: 'Enseignant / Professeur', icon: BookOpen, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
      case 'secretary':
        return { label: 'Secrétariat Scolaire', icon: UserCheck, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' };
      case 'supervisor':
        return { label: 'Superviseur Général', icon: ShieldAlert, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
      case 'parent':
        return { label: 'Espace Parental', icon: Users, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' };
      default:
        return { label: 'Membre Académie', icon: User, color: 'text-slate-400 bg-slate-500/10 border-slate-500/20' };
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Veuillez renseigner votre identifiant ou adresse email.');
      return;
    }
    setErrorMsg('');

    // If entered through Espace Parent, strictly allow only registered parents
    if (initialRole === 'parent') {
      const parentUser = parentsList.find(p => p.email.toLowerCase() === email.toLowerCase().trim());
      if (!parentUser) {
        setErrorMsg("Accès refusé. Cet espace de connexion est strictement réservé aux parents d'élèves de l'établissement. Les comptes administrateur, enseignant, secrétaire ou superviseur ne peuvent pas s'y connecter.");
        return;
      }
      const matchingSchools = schools.filter(s => parentUser.schoolIds.includes(s.id));
      if (matchingSchools.length === 1) {
        onLoginSuccess('parent', matchingSchools[0]);
      } else {
        setPendingSchoolSelection({ role: 'parent', schoolList: matchingSchools.length > 0 ? matchingSchools : schools });
        setShowSchoolSelector(true);
      }
      return;
    }

    // If role is detected as Administrator:
    // "aussi pour l'admin on aura pas besoin de lister toute les école puisque l'admin sera associer qu'a une école celle qu'il a créer donc il accede directement a son école"
    if (detectedRole === 'admin') {
      const targetSchool = schools[0]; // Accesses their associated/created school directly!
      onLoginSuccess('admin', targetSchool);
      return;
    }

    // For Parents, locate which schools their children are registered in
    if (detectedRole === 'parent') {
      const parentUser = parentsList.find(p => p.email.toLowerCase() === email.toLowerCase().trim()) || parentsList[0];
      const matchingSchools = schools.filter(s => parentUser.schoolIds.includes(s.id));
      
      if (matchingSchools.length === 1) {
        // Direct redirect since there is only 1 school
        onLoginSuccess('parent', matchingSchools[0]);
      } else {
        // Let them pick between their schools
        setPendingSchoolSelection({ role: 'parent', schoolList: matchingSchools.length > 0 ? matchingSchools : schools });
        setShowSchoolSelector(true);
      }
      return;
    }

    // For other staff (teachers, secretaries, supervisors)
    // If they have only 1 school, go direct! Otherwise show list
    if (schools.length === 1) {
      onLoginSuccess(detectedRole, schools[0]);
    } else {
      setPendingSchoolSelection({ role: detectedRole, schoolList: schools });
      setShowSchoolSelector(true);
    }
  };

  const handleSelectSchool = (sch: SchoolType) => {
    if (pendingSchoolSelection) {
      onLoginSuccess(pendingSchoolSelection.role, sch);
    }
  };

  const badge = getRoleBadgeInfo(detectedRole);
  const IconComponent = badge.icon;

  return (
    <div id="access-portals-root" className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans relative">
      
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {!showSchoolSelector ? (
        <div id="unified-login-container" className="max-w-md mx-auto w-full bg-[#151d31] rounded-3xl border border-slate-800 p-8 shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 rounded-t-3xl"></div>

          {/* Header */}
          <div className="text-center space-y-4 mb-8">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto border transition-all duration-300 ${badge.color}`}>
              <IconComponent className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">Accéder à mon Académie</h2>
              <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                Renseignez vos accès OTO School uniques pour charger votre profil de connexion.
              </p>
            </div>

            {/* AI Detective Badge */}
            <div className="pt-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border uppercase tracking-wider transition-all duration-300 ${badge.color}`}>
                <span className="w-1.5 h-1.5 bg-current rounded-full animate-ping"></span>
                <span>{badge.label}</span>
              </span>
            </div>
          </div>

          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-xs font-semibold mb-5 text-center">
              ⚠ {errorMsg}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            {/* Input E-mail / Identifiant */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-bold block">Adresse Email ou Identifiant *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                  <Mail className="w-4 h-4" />
                </span>
                <input 
                  type="text"
                  required
                  placeholder={initialRole === 'parent' ? "Ex: michel.kouassi@gmail.com" : "Ex: amadou.diallo@oto.ci, sarah.g@oto.ci..."}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-[#1c263f] border border-slate-700 hover:border-slate-650 rounded-xl pl-10 pr-4 py-3.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-sm font-semibold transition-all"
                />
              </div>
            </div>

            {/* Input Mot de passe */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-bold block">Mot de passe sécurisé</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                  <Lock className="w-4 h-4" />
                </span>
                <input 
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-[#1c263f] border border-slate-700 hover:border-slate-650 rounded-xl pl-10 pr-4 py-3.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-sm font-mono transition-all"
                />
              </div>
            </div>

            {/* Buttons Row */}
            <div className="pt-3 flex gap-3">
              <button 
                type="button"
                onClick={onBackToPortal}
                className="w-1/3 bg-[#20283c] hover:bg-[#2b3550] border border-slate-705 text-slate-300 py-3.5 rounded-xl text-xs font-extrabold tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Retour</span>
              </button>
              
              <button 
                type="submit"
                className="w-2/3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-3.5 px-4 rounded-xl text-xs tracking-wide uppercase transition-all shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>S'identifier</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>

          {/* Helpful Tips Block */}
          <div className="mt-8 p-4 bg-slate-900/60 rounded-2xl text-[11px] text-slate-400 border border-slate-800/85 text-left">
            <p className="font-extrabold text-slate-300 mb-2 uppercase tracking-wide flex items-center gap-1 text-[10px]">
              <Key className="w-3.5 h-3.5 text-blue-400" />
              <span>{initialRole === 'parent' ? "Identifiant Parent Autorisé uniquement :" : "Identifiants Démo configurés :"}</span>
            </p>
            <div className="space-y-1.5 leading-normal">
              {initialRole !== 'parent' ? (
                <>
                  <p><span className="text-blue-400 font-semibold">Admin (Direct) :</span> <code className="bg-slate-950 px-1 py-0.5 rounded text-white">amadou.diallo@oto.ci</code></p>
                  <p><span className="text-emerald-400 font-semibold">Prof (Notes) :</span> <code className="bg-slate-950 px-1 py-0.5 rounded text-white">sarah.g@oto.ci</code> (Sarah Gbagbo)</p>
                  <p><span className="text-purple-400 font-semibold">Secrétaire :</span> <code className="bg-slate-950 px-1 py-0.5 rounded text-white">ibrahim.toure@oto.ci</code></p>
                  <p><span className="text-amber-400 font-semibold">Superviseur :</span> <code className="bg-slate-950 px-1 py-0.5 rounded text-white">assetou.k@oto.ci</code> (Assetou Koné)</p>
                  <p><span className="text-rose-400 font-semibold">Parent d'Élève :</span> <code className="bg-slate-950 px-1 py-0.5 rounded text-white">michel.kouassi@gmail.com</code></p>
                </>
              ) : (
                <>
                  <p><span className="text-rose-400 font-semibold">Parent d'Élève :</span> <code className="bg-slate-950 px-1 py-0.5 rounded text-white">michel.kouassi@gmail.com</code></p>
                  <div className="mt-2.5 p-2 bg-red-500/10 rounded-lg text-red-200 text-2xs border border-red-500/20 font-medium">
                    ⚠ Les autres rôles (Directeurs, Professeurs etc.) ne peuvent pas s'identifier ici. Utilisez le portail d'accès général pour vos comptes.
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* SCHOOL SELECTION FOR ROLES OTHER THAN ADMIN IN CASE THERE ARE MULTIPLE SCHOOLS */
        <div id="school-selection-container" className="max-w-md mx-auto w-full bg-[#151d31] rounded-3xl border border-[#1e293b] p-8 shadow-2xl text-center space-y-6 animate-fade-in">
          <div className="inline-flex py-1 px-3.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-2xs text-blue-400 font-bold uppercase tracking-wider items-center gap-1.5 mx-auto">
            <School className="w-3.5 h-3.5" />
            <span>Sélection d'Établissement</span>
          </div>

          <div className="space-y-1.5">
            <h2 className="text-2xl font-black text-white">Sélectionnez votre École</h2>
            <p className="text-slate-400 text-xs leading-normal">Veuillez choisir l'établissement OTO auquel vous souhaitez vous connecter.</p>
          </div>

          <div className="space-y-3.5 w-full">
            {pendingSchoolSelection?.schoolList.map((sch) => (
              <div 
                key={sch.id}
                className="bg-[#1c2642] rounded-2xl border border-slate-700/80 p-5 flex flex-col justify-between hover:border-blue-500 text-left transition-all duration-300 relative overflow-hidden group shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-600/10 text-blue-400 p-2.5 rounded-xl border border-blue-500/10">
                    <School className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-sm sm:text-base leading-tight">{sch.name}</h3>
                    <p className="text-2xs text-slate-400 mt-0.5">{sch.city} • {sch.poBox}</p>
                  </div>
                </div>

                <button 
                  onClick={() => handleSelectSchool(sch)}
                  className="w-full bg-blue-700 hover:bg-blue-600 font-bold py-2.5 px-4 rounded-xl text-xs text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow"
                >
                  <span>Rejoindre cet Établissement</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button 
              type="button"
              onClick={() => {
                setShowSchoolSelector(false);
                setPendingSchoolSelection(null);
              }}
              className="text-xs font-extrabold text-slate-400 hover:text-white transition-colors"
            >
              Retour à la page de connexion
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
