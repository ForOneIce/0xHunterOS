import React from 'react';
import { TOOL_LINKS } from '../constants';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { ExternalLink, Search } from 'lucide-react';

interface ToolDashboardProps {
  language: Language;
}

const ToolDashboard: React.FC<ToolDashboardProps> = ({ language }) => {
  const t = TRANSLATIONS[language].resources;
  const categories = Array.from(new Set(TOOL_LINKS.map(t => t.category)));

  return (
    <div className="space-y-8">
      <div className="max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-slate-500" size={20} />
          <input 
            type="text" 
            placeholder={t.searchPlaceholder}
            className="w-full bg-cyber-800 border border-cyber-700 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-cyber-accent shadow-lg shadow-black/20"
          />
        </div>
      </div>

      <div className="space-y-8">
        {categories.map(cat => (
          <div key={cat}>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <span className="w-2 h-6 bg-cyber-accent rounded mr-3"></span>
              {cat}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {TOOL_LINKS.filter(t => t.category === cat).map(tool => (
                <a 
                  key={tool.name} 
                  href={tool.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-cyber-800 border border-cyber-700 rounded-xl p-5 hover:border-cyber-accent/50 hover:bg-cyber-700 transition-all group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-white group-hover:text-cyber-accent transition-colors">{tool.name}</h4>
                    <ExternalLink size={14} className="text-slate-600 group-hover:text-cyber-accent" />
                  </div>
                  <p className="text-sm text-slate-400">{tool.description}</p>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolDashboard;