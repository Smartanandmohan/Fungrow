import { useState } from 'react';
import { 
  ArrowLeft, 
  Bookmark, 
  Share2, 
  Clock, 
  Check, 
  Building2, 
  Globe,
  AlertCircle
} from 'lucide-react';
import { mockProjects } from '../data/mockData';
import type { Application } from '../data/mockData';
import Modal from './Modal';

interface ProjectDetailsProps {
  projectId: string;
  onBack: () => void;
  onApply: (projectId: string, coverLetter: string, whyFit: string, portfolioLink: string) => void;
  applications: Application[];
}

export default function ProjectDetails({ 
  projectId, 
  onBack, 
  onApply, 
  applications 
}: ProjectDetailsProps) {
  
  const project = mockProjects.find(p => p.id === projectId);
  
  if (!project) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-8 text-center transition-colors">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-bold mb-2">Project Not Found</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">The project you are trying to view does not exist.</p>
        <button onClick={onBack} className="bg-brand text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-dark cursor-pointer">
          Go Back
        </button>
      </div>
    );
  }

  // Check if user has already applied
  const existingApp = applications.find(app => app.projectId === project.id);
  const hasApplied = !!existingApp;

  // Local States
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [whyFit, setWhyFit] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/project/${project.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coverLetter.trim() || !whyFit.trim()) return;

    // Call global apply handler
    onApply(project.id, coverLetter, whyFit, portfolioLink);
    
    // Close modal, show success screen
    setIsApplyModalOpen(false);
    setShowSuccessOverlay(true);
    
    // Clear form
    setCoverLetter('');
    setWhyFit('');
    setPortfolioLink('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Back Link */}
      <button 
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-brand dark:text-slate-450 dark:hover:text-brand-light transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Browse Projects</span>
      </button>

      {/* Main card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm transition-colors duration-300">
        
        {/* Header Panel */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 pb-6 border-b border-slate-50 dark:border-slate-800/60">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl bg-purple-500 text-white shadow-sm`}>
              {project.companyName.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-1 leading-tight">
                {project.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-300">{project.companyName}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Posted 1 day ago
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 w-full sm:w-auto self-stretch sm:self-auto">
            {/* Save Button */}
            <button 
              onClick={() => setIsSaved(!isSaved)}
              className={`flex-1 sm:flex-none h-11 px-4 rounded-xl border flex items-center justify-center gap-2 text-sm font-semibold transition-all cursor-pointer ${
                isSaved 
                  ? 'bg-amber-50 border-amber-200 text-amber-605 dark:bg-amber-950/20 dark:border-amber-900 dark:text-amber-400' 
                  : 'border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
            
            {/* Share Button */}
            <button 
              onClick={handleShare}
              className="flex-1 sm:flex-none h-11 px-4 rounded-xl border border-slate-200 hover:border-slate-350 dark:border-slate-800 dark:hover:border-slate-700 flex items-center justify-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-305 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Quick Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 mb-8 border border-slate-100/50 dark:border-slate-800/40 transition-colors">
          <div>
            <div className="text-[10px] text-slate-400 dark:text-slate-550 font-bold uppercase tracking-wider mb-0.5">Budget</div>
            <div className="text-base font-black text-brand dark:text-brand-light">₹{project.budget.toLocaleString('en-IN')}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 dark:text-slate-550 font-bold uppercase tracking-wider mb-0.5">Duration</div>
            <div className="text-base font-black text-slate-905 dark:text-white">{project.duration}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 dark:text-slate-550 font-bold uppercase tracking-wider mb-0.5">Skill Level</div>
            <div className="text-base font-black text-slate-905 dark:text-white">{project.skillLevel}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 dark:text-slate-550 font-bold uppercase tracking-wider mb-0.5">Category</div>
            <div className="text-base font-black text-slate-905 dark:text-white">{project.category}</div>
          </div>
        </div>

        {/* Description Section */}
        <div className="space-y-6 mb-8 text-sm">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-3">Project Description</h3>
            <p className="text-slate-655 dark:text-slate-350 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>

          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-3">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <span 
                  key={skill}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-50 text-slate-655 dark:bg-slate-800 dark:text-slate-300 border border-slate-100/50 dark:border-slate-700/50"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-3">About the Client</h3>
            <div className="flex items-center gap-3 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/10">
              <Building2 className="w-5 h-5 text-slate-400" />
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{project.companyName}</h4>
                <div className="flex items-center gap-2 text-xs text-slate-450 dark:text-slate-500 mt-0.5">
                  <span className="inline-flex items-center gap-0.5"><Globe className="w-3.5 h-3.5" /> Verified Profile</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                  <span>5+ Projects Posted</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Apply CTA Section */}
        <div className="pt-6 border-t border-slate-50 dark:border-slate-800/60 flex items-center justify-between">
          <div className="hidden sm:block">
            <span className="text-xs text-slate-450 dark:text-slate-500 font-semibold block">Questions?</span>
            <span className="text-xs text-slate-600 dark:text-slate-455 font-bold">Safe Payments & On-Time Releases Guaranteed</span>
          </div>

          {hasApplied ? (
            <div className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-950 font-bold text-sm">
              <Check className="w-4 h-4" />
              <span>Applied (Status: {existingApp.status})</span>
            </div>
          ) : (
            <button 
              onClick={() => setIsApplyModalOpen(true)}
              className="w-full sm:w-auto bg-brand text-white font-bold px-8 py-3.5 rounded-full hover:bg-brand-dark transition-all shadow-md shadow-brand/10 text-center cursor-pointer"
            >
              Apply Now
            </button>
          )}
        </div>

      </div>

      {/* Application Modal */}
      <Modal 
        isOpen={isApplyModalOpen} 
        onClose={() => setIsApplyModalOpen(false)}
        title={`Apply to ${project.title}`}
      >
        <form onSubmit={handleApplySubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Cover Letter
            </label>
            <textarea
              required
              rows={4}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Introduce yourself and explain why you're interested in this project..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all text-sm bg-transparent dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Why are you a good fit?
            </label>
            <textarea
              required
              rows={3}
              value={whyFit}
              onChange={(e) => setWhyFit(e.target.value)}
              placeholder="Highlight relevant skills, tools you use, or previous similar tasks..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all text-sm bg-transparent dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Portfolio Link (Optional)
            </label>
            <input
              type="url"
              value={portfolioLink}
              onChange={(e) => setPortfolioLink(e.target.value)}
              placeholder="https://yourportfolio.com or GitHub link"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all text-sm bg-transparent dark:text-white"
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={() => setIsApplyModalOpen(false)}
              className="flex-1 border border-slate-200 dark:border-slate-800 text-slate-655 dark:text-slate-350 font-bold px-4 py-3 rounded-xl hover:bg-slate-55 dark:hover:bg-slate-850 transition-colors cursor-pointer text-sm text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-brand text-white font-bold px-4 py-3 rounded-xl hover:bg-brand-dark transition-all cursor-pointer text-sm text-center"
            >
              Submit Application
            </button>
          </div>
        </form>
      </Modal>

      {/* Success Notification Modal */}
      <Modal
        isOpen={showSuccessOverlay}
        onClose={() => setShowSuccessOverlay(false)}
      >
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100 dark:border-emerald-900 animate-bounce">
            <Check className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
            Application Submitted Successfully
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto mb-6">
            Your proposal has been sent to {project.companyName}. You can track its progress in the "My Applications" tab.
          </p>
          <button 
            onClick={() => setShowSuccessOverlay(false)}
            className="bg-brand text-white font-bold px-6 py-2.5 rounded-full text-sm hover:bg-brand-dark transition-all cursor-pointer"
          >
            Awesome!
          </button>
        </div>
      </Modal>

    </div>
  );
}
