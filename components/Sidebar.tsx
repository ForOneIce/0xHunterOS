
import React from 'react';
import { ViewState, Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { 
  FileText, 
  ShieldAlert, 
  Terminal, 
  Zap, 
  Binary,
  BookOpen,
  Crosshair
} from 'lucide-react';

interface SidebarProps {
  activeView: ViewState;
  setActiveView: (view: ViewState) => void;
  language: Language;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, language }) => {
  const t = TRANSLATIONS[language].sidebar;

  const navItems = [
    { id: 'target-manager', label: t.targetManager, icon: Crosshair }, // Replaced Dashboard
    { id: 'report-writer', label: t.reportWriter, icon: FileText },
    { id: 'cyber-tools', label: t.encoders, icon: Binary },
    { id: 'payloads', label: t.payloads, icon: ShieldAlert },
    { id: 'knowledge-base', label: t.knowledgeBase, icon: BookOpen },
    { id: 'prompts', label: t.prompts, icon: Zap },
    { id: 'resources', label: t.resources, icon: Terminal },
  ];

  return (
    <aside className="w-64 bg-cyber-800 border-r border-cyber-700 flex flex-col h-full shrink-0">
      <div className="p-6 flex items-center space-x-3 border-b border-cyber-700">
        <div className="w-8 h-8 bg-cyber-accent rounded-lg flex items-center justify-center">
          <Terminal className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-lg text-white tracking-wider">HunterOS</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as ViewState)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive 
                  ? 'bg-cyber-accent text-white shadow-lg shadow-emerald-900/20' 
                  : 'text-slate-400 hover:bg-cyber-700 hover:text-white'
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-cyber-700">
        <div className="bg-cyber-900 rounded-lg p-4">
          <p className="text-xs text-slate-500 uppercase font-bold mb-2">{t.dailyStat}</p>
          <div className="flex justify-between items-end">
            <div>
              <span className="text-2xl font-mono text-white">
                 {/* This would be dynamic in a real app, keeping simple for now */}
                 {localStorage.getItem('hunteros_targets') ? JSON.parse(localStorage.getItem('hunteros_targets') || '[]').length : 0}
              </span>
              <span className="text-xs text-slate-400 ml-1">{t.reports}</span>
            </div>
            {/* Removed the fake +2 today */}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
