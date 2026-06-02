import React, { useState, useEffect } from 'react';
import { 
  School, 
  BookOpen, 
  Users, 
  TrendingUp, 
  Smartphone, 
  Laptop, 
  CheckCircle, 
  Mail, 
  Phone, 
  MessageSquare, 
  Calendar, 
  DollarSign, 
  UserPlus, 
  FolderOpen, 
  Library, 
  Send,
  UserCheck,
  Award,
  Download
} from 'lucide-react';

interface LandingPageProps {
  onEnterPortal: () => void;
  onGoToParentLogin: () => void;
}

export default function LandingPage({ onEnterPortal, onGoToParentLogin }: LandingPageProps) {
  const [activeTab, setActiveTab] = useState('accueil');
  const [contactForm, setContactForm] = useState({
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['accueil', 'apropos', 'solution', 'fonctionnalites', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(section);
          }

          // Simple triggering for appear active animation
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight - 100) {
            setVisibleSections(prev => ({ ...prev, [section]: true }));
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial trigger
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveTab(id);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setContactForm({
        lastName: '',
        firstName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 5000);
  };

  const [activeRoleTab, setActiveRoleTab] = useState<'admin' | 'parent' | 'teacher'>('admin');

  return (
    <div id="landing-root" className="min-h-screen bg-[#0A0A0B] text-gray-200 font-sans selection:bg-sky-500 selection:text-black relative overflow-hidden">
      
      {/* Background Detail */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-sky-500 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-600 rounded-full blur-[100px]"></div>
      </div>

      {/* Dynamic Navigation Bar */}
      <header id="landing-header" className="sticky top-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/5 transition-all duration-300 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('accueil')}>
            <div className="bg-sky-500 p-2.5 rounded-lg text-black font-extrabold shadow-lg shadow-sky-500/20">
              <span className="text-sm font-black">O</span>
            </div>
            <span className="text-xl font-bold tracking-tight uppercase">
              OTO <span className="text-sky-500">School</span>
            </span>
          </div>

          {/* Desktop Nav Tabs */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { id: 'accueil', label: 'Accueil' },
              { id: 'apropos', label: 'À propos' },
              { id: 'solution', label: 'Solutions' },
              { id: 'fonctionnalites', label: 'Fonctionnalités' },
              { id: 'contact', label: 'Contacté d\'Équipe' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id 
                    ? 'text-white border-b-2 border-sky-500 pb-1' 
                    : 'text-gray-400 hover:text-white transition-colors'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Quick Access Portal Button */}
          <div className="flex items-center gap-4">
            <button 
              onClick={onEnterPortal}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-sm font-semibold transition-all text-white flex items-center gap-2"
            >
              <Laptop className="w-4 h-4" />
              <span>Portail Web</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero / ACCUEIL Section */}
      <section 
        id="accueil" 
        className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden py-16 px-4 md:px-8 bg-[#0A0A0B]"
      >
        {/* Background Graphic Grid */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        
        {/* Abstract Glowing School/Dome Shape to simulate background school */}
        <div className="absolute -top-40 right-10 w-96 h-96 bg-sky-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -bottom-40 left-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
          
          {/* Slogan Pill */}
          <div className="inline-flex items-center gap-2 border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-sky-400 uppercase">
            <span className="w-1.5 h-1.5 bg-sky-400 rounded-full"></span>
            Plateforme de gestion scolaire tout-en-un
          </div>
 
          {/* Slogan / Slogan Display Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black leading-[0.9] tracking-tighter text-white">
              NUMÉRISEZ<br/>
              VOTRE <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">ÉCOLE</span>
            </h1>
            <p className="text-lg sm:text-xl font-medium text-gray-400 max-w-2xl mx-auto tracking-wide">
              Simplifiez la gestion administrative, pédagogique et parentale avec la solution OTO SCHOOL MANAGEMENT.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onEnterPortal}
              className="w-full sm:w-auto px-8 py-4 bg-sky-500 hover:bg-sky-400 text-black font-extrabold rounded-xl shadow-lg shadow-sky-500/20 transition-all duration-300 flex items-center justify-center gap-3 text-base cursor-pointer"
            >
              <span>Accéder à l'application web</span>
              <Laptop className="w-5 h-5 text-black" />
            </button>
            <button 
              onClick={() => scrollToSection('solution')}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 hover:text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Découvrir nos solutions</span>
            </button>
          </div>

          {/* Animated App Screenshot Outline Mockup */}
          <div className="relative mt-12 mx-auto max-w-4xl border border-white/5 rounded-[32px] p-3 bg-[#121214] shadow-2xl shadow-sky-500/5 backdrop-blur-xl">
            <div className="rounded-2xl overflow-hidden bg-[#0A0A0B] border border-white/5 aspect-[16/9] flex flex-col">
              {/* Fake Window bar */}
              <div className="bg-[#121214] h-10 px-4 flex items-center justify-between border-b border-white/5">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/60 block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60 block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/60 block"></span>
                </div>
                <div className="text-[10px] text-gray-500 bg-black/40 px-8 py-1 rounded-md border border-white/5 font-mono">
                  https://oto-school-management.ci
                </div>
                <div className="w-6"></div>
              </div>
              
              {/* Inside Mock Snapshot */}
              <div className="flex-1 p-6 grid grid-cols-12 gap-4 text-left bg-[#0A0A0B]">
                <div className="col-span-3 bg-[#121214] rounded-xl p-3 border border-white/5 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="h-6 w-full bg-sky-500/10 rounded-md border border-sky-500/20"></div>
                    <div className="h-4 w-3/4 bg-white/5 rounded-md"></div>
                    <div className="h-4 w-5/6 bg-white/5 rounded-md"></div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-8 w-full bg-white/5 border border-white/5 rounded-md"></div>
                    <div className="h-8 w-full bg-white/5 border border-white/5 rounded-md"></div>
                  </div>
                </div>
                <div className="col-span-9 bg-[#121214] rounded-xl p-4 border border-white/5 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="h-5 w-1/3 bg-white/5 rounded-md"></div>
                    <div className="h-5 w-16 bg-sky-500/10 border border-sky-500/20 rounded-md text-sky-400 text-[10px] flex items-center justify-center font-bold">LIVE</div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 my-4">
                    <div className="bg-black/40 p-3 rounded-xl border border-white/5 text-center">
                      <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Élèves</p>
                      <p className="text-lg font-bold text-white">1,240</p>
                    </div>
                    <div className="bg-black/40 p-3 rounded-xl border border-white/5 text-center">
                      <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Professeurs</p>
                      <p className="text-lg font-bold text-white">74</p>
                    </div>
                    <div className="bg-black/40 p-3 rounded-xl border border-white/5 text-center">
                      <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Classes</p>
                      <p className="text-lg font-bold text-white">32</p>
                    </div>
                  </div>
                  <div className="h-16 w-full bg-[#0A0A0B] border border-white/5 rounded-xl p-2.5 flex items-center justify-between">
                    <div className="flex gap-2.5 items-center">
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10"></div>
                      <div className="space-y-1">
                        <div className="h-3 w-20 bg-white/10 rounded-md"></div>
                        <div className="h-2 w-16 bg-white/5 rounded-md"></div>
                      </div>
                    </div>
                    <div className="h-6 w-14 bg-sky-500 rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* A PROPOS Section */}
      <section 
        id="apropos" 
        className="py-24 px-4 md:px-8 border-t border-white/5 bg-[#0A0A0B] transition-all duration-700"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-xs font-bold tracking-widest text-sky-500 uppercase">QUI SOMMES-NOUS ?</h2>
            <p className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">À Propos d'OTO School</p>
            <div className="w-12 h-0.5 bg-sky-500 mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Visual branding block */}
            <div className="space-y-6">
              <div className="p-8 rounded-3xl bg-[#121214] border border-white/5 shadow-xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-sky-500/10 text-sky-400 p-2.5 rounded-xl border border-sky-500/20">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Notre Objectif</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  L'éducation numérique ne doit plus être une option réservée à quelques-uns. **OTO SCHOOL MANAGEMENT** est né de la volonté forte de démocratiser l'efficacité de gestion dans et hors des salles de classe africaines. 
                </p>
                <p className="text-gray-400 leading-relaxed text-sm">
                  De la gestion comptable fine au suivi personnalisé d'un enfant par ses deux parents, notre socle applicatif élimine les barrières de communication et automatise les processus répétitifs.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#121214] border border-white/5 text-center space-y-1">
                  <p className="text-sky-400 font-extrabold text-2xl">100%</p>
                  <p className="text-xs text-gray-500">Suivi en Temps Réel</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#121214] border border-white/5 text-center space-y-1">
                  <p className="text-sky-400 font-extrabold text-2xl">Zéro</p>
                  <p className="text-xs text-gray-500">Perte de Documents</p>
                </div>
              </div>
            </div>

            {/* Strategic objective details */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white tracking-tight">Une Révolution Organisationnelle</h3>
              <p className="text-gray-300 leading-relaxed">
                Notre plateforme intègre les meilleures pratiques des outils digitaux modernes au service des directeurs, secrétaires, intendants, enseignants et parents d'élèves.
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: "Accessibilité Sans Limite",
                    desc: "Disponible 24h/24 sur ordinateurs, tablettes et smartphones pour ne manquer aucune actualité."
                  },
                  {
                    title: "Transparence & Sécurité",
                    desc: "Toutes les modifications comptables sont historisées, les relevés de notes et pièces d'identité scrupuleusement sécurisés."
                  },
                  {
                    title: "Culture Communautaire",
                    desc: "Par des forums, messageries instantanées et bibliothèques d'épreuves partagées, nous bâtissons la réussite de demain."
                  }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="mt-1 bg-sky-500/10 text-sky-400 p-1.5 rounded-full border border-sky-500/20">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm sm:text-base">{item.title}</h4>
                      <p className="text-gray-400 text-xs sm:text-sm mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section 
        id="solution" 
        className="py-24 px-4 md:px-8 border-t border-white/5 bg-[#0A0A0B] transition-all duration-700"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-xs font-bold tracking-widest text-sky-500 uppercase font-mono">SUPPORTS APPLICATIFS</h2>
            <p className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">Nos Deux Solutions Phares</p>
            <div className="w-12 h-0.5 bg-sky-500 mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Solution Web Card */}
            <div className="bg-[#121214] border border-white/5 rounded-[32px] p-8 hover:border-sky-500/30 transition-all duration-300 flex flex-col justify-between shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-5 text-sky-500 group-hover:scale-110 transition-transform">
                <Laptop className="w-32 h-32" />
              </div>

              <div className="space-y-6 relative z-10">
                <div className="inline-block bg-sky-500/10 text-sky-400 p-3 rounded-2xl border border-sky-500/20">
                  <Laptop className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">SOCIÉTÉ APPLICATIVE DÉDIÉE</span>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Plateforme Web OTO School</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Le cœur battant de votre école. Un espace centralisé complet accessible via n'importe quel navigateur web. Permet aux écoles de s'inscrire, de gérer les effectifs scolaires, la comptabilité et le suivi rigoureux par rôle.
                </p>
                <ul className="space-y-2.5 text-gray-400 text-xs sm:text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-sky-500 rounded-full"></span>
                    <span>4 rôles administratifs paramétrables</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-sky-500 rounded-full"></span>
                    <span>Vérification d'inscription étape par étape</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-sky-500 rounded-full"></span>
                    <span>Portail d'académie & Suivi des finances</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 relative z-10">
                <button 
                  onClick={onEnterPortal}
                  className="w-full bg-sky-500 hover:bg-sky-400 text-black font-extrabold py-3.5 px-6 rounded-xl shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Accéder à l'application Web</span>
                  <Laptop className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Solution Mobile Card */}
            <div className="bg-[#121214] border border-white/5 rounded-[32px] p-8 hover:border-indigo-500/30 transition-all duration-300 flex flex-col justify-between shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-5 text-indigo-500 group-hover:scale-110 transition-transform">
                <Smartphone className="w-32 h-32" />
              </div>

              <div className="space-y-6 relative z-10">
                <div className="inline-block bg-indigo-500/10 text-indigo-400 p-3 rounded-2xl border border-indigo-500/20">
                  <Smartphone className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">AUTONOMIE NOMADE & INSTANTANÉE</span>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Application Mobile OTO</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  L'application compagnon conçue spécifiquement pour les parents et les enseignants en déplacement. Recevez des notifications push instantanées pour les absences, les notes de devoir, et communiquez directement.
                </p>
                <ul className="space-y-2.5 text-gray-400 text-xs sm:text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                    <span>Notifications push en temps réel des absences</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                    <span>Chat fluide avec l'administration de l'école</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                    <span>Consultation hors ligne des notes importées</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 relative z-10">
                <button 
                  onClick={() => alert("Le téléchargement de l'application mobile de démonstration commencera bientôt. Fichiers APK/IPA en préparation.")}
                  className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Téléchargement Mobile (.apk / .ipa)</span>
                  <Download className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Fonctionnalites Section */}
      <section 
        id="fonctionnalites" 
        className="py-24 px-4 md:px-8 border-t border-white/5 bg-[#0A0A0B] transition-all duration-700"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-xs font-bold tracking-widest text-sky-500 uppercase font-mono">PANORAMA TECHNIQUE</h2>
            <p className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">Fonctionnalités Clés par Rôle</p>
            <div className="w-12 h-0.5 bg-sky-500 mx-auto mt-4"></div>
          </div>

          {/* Tab Selector by Role */}
          <div className="flex justify-center mb-10">
            <div className="bg-[#121214] p-1.5 rounded-2xl border border-white/5 flex gap-2 w-full max-w-lg shadow-inner">
              {[
                { id: 'admin', label: 'Parcours Admin', icon: UserCheck },
                { id: 'parent', label: 'Parcours Parent', icon: Users },
                { id: 'teacher', label: 'Parcours Enseignant', icon: BookOpen }
              ].map((role) => {
                const IconComponent = role.icon;
                return (
                  <button
                    key={role.id}
                    onClick={() => setActiveRoleTab(role.id as any)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      activeRoleTab === role.id 
                        ? 'bg-sky-500 text-black shadow-md shadow-sky-500/10' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{role.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic tabs data */}
          <div className="transition-all duration-300">
            {activeRoleTab === 'admin' && (
              <div id="features-admin" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "Gestion personnel", icon: Users, desc: "Recruter, assigner et suivre les salaires et présences des professeurs et fonctionnaires." },
                  { title: "Gestion comptabilité", icon: DollarSign, desc: "Saisie automatique des scolarités versées, factures d'établissement et rapports financiers." },
                  { title: "Gestion inscriptions", icon: UserPlus, desc: "Fiches élèves dématérialisées pour inscrire rapidement un nouvel arrivant." },
                  { title: "Gestion ressources", icon: BookOpen, desc: "Création de classes, de matières scolaires et attribution des emplois du temps." },
                  { title: "Suivi des élèves", icon: TrendingUp, desc: "Tableaux de bord des notes d'examens, bulletins périodiques et rapports d'incidents." },
                  { title: "Publication d'annonce", icon: MessageSquare, desc: "Diffusions de communiqués officiels visibles instantanément par les parents ou profs." },
                  { title: "Partage de documents", icon: FolderOpen, desc: "Dépôts numériques d'attestations scolaires, devis et règlements intérieurs." },
                  { title: "Bibliothèque numérique", icon: Library, desc: "Archivage sécurisé des anciennes épreuves de compositions et examens nationaux." }
                ].map((feat, i) => (
                  <div key={i} className="bg-[#121214] border border-white/5 p-6 rounded-2xl space-y-3 hover:border-sky-500/20 transition-all duration-300">
                    <div className="bg-sky-500/10 text-sky-400 w-10 h-10 rounded-xl flex items-center justify-center font-bold border border-sky-500/15">
                      <feat.icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-white text-sm sm:text-base">{feat.title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {activeRoleTab === 'parent' && (
              <div className="space-y-8">
                <div id="features-parent" className="grid sm:grid-cols-3 gap-6">
                  {[
                    { title: "Suivi & contrôle parental", icon: TrendingUp, desc: "Consultabilité immédiate des notes obtenues par devoir, retards scolaires et assiduité en classe." },
                    { title: "Communication directe", icon: MessageSquare, desc: "Prise de rendez-vous en ligne avec l'administration et échanges fluides avec les professeurs du niveau." },
                    { title: "Bibliothèque de révision", icon: Library, desc: "Accès d'écriture réservé aux fiches de révision de leur progéniture et documents partagés de l'école." }
                  ].map((feat, i) => (
                    <div key={i} className="bg-[#121214] border border-white/5 p-6 rounded-2xl space-y-4 hover:border-indigo-500/20 transition-all duration-300">
                      <div className="bg-indigo-500/10 text-indigo-400 w-12 h-12 rounded-xl flex items-center justify-center border border-indigo-500/15">
                        <feat.icon className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-white text-base">{feat.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Button and descriptive text */}
                <div className="text-center bg-indigo-950/10 border border-indigo-500/10 p-8 rounded-3xl max-w-xl mx-auto space-y-4 shadow-xl">
                  <p className="text-xs sm:text-sm font-semibold text-indigo-300">Vous êtes un parent d'élève inscrit ?</p>
                  <button
                    onClick={onGoToParentLogin}
                    className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-extrabold px-8 py-3.5 rounded-xl text-xs sm:text-sm tracking-wide transition-all transform hover:scale-[1.02] shadow-lg shadow-indigo-600/25 inline-flex items-center gap-2.5 cursor-pointer text-center"
                  >
                    <Users className="w-4 h-4 text-white" />
                    <span>Suivre mon enfant</span>
                  </button>
                </div>
              </div>
            )}

            {activeRoleTab === 'teacher' && (
              <div id="features-teacher" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "Communication avec l’école", icon: MessageSquare, desc: "Relever les demandes administratives et informer des absences imprévues." },
                  { title: "Ressources pédagogiques", icon: BookOpen, desc: "Enregistrer le programme d'études, les chapitres abordés et les devoirs prévus." },
                  { title: "Partage de documents", icon: FolderOpen, desc: "Distribuer des projets de groupe, exercices d'entraînement ou lectures aux classes." },
                  { title: "Bibliothèque numérique", icon: Library, desc: "Importation et consultation des exercices types, corrigés de compositions et épreuves corrigées." }
                ].map((feat, i) => (
                  <div key={i} className="bg-[#121214] border border-white/5 p-6 rounded-2xl space-y-3 hover:border-sky-500/20 transition-all duration-300">
                    <div className="bg-sky-500/10 text-sky-400 w-10 h-10 rounded-xl flex items-center justify-center border border-sky-500/15">
                      <feat.icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-white text-sm sm:text-base">{feat.title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* CONTACT Section */}
      <section 
        id="contact" 
        className="py-24 px-4 md:px-8 border-t border-white/5 bg-[#0A0A0B] transition-all duration-700"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-xs font-bold tracking-widest text-[#ef4444] uppercase font-mono">SOUTIEN EXCLUSIF</h2>
            <p className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">Contactez notre Équipe d'Experts</p>
            <div className="w-12 h-0.5 bg-red-500 mx-auto mt-4"></div>
          </div>

          <div className="bg-[#121214] border border-white/5 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Envoyé !</h3>
                <p className="text-gray-300 max-w-md mx-auto">
                  Votre message a été transmis avec succès à notre service conseil. Un conseiller OTO School entrera en contact avec vous dans les 24 heures.
                </p>
                <p className="text-xs text-gray-500 font-mono">
                  Réinitialisation automatique...
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">Nom *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Kouassi"
                      value={contactForm.lastName}
                      onChange={e => setContactForm({...contactForm, lastName: e.target.value})}
                      className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/10 transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">Prénom *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Jean"
                      value={contactForm.firstName}
                      onChange={e => setContactForm({...contactForm, firstName: e.target.value})}
                      className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/15 transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">Adresse Email *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="contact@nom.com"
                      value={contactForm.email}
                      onChange={e => setContactForm({...contactForm, email: e.target.value})}
                      className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/15 transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">Numéro de Téléphone *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+225 01 02 03 04 05"
                      value={contactForm.phone}
                      onChange={e => setContactForm({...contactForm, phone: e.target.value})}
                      className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/15 transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">Objet du Message *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Saisie de l'objet du contact"
                    value={contactForm.subject}
                    onChange={e => setContactForm({...contactForm, subject: e.target.value})}
                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/15 transition-all text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">Votre Message *</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Exprimez votre besoin ou question concernant notre assistance d'installation scolaire..."
                    value={contactForm.message}
                    onChange={e => setContactForm({...contactForm, message: e.target.value})}
                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/15 transition-all text-sm resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-sky-500 hover:bg-sky-400 text-black font-extrabold py-4 rounded-xl shadow-lg shadow-sky-500/25 tracking-wide uppercase text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Envoyer la demande</span>
                  <Send className="w-4 h-4 text-black" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0B] text-gray-500 text-xs text-center py-12 border-t border-white/5">
        <p>© 2026 OTO SCHOOL MANAGEMENT. Tous droits réservés.</p>
        <p className="mt-1 text-gray-600 text-[10px]">Conçu pour la digitalisation des écoles, académies et parentés d'élèves.</p>
      </footer>
    </div>
  );
}
