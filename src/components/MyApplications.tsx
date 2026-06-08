import { 
  FileText, 
  Clock, 
  MessageSquare, 
  Eye, 
  CheckCircle, 
  XCircle, 
  AlertCircle
} from 'lucide-react';
import type { Application } from '../data/mockData';

interface MyApplicationsProps {
  applications: Application[];
  onSelectProject: (id: string) => void;
  onOpenChat: (companyName: string, projectTitle: string) => void;
}

export default function MyApplications({ 
  applications, 
  onSelectProject,
  onOpenChat
}: MyApplicationsProps) {

  const getStatusBadge = (status: Application['status']) => {
    switch (status) {
      case 'Applied':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-950">
            <Clock className="w-3.5 h-3.5" />
            <span>Applied</span>
          </span>
        );
      case 'Shortlisted':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 px-3 py-1 rounded-full border border-amber-100 dark:border-amber-950">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Shortlisted</span>
          </span>
        );
      case 'Accepted':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-950">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Accepted</span>
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 px-3 py-1 rounded-full border border-rose-100 dark:border-rose-950">
            <XCircle className="w-3.5 h-3.5" />
            <span>Rejected</span>
          </span>
        );
      default:
        return null;
    }
  };

  const getCompanyColor = (name: string) => {
    const colors = [
      'bg-indigo-500 text-white',
      'bg-emerald-500 text-white',
      'bg-rose-500 text-white',
      'bg-amber-500 text-white',
      'bg-purple-500 text-white',
      'bg-blue-500 text-white',
    ];
    let sum = 0;
    for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
    return colors[sum % colors.length];
  };

  return (
    <div className="space-y-6">
      
      {/* Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-sm transition-colors duration-300">
          <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">Total Applications</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{applications.length}</div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-sm transition-colors duration-300">
          <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">Shortlisted</div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
            {applications.filter(a => a.status === 'Shortlisted').length}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-sm transition-colors duration-300">
          <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">Accepted</div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {applications.filter(a => a.status === 'Accepted').length}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-sm transition-colors duration-300">
          <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">Pending Review</div>
          <div className="text-2xl font-black text-blue-600 dark:text-blue-400">
            {applications.filter(a => a.status === 'Applied').length}
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm transition-colors duration-300">
        
        {applications.length === 0 ? (
          <div className="py-12 text-center">
            <FileText className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No Applications Yet</h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto mb-6">
              You haven't applied for any projects yet. Go to the browse page to find work!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div 
                key={app.id}
                className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/20 dark:bg-slate-950/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md hover:border-slate-205 dark:hover:border-slate-700 transition-all duration-300"
              >
                {/* Left block - Project Details */}
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-base shrink-0 shadow-sm ${getCompanyColor(app.companyName)}`}>
                    {app.companyName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h3 
                      onClick={() => onSelectProject(app.projectId)}
                      className="text-base font-extrabold text-slate-900 dark:text-white hover:text-brand cursor-pointer transition-colors leading-tight"
                    >
                      {app.projectTitle}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                      <span>{app.companyName}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-705"></span>
                      <span className="text-brand dark:text-brand-light">₹{app.budget.toLocaleString('en-IN')}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-705"></span>
                      <span>Applied on {app.appliedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Right block - Status & Quick CTAs */}
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto shrink-0 pt-3 md:pt-0 border-t border-slate-100 dark:border-slate-800/50 md:border-0 justify-between md:justify-end">
                  {getStatusBadge(app.status)}

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => onSelectProject(app.projectId)}
                      className="h-10 w-10 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-brand hover:text-brand text-slate-550 dark:text-slate-350 dark:hover:border-brand flex items-center justify-center transition-all cursor-pointer"
                      title="View Project Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    {/* Only allow chat if Shortlisted or Accepted */}
                    {(app.status === 'Shortlisted' || app.status === 'Accepted') && (
                      <button 
                        onClick={() => onOpenChat(app.companyName, app.projectTitle)}
                        className="h-10 px-4 bg-brand-light text-brand hover:bg-brand hover:text-white dark:bg-brand/10 dark:text-brand-light dark:hover:bg-brand dark:hover:text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm shadow-brand/5"
                        title="Chat with Employer"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Chat</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
