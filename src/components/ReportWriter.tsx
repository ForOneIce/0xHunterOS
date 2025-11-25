import React, { useState, useEffect } from 'react';
import { REPORT_TEMPLATES } from '../constants';
import { Language, ReportTemplate } from '../types';
import { TRANSLATIONS } from '../translations';
import { Download, Plus, X, Check } from 'lucide-react';

interface ReportWriterProps {
  language: Language;
}

const ReportWriter: React.FC<ReportWriterProps> = ({ language }) => {
  const t = TRANSLATIONS[language].report;
  
  // Content State
  const [content, setContent] = useState(REPORT_TEMPLATES[0].content);
  const [title, setTitle] = useState(t.titlePlaceholder);

  // Custom Templates State
  const [customTemplates, setCustomTemplates] = useState<ReportTemplate[]>(() => {
    try {
      const saved = localStorage.getItem('hunteros_custom_templates');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // UI State for Naming
  const [isNaming, setIsNaming] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');

  const allTemplates = [...REPORT_TEMPLATES, ...customTemplates];

  const loadTemplate = (id: string) => {
    const template = allTemplates.find(t => t.id === id);
    if (template) setContent(template.content);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = `${title.replace(/\s+/g, '_')}.md`;
    document.body.appendChild(element);
    element.click();
  };

  const saveCustomTemplate = () => {
    if (!newTemplateName.trim()) return;

    const newTemplate: ReportTemplate = {
      id: `custom-${Date.now()}`,
      name: newTemplateName,
      platform: 'Custom',
      content: content
    };

    const updatedTemplates = [...customTemplates, newTemplate];
    setCustomTemplates(updatedTemplates);
    localStorage.setItem('hunteros_custom_templates', JSON.stringify(updatedTemplates));
    
    // Reset UI
    setIsNaming(false);
    setNewTemplateName('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent text-2xl font-bold text-white focus:outline-none border-b border-transparent focus:border-cyber-accent pb-1 placeholder-slate-600 w-full md:w-auto"
            placeholder={t.titlePlaceholder}
          />
        </div>
        
        <div className="flex space-x-3 items-center">
          {isNaming ? (
            <div className="flex items-center space-x-2 bg-cyber-800 p-1 rounded-lg border border-cyber-700 animate-in fade-in slide-in-from-right-4 duration-200">
              <input 
                autoFocus
                type="text" 
                value={newTemplateName}
                onChange={(e) => setNewTemplateName(e.target.value)}
                className="bg-cyber-900 text-sm text-white px-3 py-1.5 rounded border border-cyber-700 focus:border-cyber-accent outline-none w-48 placeholder-slate-500"
                placeholder={t.templateName}
                onKeyDown={(e) => e.key === 'Enter' && saveCustomTemplate()}
              />
              <button 
                onClick={saveCustomTemplate}
                className="p-1.5 bg-cyber-accent text-white rounded hover:bg-cyber-accentHover transition-colors"
                title={t.confirm}
              >
                <Check size={14} />
              </button>
              <button 
                onClick={() => setIsNaming(false)}
                className="p-1.5 bg-cyber-700 text-slate-300 rounded hover:bg-cyber-600 transition-colors"
                title={t.cancel}
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <>
              <select 
                onChange={(e) => {
                  loadTemplate(e.target.value);
                  e.target.value = ''; // Reset select
                }}
                className="bg-cyber-800 text-sm text-white px-4 py-2 rounded-lg border border-cyber-700 focus:outline-none focus:border-cyber-accent max-w-[160px] md:max-w-[200px]"
                value=""
              >
                <option value="" disabled>{t.template}</option>
                {allTemplates.map(tmpl => (
                  <option key={tmpl.id} value={tmpl.id}>
                    {tmpl.platform === 'Custom' ? '(Custom) ' : ''}{tmpl.name}
                  </option>
                ))}
              </select>

              <button 
                onClick={() => setIsNaming(true)}
                className="flex items-center space-x-2 bg-cyber-800 hover:bg-cyber-700 text-cyber-accent border border-cyber-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                title={t.saveTemplate}
              >
                <Plus size={16} />
                <span className="hidden md:inline">{t.saveTemplate}</span>
              </button>

              <button 
                onClick={handleDownload}
                className="flex items-center space-x-2 bg-cyber-700 hover:bg-cyber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Download size={16} />
                <span className="hidden md:inline">{t.export}</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        <div className="flex flex-col bg-cyber-800 rounded-xl border border-cyber-700 overflow-hidden">
          <div className="bg-cyber-700 px-4 py-2 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-300">{t.editor}</span>
          </div>
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 bg-cyber-800 p-4 text-sm font-mono text-slate-300 focus:outline-none resize-none"
            spellCheck={false}
          />
        </div>

        <div className="flex flex-col bg-cyber-800 rounded-xl border border-cyber-700 overflow-hidden">
          <div className="bg-cyber-700 px-4 py-2 flex items-center justify-between">
             <span className="text-xs font-mono text-slate-300">{t.preview}</span>
          </div>
          <div className="flex-1 p-4 overflow-y-auto prose prose-invert max-w-none">
            {content.split('\n').map((line, i) => {
              if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-white mt-4 mb-2">{line.replace('## ', '')}</h2>;
              if (line.startsWith('**')) return <p key={i} className="font-bold text-white my-2">{line.replace(/\*\*/g, '')}</p>;
              if (line.startsWith('* ')) return <li key={i} className="ml-4 text-slate-300">{line.replace('* ', '')}</li>;
              if (line.startsWith('`')) return <pre key={i} className="bg-black/30 p-2 rounded text-xs font-mono text-green-400 my-2">{line.replace(/`/g, '')}</pre>;
              return <p key={i} className="text-slate-300 min-h-[1.5rem]">{line}</p>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportWriter;