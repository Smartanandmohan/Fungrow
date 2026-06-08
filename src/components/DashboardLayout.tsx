import { useState } from 'react';
import { 
  Briefcase, 
  FileText, 
  MessageSquare, 
  DollarSign, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  Sun, 
  Moon
} from 'lucide-react';
import type { UserProfile } from '../data/mockData';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  userProfile: UserProfile;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onLogout: () => void;
  notificationsCount: number;
}

export default function DashboardLayout({
  children,
  currentPage,
  setCurrentPage,
  userProfile,
  theme,
  toggleTheme,
  onLogout,
  notificationsCount
}: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const navigationItems = [
    { id: 'browse', label: 'Browse Projects', icon: Briefcase },
    { id: 'applications', label: 'My Applications', icon: FileText },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const getPageTitle = () => {
    switch (currentPage) {
      case 'browse': return 'Browse Projects';
      case 'details': return 'Project Details';
      case 'applications': return 'My Applications';
      case 'messages': return 'Messages & Chat';
      case 'earnings': return 'Earnings & Invoices';
      case 'profile': return 'My Profile';
      case 'settings': return 'Settings';
      default: return 'Dashboard';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const mockNotifications = [
    { id: 1, title: 'Application Shortlisted', desc: 'SaaSify shortlisted you for "Landing Page for Startup".', time: '2 hours ago' },
    { id: 2, title: 'New Message Received', desc: 'Karan (LaunchPad) sent you a message: "Hey Aryan! Your pitch..."', time: '1 day ago' },
    { id: 3, title: 'Payment Completed', desc: 'Received ₹4,500 for "TikTok Content Creator".', time: '3 days ago' },
  ];

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-300 font-sans`}>
      
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0 sticky top-0 h-screen transition-colors duration-300">
        {/* Logo */}
        <div className="h-16 px-6 flex items-center border-b border-slate-100 dark:border-slate-800">
          <span className="font-display text-2xl font-bold text-slate-950 dark:text-white cursor-pointer" onClick={() => setCurrentPage('browse')}>
            funn<span className="text-brand">gro</span>
          </span>
          <span className="ml-2 px-1.5 py-0.5 rounded bg-brand/10 text-brand text-[10px] font-bold uppercase tracking-wider">
            Teen
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id || (item.id === 'browse' && currentPage === 'details');
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-brand text-white shadow-md shadow-brand/10' 
                    : 'text-slate-500 hover:text-slate-850 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-450 dark:text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Profile / Bottom panel */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            {userProfile.avatar ? (
              <img src={userProfile.avatar} alt={userProfile.name} className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-brand-light text-brand dark:bg-brand/20 dark:text-brand-light flex items-center justify-center font-bold text-sm">
                {getInitials(userProfile.name)}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold truncate text-slate-900 dark:text-white">{userProfile.name}</h4>
              <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                Teen Pro
              </span>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-slate-800 dark:hover:border-red-950 dark:hover:bg-red-950/20 text-slate-500 dark:text-slate-400 text-sm font-semibold transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          
          <div className="relative flex flex-col w-72 max-w-xs bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-850 h-full p-4 z-10 transition-transform duration-300">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="font-display text-xl font-bold text-slate-950 dark:text-white">
                funn<span className="text-brand">gro</span>
              </span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-650 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 space-y-1.5 overflow-y-auto">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id || (item.id === 'browse' && currentPage === 'details');
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-brand text-white' 
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-auto">
              <div className="flex items-center gap-3 p-2 rounded-xl mb-4">
                {userProfile.avatar ? (
                  <img src={userProfile.avatar} alt={userProfile.name} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-brand-light text-brand dark:bg-brand/20 dark:text-brand-light flex items-center justify-center font-bold text-sm">
                    {getInitials(userProfile.name)}
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{userProfile.name}</h4>
                  <span className="text-[10px] text-slate-400">Class 11 Teen</span>
                </div>
              </div>
              <button 
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/20 dark:text-red-400 text-sm font-semibold transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-4 sm:px-6 z-30 shrink-0 transition-colors duration-300">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-black text-slate-950 dark:text-white leading-none">
              {getPageTitle()}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Dark Mode Toggle */}
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-800 text-slate-650 hover:bg-slate-50 dark:text-slate-350 dark:hover:bg-slate-850 cursor-pointer transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notifications Panel Trigger */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-800 text-slate-655 hover:bg-slate-50 dark:text-slate-350 dark:hover:bg-slate-850 cursor-pointer transition-colors"
              >
                <Bell className="w-5 h-5" />
                {notificationsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-brand text-white text-[9px] font-bold rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center">
                    {notificationsCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)}></div>
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl py-3 z-50 animate-float-delayed">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Notifications</span>
                      {notificationsCount > 0 && (
                        <span className="text-[10px] text-brand bg-brand-light dark:bg-brand/10 px-1.5 py-0.5 rounded font-bold">New</span>
                      )}
                    </div>
                    <div className="divide-y divide-slate-50 dark:divide-slate-800">
                      {mockNotifications.map((notif) => (
                        <div key={notif.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer transition-colors">
                          <h5 className="text-xs font-bold text-slate-900 dark:text-white mb-0.5">{notif.title}</h5>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 leading-normal">{notif.desc}</p>
                          <span className="text-[10px] text-slate-400">{notif.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Quick Profile Icon for Mobile */}
            <div 
              onClick={() => setCurrentPage('profile')}
              className="lg:hidden w-10 h-10 rounded-xl bg-brand-light text-brand dark:bg-brand/20 dark:text-brand-light flex items-center justify-center font-bold text-sm cursor-pointer"
            >
              {getInitials(userProfile.name)}
            </div>
          </div>
        </header>

        {/* Content Workspace */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
      
    </div>
  );
}
