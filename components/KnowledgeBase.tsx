import React, { useState } from 'react';
import { PUBLIC_REPORTS } from '../constants';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { Search, ExternalLink, Filter } from 'lucide-react';

interface KnowledgeBaseProps {
  language: Language;
}

const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({ language }) => {
  const t = TRANSLATIONS[language].knowledge;
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [platformFilter, setPlatformFilter] = useState('All');

  const platforms = ['All', ...Array.from(new Set(PUBLIC_REPORTS.map(r => r.program)))];
  const severities = ['All', 'Critical', 'High', 'Medium', 'Low'];

  const filteredReports = PUBLIC_REPORTS.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          report.program.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'All' || report.severity === severityFilter;
    const matchesPlatform = platformFilter === 'All' || report.program === platformFilter;
    return matchesSearch && matchesSeverity && matchesPlatform;
  });

  return (
    <div className="space-y-6">
      <div className="bg-cyber-800 p-6 rounded-xl border border-cyber-700">
        <h2 className="text-lg font-bold text-white mb-2">{t.title}</h2>
        <p className="text-slate-400 text-sm mb-6">{t.subtitle}</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-cyber-900 border border-cyber-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-cyber-accent"
            />
          </div>
          
          <div className="relative">
             <Filter className="absolute left-3 top-2.5 text-slate-500" size={16} />
             <select 
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="w-full bg-cyber-900 border border-cyber-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none appearance-none"
             >
                {severities.map(s => <option key={s} value={s}>{s === 'All' ? t.filterSeverity : s}</option>)}
             </select>
          </div>

          <div className="relative">
             <Filter className="absolute left-3 top-2.5 text-slate-500" size={16} />
             <select 
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
                className="w-full bg-cyber-900 border border-cyber-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none appearance-none"
             >
                {platforms.map(p => <option key={p} value={p}>{p === 'All' ? t.filterPlatform : p}</option>)}
             </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredReports.map(report => (
          <div key={report.id} className="bg-cyber-800 border border-cyber-700 rounded-xl p-5 hover:bg-cyber-700 transition-all group">
            <div className="flex justify-between items-start">
                <div>
                   <div className="flex items-center space-x-3 mb-1">
                      <span className="bg-cyber-900 text-slate-300 px-2 py-0.5 rounded text-xs font-bold border border-cyber-600">
                        {report.program}
                      </span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded border ${
                        report.severity === 'Critical' ? 'text-red-400 border-red-900 bg-red-900/20' :
                        report.severity === 'High' ? 'text-orange-400 border-orange-900 bg-orange-900/20' : 
                        report.severity === 'Medium' ? 'text-yellow-400 border-yellow-900 bg-yellow-900/20' :
                        'text-green-400 border-green-900 bg-green-900/20'
                      }`}>
                        {report.severity}
                      </span>
                   </div>
                   <h3 className="text-lg font-bold text-white group-hover:text-cyber-accent transition-colors">
                      {report.title}
                   </h3>
                </div>
                <div className="flex flex-col items-end text-right">
                    <span className="text-cyber-accent font-mono font-bold text-lg">{report.bounty}</span>
                    <a href={report.link} className="flex items-center text-xs text-slate-500 hover:text-white mt-2">
                        <ExternalLink size={12} className="mr-1" />
                        Details
                    </a>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeBase;