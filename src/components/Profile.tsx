import { useState } from 'react';
import { 
  Plus, 
  X, 
  Save, 
  Link as LinkIcon, 
  Trash2,
  Camera,
  Check
} from 'lucide-react';
import type { UserProfile } from '../data/mockData';
import Modal from './Modal';

interface ProfileProps {
  userProfile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
}

export default function Profile({ userProfile, onSaveProfile }: ProfileProps) {
  const [name, setName] = useState(userProfile.name);
  const [age, setAge] = useState(userProfile.age);
  const [education, setEducation] = useState(userProfile.education);
  const [skills, setSkills] = useState([...userProfile.skills]);
  const [portfolio, setPortfolio] = useState([...userProfile.portfolio]);
  const [avatar, setAvatar] = useState(userProfile.avatar || '');

  // Local helper states
  const [newSkill, setNewSkill] = useState('');
  const [showSaveToast, setShowSaveToast] = useState(false);
  
  // States for adding portfolio items
  const [isPortModalOpen, setIsPortModalOpen] = useState(false);
  const [portTitle, setPortTitle] = useState('');
  const [portLink, setPortLink] = useState('');
  const [portDesc, setPortDesc] = useState('');

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleAddPortfolioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!portTitle.trim()) return;
    
    setPortfolio([
      ...portfolio, 
      { title: portTitle.trim(), link: portLink.trim(), description: portDesc.trim() }
    ]);
    
    // Reset & Close
    setPortTitle('');
    setPortLink('');
    setPortDesc('');
    setIsPortModalOpen(false);
  };

  const handleRemovePortfolio = (indexToRemove: number) => {
    setPortfolio(portfolio.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSaveAll = () => {
    onSaveProfile({
      name,
      age: Number(age),
      skills,
      education,
      portfolio,
      avatar
    });
    
    // Show toast
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 2000);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      
      {/* Toast Alert */}
      {showSaveToast && (
        <div className="fixed bottom-5 right-5 bg-emerald-500 text-white font-semibold text-sm px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-2.5 z-50 animate-bounce">
          <Check className="w-5 h-5" />
          <span>Profile Saved Successfully!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Avatar & Live Preview Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm text-center transition-colors">
            
            {/* Avatar Preview & Input */}
            <div className="relative w-32 h-32 mx-auto mb-4 group">
              {avatar ? (
                <img 
                  src={avatar} 
                  alt="Profile Avatar" 
                  className="w-full h-full rounded-full object-cover border-4 border-brand-light dark:border-brand/20 shadow-md"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-brand-light text-brand dark:bg-brand/20 dark:text-brand-light flex items-center justify-center font-black text-3xl border-4 border-white dark:border-slate-800 shadow-md">
                  {getInitials(name)}
                </div>
              )}
              
              {/* Camera Icon Overlay */}
              <label 
                htmlFor="avatar-upload"
                className="absolute bottom-1 right-1 bg-brand text-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg hover:bg-brand-dark cursor-pointer transition-colors"
                title="Upload Profile Picture"
              >
                <Camera className="w-4 h-4" />
                <input 
                  type="file" 
                  id="avatar-upload" 
                  accept="image/*" 
                  onChange={handleImageChange}
                  className="hidden" 
                />
              </label>
            </div>

            <h3 className="text-lg font-black text-slate-905 dark:text-white leading-tight">{name}</h3>
            <span className="text-xs font-semibold text-slate-450 dark:text-slate-500 block mt-1">
              Age: {age} • Teen Professional
            </span>

            <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-850 grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl transition-colors">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Skills</span>
                <span className="text-sm font-black text-slate-905 dark:text-white">{skills.length}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl transition-colors">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Projects</span>
                <span className="text-sm font-black text-slate-905 dark:text-white">{portfolio.length}</span>
              </div>
            </div>

            <button
              onClick={handleSaveAll}
              className="w-full mt-6 bg-brand hover:bg-brand-dark text-white font-bold h-11 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-brand/10 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile</span>
            </button>
          </div>
        </div>

        {/* Right Column: Edit Details Form */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section 1: Basic Info */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 transition-colors">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base border-b border-slate-50 dark:border-slate-850 pb-3">
              Basic Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-205 dark:border-slate-800 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all text-sm bg-transparent dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Age
                </label>
                <input 
                  type="number" 
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-205 dark:border-slate-800 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all text-sm bg-transparent dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Education
              </label>
              <textarea 
                rows={2}
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="School name, class, grade..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-205 dark:border-slate-800 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all text-sm bg-transparent dark:text-white"
              />
            </div>
          </div>

          {/* Section 2: Skills Editor */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 transition-colors">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base border-b border-slate-50 dark:border-slate-850 pb-3">
              Professional Skills
            </h3>

            {/* Tags wrapper */}
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill) => (
                <span 
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-brand-light text-brand dark:bg-brand/10 dark:text-brand-light"
                >
                  <span>{skill}</span>
                  <button 
                    type="button" 
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-red-500 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>

            {/* Input tag form */}
            <form onSubmit={handleAddSkill} className="flex gap-2">
              <input 
                type="text" 
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="e.g. Photoshop, SEO, Python..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-205 dark:border-slate-800 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all text-sm bg-transparent dark:text-white"
              />
              <button 
                type="submit"
                className="h-11 px-4 bg-slate-900 dark:bg-slate-800 text-white rounded-xl flex items-center justify-center hover:bg-slate-850 dark:hover:bg-slate-700 transition-colors cursor-pointer text-xs font-bold gap-1.5 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </form>
          </div>

          {/* Section 3: Portfolio Editor */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 transition-colors">
            <div className="flex justify-between items-center border-b border-slate-50 dark:border-slate-850 pb-3">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                Portfolio Projects
              </h3>
              <button 
                onClick={() => setIsPortModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:text-brand-dark transition-colors cursor-pointer"
              >
                <Plus className="w-4.5 h-4.5" /> Add Project
              </button>
            </div>

            {/* Portfolio Grid list */}
            {portfolio.length === 0 ? (
              <p className="text-slate-450 dark:text-slate-500 text-xs text-center py-6">No portfolio items added yet. Click above to add some!</p>
            ) : (
              <div className="space-y-4">
                {portfolio.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/20 dark:bg-slate-950/20 flex justify-between items-start gap-4 hover:shadow-sm transition-all"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">{item.title}</h4>
                        {item.link && (
                          <a 
                            href={item.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-slate-400 hover:text-brand transition-colors"
                          >
                            <LinkIcon className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">{item.description}</p>
                    </div>
                    
                    <button 
                      onClick={() => handleRemovePortfolio(idx)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-100 hover:border-red-200 hover:bg-red-50 hover:text-red-550 dark:border-slate-800 dark:hover:border-red-950/20 text-slate-400 transition-all cursor-pointer shrink-0"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Add Portfolio Modal */}
      <Modal
        isOpen={isPortModalOpen}
        onClose={() => setIsPortModalOpen(false)}
        title="Add Portfolio Project"
      >
        <form onSubmit={handleAddPortfolioSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Project Title
            </label>
            <input 
              type="text" 
              required
              value={portTitle}
              onChange={(e) => setPortTitle(e.target.value)}
              placeholder="e.g. Personal Website, Poster Design..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-205 dark:border-slate-800 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all text-sm bg-transparent dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Project Link (Optional)
            </label>
            <input 
              type="url" 
              value={portLink}
              onChange={(e) => setPortLink(e.target.value)}
              placeholder="https://github.com/yourproject or Behance URL"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-205 dark:border-slate-800 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all text-sm bg-transparent dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea 
              rows={3}
              value={portDesc}
              onChange={(e) => setPortDesc(e.target.value)}
              placeholder="Describe what you built, what tools you used, and what you learned..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-205 dark:border-slate-800 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all text-sm bg-transparent dark:text-white"
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={() => setIsPortModalOpen(false)}
              className="flex-1 border border-slate-200 dark:border-slate-800 text-slate-655 dark:text-slate-350 font-bold px-4 py-3 rounded-xl hover:bg-slate-55 dark:hover:bg-slate-850 transition-colors cursor-pointer text-sm text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-brand text-white font-bold px-4 py-3 rounded-xl hover:bg-brand-dark transition-all cursor-pointer text-sm text-center"
            >
              Save Project
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
