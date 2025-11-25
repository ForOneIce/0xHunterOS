import React, { useState } from 'react';
import { XSS_PAYLOADS } from '../constants';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { Copy, Check, Search } from 'lucide-react';

interface PayloadGeneratorProps {
  language: Language;
}

const PayloadGenerator: React.FC<PayloadGeneratorProps> = ({ language }) => {
  const t = TRANSLATIONS[language].payloads;
  const [filter, setFilter] = useState('');
  const [contextFilter, setContextFilter] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredPayloads = XSS_PAYLOADS.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(filter.toLowerCase()) || p.vector.toLowerCase().includes(filter.toLowerCase());
    const matchesContext = contextFilter === 'All' || p.context === contextFilter;
    return matchesSearch && matchesContext;
  });

  const contexts = ['All', ...Array.from(new Set(XSS_PAYLOADS.map(p => p.context)))];

  return (
    <div className="space-y-6">
      <div className="bg-cyber-800 p-6 rounded-xl border border-cyber-700">
        <h2 className="text-lg font-bold text-white mb-2">{t.title}</h2>
        <p className="text-slate-400 text-sm mb-6">
          {t.subtitle}
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder={t.searchPlaceholder}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full bg-cyber-900 border border-cyber-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-cyber-accent"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
            {contexts.map(ctx => (
              <button
                key={ctx}
                onClick={() => setContextFilter(ctx)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  contextFilter === ctx 
                    ? 'bg-cyber-accent text-white' 
                    : 'bg-cyber-900 text-slate-400 border border-cyber-700 hover:border-slate-500'
                }`}
              >
                {ctx === 'All' ? t.all : ctx}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredPayloads.map(payload => (
          <div key={payload.id} className="bg-cyber-800 border border-cyber-700 rounded-xl p-4 hover:border-cyber-600 transition-colors group">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-white font-semibold flex items-center">
                  {payload.title}
                  <span className="ml-3 text-xs px-2 py-0.5 rounded bg-cyber-700 text-slate-300 border border-cyber-600">
                    {payload.context}
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">{payload.description}</p>
              </div>
              <button 
                onClick={() => handleCopy(payload.vector, payload.id)}
                className="text-slate-400 hover:text-cyber-accent transition-colors p-2 rounded-lg hover:bg-cyber-900"
                title={t.copy}
              >
                {copiedId === payload.id ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
            <div className="bg-black/30 p-3 rounded-lg font-mono text-sm text-green-400 break-all border border-cyber-700/50">
              {payload.vector}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PayloadGenerator;