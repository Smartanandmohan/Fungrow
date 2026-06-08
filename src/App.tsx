import { useState, useEffect } from 'react';
import TeenHome from './components/TeenHome';
import DashboardLayout from './components/DashboardLayout';
import BrowseProjects from './components/BrowseProjects';
import ProjectDetails from './components/ProjectDetails';
import MyApplications from './components/MyApplications';
import Messages from './components/Messages';
import Earnings from './components/Earnings';
import Profile from './components/Profile';
import Settings from './components/Settings';
import LoginModal from './components/LoginModal';

// Company Landing Page imports
import CompanyNavbar from './components/Navbar';
import CompanyHero from './components/Hero';
import TrustedCompanies from './components/TrustedCompanies';
import WhyHireTeens from './components/WhyHireTeens';
import CompanyHowItWorks from './components/HowItWorks';
import CompanySuccessStories from './components/SuccessStories';
import CompanyStats from './components/Stats';
import Pricing from './components/Pricing';
import CTA from './components/CTA';
import CompanyFooter from './components/Footer';
import BookDemoModal from './components/BookDemoModal';

import { 
  mockProjects,
  initialApplications, 
  initialConversations, 
  initialTransactions, 
  initialProfile
} from './data/mockData';
import type {
  Application,
  Conversation,
  Transaction,
  UserProfile,
  Message
} from './data/mockData';

