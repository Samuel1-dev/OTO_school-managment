import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import PortalPage from './components/PortalPage';
import RegistrationFlows from './components/RegistrationFlows';
import AccessPortals from './components/AccessPortals';
import Dashboards from './components/Dashboards';

import { 
  School as SchoolType, 
  ParentUser, 
  Employee, 
  CourseMaterial, 
  Announcement,
  INITIAL_SCHOOLS,
  INITIAL_PARENTS,
  INITIAL_MATERIALS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_STAFF,
  TeacherUser
} from './mockData';

export default function App() {
  // Navigation Routing States
  // 'landing' | 'portal' | 'registration-flow' | 'access-portal' | 'dashboard'
  const [currentView, setCurrentView] = useState<'landing' | 'portal' | 'registration-flow' | 'access-portal' | 'dashboard'>('landing');

  // Interactive Live Database states
  const [schools, setSchools] = useState<SchoolType[]>(INITIAL_SCHOOLS);
  const [parents, setParents] = useState<ParentUser[]>(INITIAL_PARENTS);
  const [teachers, setTeachers] = useState<TeacherUser[]>([
    { id: 't-1', firstName: 'Sarah', lastName: 'Gbagbo', email: 'sarah.g@oto.ci', subject: 'Mathématiques', schoolId: 'lycee-excellence' },
    { id: 't-2', firstName: 'Koffi', lastName: 'Amessan', email: 'koffi.a@oto.ci', subject: 'Français', schoolId: 'lycee-excellence' }
  ]);
  const [staff, setStaff] = useState<Employee[]>(INITIAL_STAFF);
  const [materials, setMaterials] = useState<CourseMaterial[]>(INITIAL_MATERIALS);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);

  // Active Login Session properties
  const [activeSchool, setActiveSchool] = useState<SchoolType>(INITIAL_SCHOOLS[0]);
  const [currentRole, setCurrentRole] = useState<'admin' | 'teacher' | 'secretary' | 'supervisor' | 'parent' | 'custom'>('admin');

  // Callback handlers for workflow events:
  // 1. Entering Portal from marketing home
  const handleEnterPortal = () => {
    setCurrentView('portal');
  };

  // 2. Entering Registration (Choice between School or Parent)
  const handleSelectRegistrationChoice = () => {
    setCurrentView('registration-flow');
  };

  // 3. Admin registered a new school successfully
  const handleAdminRegisterSuccess = (newSchool: SchoolType, adminUserInfo: any) => {
    // Append the new school
    const updatedSchools = [...schools, newSchool];
    setSchools(updatedSchools);
    
    // Add founder to staff for completeness
    const newStaffMember: Employee = {
      id: adminUserInfo.id,
      name: `${adminUserInfo.firstName} ${adminUserInfo.lastName}`,
      role: 'Admin',
      phone: newSchool.phone,
      email: adminUserInfo.email
    };
    setStaff([...staff, newStaffMember]);

    setActiveSchool(newSchool);
    setCurrentRole('admin');
    setCurrentView('dashboard');
  };

  // 4. Parent registered successfully
  const handleParentRegisterSuccess = (newParent: ParentUser) => {
    setParents([...parents, newParent]);
    
    // Find the school the parent affiliated with
    const affiliationSchoolId = newParent.schoolIds[0];
    const targetSchool = schools.find(s => s.id === affiliationSchoolId) || schools[0];
    
    setActiveSchool(targetSchool);
    setCurrentRole('parent');
    setCurrentView('dashboard');
  };

  // 5. Successfull staff or parent authentication
  const handleLoginSuccess = (
    role: 'admin' | 'teacher' | 'secretary' | 'supervisor' | 'parent' | 'custom',
    chosenSchool: SchoolType
  ) => {
    setCurrentRole(role);
    setActiveSchool(chosenSchool);
    setCurrentView('dashboard');
  };

  // 6. Sign out / Back to main hub
  const handleLogout = () => {
    setCurrentView('portal');
  };

  return (
    <div id="app-wrapper" className="min-h-screen bg-[#090d1f] text-slate-100 antialiased selection:bg-blue-600 transition-colors">
      
      {/* Dynamic View Controller */}
      {currentView === 'landing' && (
        <LandingPage 
          onEnterPortal={handleEnterPortal} 
          onGoToParentLogin={() => {
            setCurrentRole('parent');
            setCurrentView('access-portal');
          }}
        />
      )}

      {currentView === 'portal' && (
        <PortalPage
          onBackToLanding={() => setCurrentView('landing')}
          onSelectRoleSelection={() => {
            setCurrentRole('admin'); // default state prep
            setCurrentView('access-portal');
          }}
          onSelectParentLogin={() => {
            setCurrentRole('parent'); // prepare parent role
            setCurrentView('access-portal');
          }}
          onSelectRegistrationChoice={handleSelectRegistrationChoice}
        />
      )}

      {currentView === 'registration-flow' && (
        <RegistrationFlows
          initialSchools={schools}
          onBackToPortal={() => setCurrentView('portal')}
          onGoToRoleSelection={() => {
            setCurrentRole('admin');
            setCurrentView('access-portal');
          }}
          onAdminRegisterSuccess={handleAdminRegisterSuccess}
          onParentRegisterSuccess={handleParentRegisterSuccess}
        />
      )}

      {currentView === 'access-portal' && (
        <AccessPortals
          schools={schools}
          parentsList={parents}
          staffList={staff}
          initialRole={currentRole}
          onBackToPortal={() => setCurrentView('portal')}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {currentView === 'dashboard' && (
        <Dashboards
          currentRole={currentRole}
          activeSchool={activeSchool}
          schools={schools}
          registeredParents={parents}
          registeredTeachers={teachers}
          registeredStaff={staff}
          registeredMaterials={materials}
          registeredAnnouncements={announcements}
          onLogout={handleLogout}
          onUpdateSchools={setSchools}
          onUpdateParents={setParents}
          onUpdateTeachers={setTeachers}
          onUpdateStaff={setStaff}
          onUpdateMaterials={setMaterials}
          onUpdateAnnouncements={setAnnouncements}
        />
      )}

    </div>
  );
}
