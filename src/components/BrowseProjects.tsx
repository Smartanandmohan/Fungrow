import { useState, useEffect } from 'react';
import { 
  Search, 
  Clock, 
  Briefcase, 
  ArrowRight,
  RefreshCw,
  Palette,
  PenTool,
  Video,
  Code2,
  Share2,
  HelpCircle
} from 'lucide-react';
import { mockProjects, mockCategories } from '../data/mockData';

interface BrowseProjectsProps {
  onSelectProject: (id: string) => void;
  initialCategoryFilter?: string;
  onClearInitialCategory?: () => void;
}

export default function BrowseProjects({ 
  onSelectProject, 
  initialCategoryFilter = '', 
  onClearInitialCategory 
}: BrowseProjectsProps) {
  
  // State variables for filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryFilter);
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedBudget, setSelectedBudget] = useState('All'); // 'All' | 'under-3k' | '3k-6k' | 'over-6k'

  // Apply initial category filter if passed from the home page
  useEffect(() => {
    if (initialCategoryFilter) {
      setSelectedCategory(initialCategoryFilter);
    }
  }, [initialCategoryFilter]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedLevel('All');
    setSelectedBudget('All');
    if (onClearInitialCategory) {
      onClearInitialCategory();
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
      'bg-cyan-500 text-white',
    ];
    let sum = 0;
    for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
    return colors[sum % colors.length];
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Graphic Design': return <Palette className="w-3.5 h-3.5" />;
      case 'Content Writing': return <PenTool className="w-3.5 h-3.5" />;
      case 'Video Editing': return <Video className="w-3.5 h-3.5" />;
      case 'Web Development': return <Code2 className="w-3.5 h-3.5" />;
      case 'Social Media': return <Share2 className="w-3.5 h-3.5" />;
      default: return <HelpCircle className="w-3.5 h-3.5" />;
    }
  };

  const filteredProjects = mockProjects.filter((project) => {
    // Search filter
    const matchesSearch = 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

    // Category filter
    const matchesCategory = 
      selectedCategory === 'All' || selectedCategory === '' || project.category === selectedCategory;

    // Skill Level filter
    const matchesLevel = 
      selectedLevel === 'All' || project.skillLevel === selectedLevel;

    // Budget filter
    let matchesBudget = true;
    if (selectedBudget === 'under-3k') {
      matchesBudget = project.budget < 3000;
    } else if (selectedBudget === '3k-6k') {
      matchesBudget = project.budget >= 3000 && project.budget <= 6000;
    } else if (selectedBudget === 'over-6k') {
      matchesBudget = project.budget > 6000;
    }

    return matchesSearch && matchesCategory && matchesLevel && matchesBudget;
  });

  return (
    <div className="space-y-6">
      
      {/* Search & Filters Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm transition-colors duration-300">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Search Bar */}
          <div className="md:col-span-5 relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
              <Search className="w-5 h-5" />
            </span>
            <input 
              type="text" 
              placeholder="Search projects, skills, or companies..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all text-sm bg-transparent dark:text-white"
            />
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-2.5">
            <select
              value={selectedCategory === '' ? 'All' : selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all text-sm bg-transparent text-slate-700 dark:text-slate-200 cursor-pointer"
            >
              <option value="All">All Categories</option>
              {mockCategories.map(cat => (
                <option key={cat.name} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Skill Level Dropdown */}
          <div className="md:col-span-2">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all text-sm bg-transparent text-slate-700 dark:text-slate-200 cursor-pointer"
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Budget Dropdown */}
          <div className="md:col-span-2">
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all text-sm bg-transparent text-slate-700 dark:text-slate-200 cursor-pointer"
            >
              <option value="All">All Budgets</option>
              <option value="under-3k">Under ₹3,000</option>
              <option value="3k-6k">₹3,000 - ₹6,000</option>
              <option value="over-6k">Over ₹6,000</option>
            </select>
          </div>

          {/* Reset Filters Icon Button */}
          <div className="md:col-span-0.5 flex justify-center items-center">
            <button 
              onClick={handleResetFilters}
              className="w-11 h-11 border border-slate-200 dark:border-slate-800 hover:border-brand hover:text-brand dark:hover:border-brand rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors cursor-pointer"
              title="Reset Filters"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Selected Categories Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-50 dark:border-slate-850">
          <span className="text-xs font-semibold text-slate-450 dark:text-slate-500">Popular:</span>
          {['All', ...mockCategories.map(c => c.name)].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === 'All' ? 'All' : cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                (selectedCategory === cat || (cat === 'All' && (selectedCategory === 'All' || selectedCategory === '')))
                  ? 'bg-brand/10 text-brand dark:bg-brand/20 dark:text-brand-light' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-slate-800/50 dark:text-slate-350 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Available Projects ({filteredProjects.length})
          </h3>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center">
            <Briefcase className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No Projects Found</h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mx-auto mb-6">
              We couldn't find any projects matching your current filters. Try resetting the filters or tweaking your keywords.
            </p>
            <button 
              onClick={handleResetFilters}
              className="bg-brand text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-brand-dark transition-all cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-5 hover:shadow-xl hover:shadow-brand/5 hover:-translate-y-1 transition-all duration-350 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header: Company Info and Level */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm ${getCompanyColor(project.companyName)}`}>
                        {project.companyName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-850 dark:text-slate-300 leading-tight">
                          {project.companyName}
                        </h4>
                        <div className="flex items-center gap-1 mt-0.5 text-[10px] text-slate-450 dark:text-slate-500 font-semibold">
                          <span>{project.datePosted}</span>
                        </div>
                      </div>
                    </div>
                    
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      project.skillLevel === 'Beginner' 
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400' 
                        : project.skillLevel === 'Intermediate'
                          ? 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400'
                          : 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400'
                    }`}>
                      {project.skillLevel}
                    </span>
                  </div>

                  {/* Title & Category */}
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-2 line-clamp-1 hover:text-brand transition-colors cursor-pointer" onClick={() => onSelectProject(project.id)}>
                    {project.title}
                  </h3>

                  <div className="inline-flex items-center gap-1.5 text-xs text-brand bg-brand-light dark:bg-brand/10 dark:text-brand-light px-2.5 py-1 rounded-full font-semibold mb-4">
                    {getCategoryIcon(project.category)}
                    <span>{project.category}</span>
                  </div>

                  {/* Description Snippet */}
                  <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Required Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.skills.slice(0, 3).map((skill) => (
                      <span 
                        key={skill}
                        className="text-[10px] font-medium bg-slate-50 text-slate-655 dark:bg-slate-800 dark:text-slate-300 px-2 py-0.5 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                    {project.skills.length > 3 && (
                      <span className="text-[10px] font-medium text-slate-450 dark:text-slate-500 px-1 py-0.5">
                        +{project.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer: budget, duration, apply CTA */}
                <div className="border-t border-slate-50 dark:border-slate-800/60 pt-4 flex items-center justify-between mt-auto">
                  <div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Budget</div>
                    <div className="text-sm font-black text-brand dark:text-brand-light">
                      ₹{project.budget.toLocaleString('en-IN')}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-medium">{project.duration}</span>
                  </div>

                  <button 
                    onClick={() => onSelectProject(project.id)}
                    className="w-8 h-8 rounded-full bg-brand-light text-brand hover:bg-brand hover:text-white dark:bg-brand/10 dark:text-brand-light dark:hover:bg-brand dark:hover:text-white flex items-center justify-center transition-all cursor-pointer"
                    title="View Details"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
