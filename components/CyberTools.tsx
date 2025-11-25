import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { Braces, Code, GitCompare } from 'lucide-react';

interface CyberToolsProps {
  language: Language;
}

const CyberTools: React.FC<CyberToolsProps> = ({ language }) => {
  const t = TRANSLATIONS[language].tools;
  const [activeTab, setActiveTab] = useState<'encoder' | 'json' | 'diff'>('encoder');
  
  // Encoder State
  const [input, setInput] = useState('');
  
  // JSON State
  const [jsonInput, setJsonInput] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);

  // Diff State
  const [diffOriginal, setDiffOriginal] = useState('');
  const [diffModified, setDiffModified] = useState('');
  const [diffResult, setDiffResult] = useState<{line: string, status: 'same' | 'added' | 'removed'}[]>([]);

  const getEncodings = (text: string) => {
    if (!text) return [];
    try {
      return [
        { label: 'Base64', val: btoa(text) },
        { label: 'URL Encoded', val: encodeURIComponent(text) },
        { label: 'Hex', val: text.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('') },
        { label: 'HTML Entity', val: text.replace(/[\u00A0-\u9999<>&]/gim, i => '&#' + i.charCodeAt(0) + ';') }
      ];
    } catch (e) {
      return [{ label: t.error, val: 'Invalid input for encoding' }];
    }
  };

  const getDecodings = (text: string) => {
    if (!text) return [];
    const results = [];
    try { results.push({ label: 'Base64 Decode', val: atob(text) }); } catch {}
    try { results.push({ label: 'URL Decode', val: decodeURIComponent(text) }); } catch {}
    return results;
  };

  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, 2));
      setJsonError(null);
    } catch (e: any) {
      setJsonError(e.message);
    }
  };

  const computeDiff = () => {
    const originalLines = diffOriginal.split('\n');
    const modifiedLines = diffModified.split('\n');
    const maxLines = Math.max(originalLines.length, modifiedLines.length);
    
    const result = [];
    
    // Very basic line-by-line diff for MVP
    for (let i = 0; i < maxLines; i++) {
        const org = originalLines[i] || '';
        const mod = modifiedLines[i] || '';
        
        if (org === mod) {
            result.push({ line: org, status: 'same' as const });
        } else {
            if (org) result.push({ line: org, status: 'removed' as const });
            if (mod) result.push({ line: mod, status: 'added' as const });
        }
    }
    setDiffResult(result);
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex space-x-4 border-b border-cyber-700 pb-1">
        <button 
          onClick={() => setActiveTab('encoder')}
          className={`pb-3 px-2 font-medium text-sm transition-colors ${activeTab === 'encoder' ? 'text-cyber-accent border-b-2 border-cyber-accent' : 'text-slate-400 hover:text-white'}`}
        >
          <div className="flex items-center space-x-2">
            <Code size={16} />
            <span>{t.encoder}</span>
          </div>
        </button>
        <button 
          onClick={() => setActiveTab('json')}
          className={`pb-3 px-2 font-medium text-sm transition-colors ${activeTab === 'json' ? 'text-cyber-accent border-b-2 border-cyber-accent' : 'text-slate-400 hover:text-white'}`}
        >
          <div className="flex items-center space-x-2">
            <Braces size={16} />
            <span>{t.formatter}</span>
          </div>
        </button>
        <button 
          onClick={() => setActiveTab('diff')}
          className={`pb-3 px-2 font-medium text-sm transition-colors ${activeTab === 'diff' ? 'text-cyber-accent border-b-2 border-cyber-accent' : 'text-slate-400 hover:text-white'}`}
        >
          <div className="flex items-center space-x-2">
            <GitCompare size={16} />
            <span>{t.diff}</span>
          </div>
        </button>
      </div>

      {activeTab === 'encoder' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-slate-300">{t.input}</label>
                <span className="text-[10px] text-slate-500 uppercase">{t.supported}</span>
            </div>
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-cyber-800 border border-cyber-700 rounded-xl p-4 text-white font-mono focus:outline-none focus:border-cyber-accent resize-none"
              placeholder="..."
            />
          </div>
          <div className="space-y-4 overflow-y-auto">
            <label className="text-sm font-bold text-slate-300 mb-2">{t.transformations}</label>
            {getEncodings(input).map((item, idx) => (
              <div key={idx} className="bg-cyber-800 border border-cyber-700 rounded-xl p-4">
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-bold">{item.label}</div>
                <div className="font-mono text-green-400 break-all text-sm">{item.val}</div>
              </div>
            ))}
            {getDecodings(input).length > 0 && (
              <div className="pt-4 border-t border-cyber-700 mt-4">
                <span className="text-xs text-cyber-accent font-bold uppercase mb-4 block">{t.decoded}</span>
                {getDecodings(input).map((item, idx) => (
                  <div key={`dec-${idx}`} className="bg-cyber-800 border border-cyber-700 rounded-xl p-4 mb-2">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-bold">{item.label}</div>
                    <div className="font-mono text-white break-all text-sm">{item.val}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'json' && (
        <div className="flex flex-col h-full flex-1 min-h-[400px]">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-bold text-slate-300">{t.jsonInput}</label>
            <div className="space-x-2">
              <button onClick={formatJson} className="bg-cyber-accent hover:bg-cyber-accentHover text-white px-4 py-1.5 rounded text-sm font-medium">{t.prettify}</button>
              <button onClick={() => setJsonInput('')} className="bg-cyber-700 hover:bg-cyber-600 text-white px-4 py-1.5 rounded text-sm font-medium">{t.clear}</button>
            </div>
          </div>
          {jsonError && (
             <div className="bg-red-900/20 border border-red-500/50 text-red-200 px-4 py-2 rounded mb-4 text-sm font-mono">
               {t.error}: {jsonError}
             </div>
          )}
          <textarea 
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="flex-1 bg-cyber-800 border border-cyber-700 rounded-xl p-4 text-green-400 font-mono focus:outline-none focus:border-cyber-accent resize-none"
            placeholder="{ 'paste': 'json_here' }"
          />
        </div>
      )}

      {activeTab === 'diff' && (
        <div className="flex flex-col h-full flex-1">
             <div className="grid grid-cols-2 gap-4 mb-4 h-1/2">
                <div className="flex flex-col">
                    <label className="text-sm font-bold text-slate-300 mb-2">{t.original}</label>
                    <textarea 
                        value={diffOriginal}
                        onChange={(e) => setDiffOriginal(e.target.value)}
                        className="flex-1 bg-cyber-800 border border-cyber-700 rounded-xl p-4 text-slate-300 font-mono text-xs focus:outline-none focus:border-cyber-accent resize-none"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-bold text-slate-300 mb-2">{t.modified}</label>
                    <textarea 
                        value={diffModified}
                        onChange={(e) => setDiffModified(e.target.value)}
                        className="flex-1 bg-cyber-800 border border-cyber-700 rounded-xl p-4 text-slate-300 font-mono text-xs focus:outline-none focus:border-cyber-accent resize-none"
                    />
                </div>
             </div>
             <div className="flex justify-center mb-4">
                 <button onClick={computeDiff} className="bg-cyber-accent hover:bg-cyber-accentHover text-white px-8 py-2 rounded-lg font-bold flex items-center space-x-2">
                    <GitCompare size={18} />
                    <span>{t.compare}</span>
                 </button>
             </div>
             <div className="flex-1 bg-cyber-800 border border-cyber-700 rounded-xl p-4 overflow-y-auto font-mono text-xs">
                {diffResult.length === 0 ? (
                    <div className="text-slate-500 text-center mt-10">{t.noDiff}</div>
                ) : (
                    diffResult.map((res, idx) => (
                        <div key={idx} className={`flex ${
                            res.status === 'added' ? 'bg-green-900/30 text-green-300' :
                            res.status === 'removed' ? 'bg-red-900/30 text-red-300' :
                            'text-slate-400'
                        } px-2`}>
                            <span className="w-6 shrink-0 select-none opacity-50 text-right mr-4 border-r border-slate-700 pr-2">{idx + 1}</span>
                            <span className="break-all whitespace-pre-wrap">
                                {res.status === 'added' && '+ '}
                                {res.status === 'removed' && '- '}
                                {res.line}
                            </span>
                        </div>
                    ))
                )}
             </div>
        </div>
      )}
    </div>
  );
};

export default CyberTools;