function App() {
  // Authentication & Navigation Mode
  const [viewMode, setViewMode] = useState<'company' | 'teen'>('teen'); // defaults to teen portal first
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing' | 'browse' | 'details' | 'applications' | 'messages' | 'earnings' | 'profile' | 'settings'
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  
  // Data States
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [transactions] = useState<Transaction[]>(initialTransactions);
  const [userProfile, setUserProfile] = useState<UserProfile>(initialProfile);
  
  // Page Specific States
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [activeConversationId, setActiveConversationId] = useState<string>('');
  const [initialCategoryFilter, setInitialCategoryFilter] = useState<string>('');
  
  // Settings & Theme
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState('English');
  const [notificationsCount, setNotificationsCount] = useState(3);

  // Sync Dark Class with Theme State
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Smooth scroll helper shared across Company landing page components
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth callbacks
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setViewMode('teen');
    setCurrentPage('browse');
    setNotificationsCount(prev => prev > 0 ? prev - 1 : 0);
  };

  const handleSignUpSuccess = () => {
    setIsLoggedIn(true);
    setViewMode('teen');
    setCurrentPage('profile');
    alert("Welcome to Funngro! Fill in your basic information and profile to get started.");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('landing');
  };

  // Navigations from landing page
  const handleExploreProjects = (category?: string) => {
    if (category) {
      setInitialCategoryFilter(category);
    } else {
      setInitialCategoryFilter('');
    }
    // Auto login for quick assignment demo workflow
    setIsLoggedIn(true);
    setCurrentPage('browse');
  };

  // Project select
  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentPage('details');
  };

  // Apply project handler
  const handleApply = (projId: string, coverLetter: string, whyFit: string, portfolioLink: string) => {
    const project = mockProjects.find(p => p.id === projId);
    if (!project) return;

    // Use parameters to quiet compiler
    console.log(`Apply details: whyFit: ${whyFit}, portfolioLink: ${portfolioLink}`);

    // Create new application
    const newApp: Application = {
      id: `app-${Date.now()}`,
      projectId: projId,
      projectTitle: project.title,
      companyName: project.companyName,
      budget: project.budget,
      status: 'Applied',
      appliedDate: new Date().toISOString().split('T')[0],
      coverLetter
    };

    setApplications([newApp, ...applications]);

    // Check if conversation already exists
    const existingConv = conversations.find(c => c.companyName === project.companyName && c.projectTitle === project.title);
    
    if (!existingConv) {
      // Create new conversation
      const newConv: Conversation = {
        id: `conv-${Date.now()}`,
        clientName: `${project.companyName} Representative`,
        companyName: project.companyName,
        projectTitle: project.title,
        avatarColor: 'bg-indigo-600',
        unread: true,
        messages: [
          {
            id: `m-${Date.now()}-1`,
            sender: 'client',
            text: `Hi ${userProfile.name}, we received your application for "${project.title}"! We are reviewing your cover letter and will reach out if we'd like to schedule an interview.`,
            timestamp: new Date().toISOString()
          }
        ]
      };
      
      setConversations([newConv, ...conversations]);
      setActiveConversationId(newConv.id);
    }
  };

  // Messaging handlers
  const handleSendMessage = (conversationId: string, text: string) => {
    const updatedConvs = conversations.map((conv) => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          messages: [
            ...conv.messages,
            {
              id: `m-user-${Date.now()}`,
              sender: 'user',
              text,
              timestamp: new Date().toISOString()
            } as Message
          ]
        };
      }
      return conv;
    });
    setConversations(updatedConvs);
  };

  const handleReceiveMessage = (conversationId: string, text: string) => {
    const updatedConvs = conversations.map((conv) => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          unread: true,
          messages: [
            ...conv.messages,
            {
              id: `m-client-${Date.now()}`,
              sender: 'client',
              text,
              timestamp: new Date().toISOString()
            } as Message
          ]
        };
      }
      return conv;
    });
    setConversations(updatedConvs);
    setNotificationsCount(prev => prev + 1);
  };

  const handleOpenChat = (companyName: string, projectTitle: string) => {
    // Find conversation matching these details or open messages page
    const matched = conversations.find(c => c.companyName === companyName && c.projectTitle === projectTitle);
    if (matched) {
      setActiveConversationId(matched.id);
    }
    setCurrentPage('messages');
  };

  // Profile save
  const handleSaveProfile = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  // Render subpages based on page states
  const renderDashboardPage = () => {
    switch (currentPage) {
      case 'browse':
        return (
          <BrowseProjects 
            onSelectProject={handleSelectProject} 
            initialCategoryFilter={initialCategoryFilter}
            onClearInitialCategory={() => setInitialCategoryFilter('')}
          />
        );
      case 'details':
        return (
          <ProjectDetails 
            projectId={selectedProjectId}
            onBack={() => setCurrentPage('browse')}
            onApply={handleApply}
            applications={applications}
          />
        );
      case 'applications':
        return (
          <MyApplications 
            applications={applications}
            onSelectProject={handleSelectProject}
            onOpenChat={handleOpenChat}
          />
        );
      case 'messages':
        return (
          <Messages 
            conversations={conversations}
            onSendMessage={handleSendMessage}
            onReceiveMessage={handleReceiveMessage}
            activeConversationId={activeConversationId}
            setActiveConversationId={setActiveConversationId}
          />
        );
      case 'earnings':
        return (
          <Earnings 
            transactions={transactions}
          />
        );
      case 'profile':
        return (
          <Profile 
            userProfile={userProfile}
            onSaveProfile={handleSaveProfile}
          />
        );
      case 'settings':
        return (
          <Settings 
            theme={theme}
            toggleTheme={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
            notificationsEnabled={notificationsEnabled}
            setNotificationsEnabled={setNotificationsEnabled}
            language={language}
            setLanguage={setLanguage}
          />
        );
      default:
        return <BrowseProjects onSelectProject={handleSelectProject} />;
    }
  };

  // View mode switcher: Company Portal vs Teen Portal
  if (viewMode === 'company') {
    return (
      <div className="min-h-screen bg-white overflow-x-hidden text-slate-800 transition-colors">
        <CompanyNavbar
          onLogin={() => setIsLoginModalOpen(true)}
          onHireTeens={() => scrollToSection('cta')}
          scrollToSection={scrollToSection}
          scrollToTop={scrollToTop}
          onSwitchToTeen={() => setViewMode('teen')}
        />
        <main>
          <CompanyHero
            onHireTeens={() => scrollToSection('cta')}
            onBookDemo={() => setIsDemoOpen(true)}
          />
          <TrustedCompanies />
          <WhyHireTeens />
          <CompanyHowItWorks />
          <CompanySuccessStories />
          <CompanyStats />
          <Pricing />
          <CTA
            onHireTeens={() => scrollToSection('cta')}
            onBookDemo={() => setIsDemoOpen(true)}
          />
        </main>
        <CompanyFooter
          scrollToSection={scrollToSection}
          scrollToTop={scrollToTop}
        />

        {/* Modals */}
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)}
          onSuccess={handleLoginSuccess}
        />
        <BookDemoModal 
          isOpen={isDemoOpen} 
          onClose={() => setIsDemoOpen(false)} 
        />
      </div>
    );
  }

  // Symmetrical layout rendering
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden font-sans">
        <TeenHome 
          onLogin={() => setIsLoginModalOpen(true)}
          onSignUp={handleSignUpSuccess} // Direct signup to profile setup
          onExploreProjects={handleExploreProjects}
          onSwitchToCompany={() => setViewMode('company')}
        />
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)}
          onSuccess={handleLoginSuccess}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-slate-950' : 'bg-white'}`}>
      <DashboardLayout
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        userProfile={userProfile}
        theme={theme}
        toggleTheme={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
        onLogout={handleLogout}
        notificationsCount={notificationsCount}
      >
        {renderDashboardPage()}
      </DashboardLayout>
    </div>
  );
}

export default App;
