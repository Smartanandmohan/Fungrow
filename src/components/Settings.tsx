import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { 
  Moon, 
  Sun, 
  Bell, 
  Globe, 
  User, 
  Mail, 
  Eye, 
  Check, 
  Sparkles
} from 'lucide-react';

interface SettingsProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

export default function Settings({
  theme,
  toggleTheme,
  notificationsEnabled,
  setNotificationsEnabled,
  language,
  setLanguage
}: SettingsProps) {
  // Local notification preferences state
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(notificationsEnabled);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [privacyPublic, setPrivacyPublic] = useState(true);
  
  // Action notifications
  const [alertText, setAlertText] = useState('');

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    
    let msg = 'Language updated!';
    if (newLang === 'Hindi') msg = 'भाषा बदलकर हिंदी कर दी गई है!';
    if (newLang === 'Spanish') msg = '¡Idioma cambiado a Español!';
    
    setAlertText(msg);
    setTimeout(() => setAlertText(''), 3000);
  };

  const handlePushToggle = () => {
    const nextVal = !pushAlerts;
    setPushAlerts(nextVal);
    setNotificationsEnabled(nextVal);
    
    setAlertText(nextVal ? 'Push notifications enabled!' : 'Push notifications disabled.');
    setTimeout(() => setAlertText(''), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      
      {/* Toast Notification Alert */}
      {alertText && (
        <div className="fixed bottom-5 right-5 bg-brand text-white font-semibold text-sm px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-2.5 z-50 animate-bounce">
          <Check className="w-5 h-5" />
          <span>{alertText}</span>
        </div>
      )}

      {/* Settings Grid */}
      <div className="space-y-6">
        
        {/* Card 1: Theme & Display */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 transition-colors">
          <div className="flex items-center gap-3 border-b border-slate-50 dark:border-slate-850 pb-3">
            <Moon className="w-5 h-5 text-brand" />
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              Display & Appearance
            </h3>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Dark Mode</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                Toggle between dark theme and standard light theme across the portal.
              </p>
            </div>
            
            {/* Sliding Toggle Switch */}
            <button 
              onClick={toggleTheme}
              className={`w-14 h-8 rounded-full p-1 transition-all cursor-pointer relative flex items-center ${
                theme === 'dark' ? 'bg-brand justify-end' : 'bg-slate-200 justify-start'
              }`}
              title="Toggle Dark Mode Theme"
            >
              <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md transition-all">
                {theme === 'dark' ? (
                  <Moon className="w-3.5 h-3.5 text-brand" />
                ) : (
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                )}
              </span>
            </button>
          </div>
        </div>

        {/* Card 2: Language Selector */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 transition-colors">
          <div className="flex items-center gap-3 border-b border-slate-50 dark:border-slate-850 pb-3">
            <Globe className="w-5 h-5 text-brand" />
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              Language & Region
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="max-w-md">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">System Language</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                Choose your preferred language for emails, project notifications, and UI labels.
              </p>
            </div>

            <select
              value={language}
              onChange={handleLanguageChange}
              className="w-full sm:w-48 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all text-sm bg-transparent text-slate-700 dark:text-slate-200 cursor-pointer"
            >
              <option value="English">English</option>
              <option value="Hindi">हिंदी (Hindi)</option>
              <option value="Spanish">Español (Spanish)</option>
            </select>
          </div>
        </div>

        {/* Card 3: Notifications Settings */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 transition-colors">
          <div className="flex items-center gap-3 border-b border-slate-50 dark:border-slate-850 pb-3">
            <Bell className="w-5 h-5 text-brand" />
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              Notification Preferences
            </h3>
          </div>

          <div className="space-y-4">
            
            {/* Preference item 1 */}
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Bell className="w-4.5 h-4.5 text-slate-450 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-none">Push Notifications</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                    Receive immediate popup alerts for client messages, application shortlists.
                  </p>
                </div>
              </div>
              <input 
                type="checkbox"
                checked={pushAlerts}
                onChange={handlePushToggle}
                className="w-5 h-5 accent-brand rounded border-slate-300 focus:ring-brand outline-none cursor-pointer shrink-0 mt-0.5"
              />
            </div>

            {/* Preference item 2 */}
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Mail className="w-4.5 h-4.5 text-slate-450 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-none">Email Alerts</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                    Get updates about payments, invoice clearings, and account actions to email.
                  </p>
                </div>
              </div>
              <input 
                type="checkbox"
                checked={emailAlerts}
                onChange={() => setEmailAlerts(!emailAlerts)}
                className="w-5 h-5 accent-brand rounded border-slate-300 focus:ring-brand outline-none cursor-pointer shrink-0 mt-0.5"
              />
            </div>

            {/* Preference item 3 */}
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Sparkles className="w-4.5 h-4.5 text-slate-450 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-none">Weekly Projects Digest</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                    A curated email summary of projects that match your skills.
                  </p>
                </div>
              </div>
              <input 
                type="checkbox"
                checked={weeklyDigest}
                onChange={() => setWeeklyDigest(!weeklyDigest)}
                className="w-5 h-5 accent-brand rounded border-slate-300 focus:ring-brand outline-none cursor-pointer shrink-0 mt-0.5"
              />
            </div>

          </div>
        </div>

        {/* Card 4: Security & Privacy */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 transition-colors">
          <div className="flex items-center gap-3 border-b border-slate-50 dark:border-slate-850 pb-3">
            <User className="w-5 h-5 text-brand" />
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              Privacy Settings
            </h3>
          </div>

          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <Eye className="w-4.5 h-4.5 text-slate-450 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-none">Public Searchability</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                  Allow hiring managers and companies to view your profile and send invitations.
                </p>
              </div>
            </div>
            <input 
              type="checkbox"
              checked={privacyPublic}
              onChange={() => setPrivacyPublic(!privacyPublic)}
              className="w-5 h-5 accent-brand rounded border-slate-300 focus:ring-brand outline-none cursor-pointer shrink-0 mt-0.5"
            />
          </div>
        </div>

      </div>

    </div>
  );
}
