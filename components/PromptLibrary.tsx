import React, { useState } from 'react';
import { AI_PROMPTS } from '../constants';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { Copy, Bot } from 'lucide-react';

interface PromptLibraryProps {
  language: Language;
}

const PromptLibrary: React.FC<PromptLibraryProps> = ({ language }) => {
  const t = TRANSLATIONS[language].prompts;
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {AI_PROMPTS.map(prompt => (
        <div key={prompt.id} className="bg-cyber-800 border border-cyber-700 rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-cyber-900 p-2 rounded-lg text-cyber-accent">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold text-white">{prompt.title}</h3>
                <span className="text-xs text-slate-500 uppercase tracking-wider">{prompt.category}</span>
              </div>
            </div>
            <button 
              onClick={() => handleCopy(prompt.prompt, prompt.id)}
              className="text-slate-400 hover:text-white bg-cyber-900 p-2 rounded-lg transition-colors"
            >
              {copiedId === prompt.id ? <span className="text-xs font-bold text-cyber-accent">{t.copied}</span> : <Copy size={18} />}
            </button>
          </div>
          <div className="flex-1 bg-cyber-900/50 rounded-lg p-4 border border-cyber-700/50">
            <p className="text-slate-300 text-sm whitespace-pre-wrap font-mono leading-relaxed">
              {prompt.prompt}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromptLibrary;