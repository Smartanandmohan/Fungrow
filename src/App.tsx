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
  // Authentication & Navigation
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing' | 'browse' | 'details' | 'applications' | 'messages' | 'earnings' | 'profile' | 'settings'
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
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

  // Auth callbacks
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage('browse');
    setNotificationsCount(prev => prev > 0 ? prev - 1 : 0);
  };

  const handleSignUpSuccess = () => {
    setIsLoggedIn(true);
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

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-slate-950' : 'bg-white'}`}>
      {!isLoggedIn ? (
        <>
          <TeenHome 
            onLogin={() => setIsLoginModalOpen(true)}
            onSignUp={handleSignUpSuccess} // Direct signup to profile setup
            onExploreProjects={handleExploreProjects}
          />
          <LoginModal 
            isOpen={isLoginModalOpen} 
            onClose={() => setIsLoginModalOpen(false)}
            onSuccess={handleLoginSuccess}
          />
        </>
      ) : (
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
      )}
    </div>
  );
}

export default App;
