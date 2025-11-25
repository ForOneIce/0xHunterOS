
import React, { useState } from 'react';
import { ViewState, Language } from './types';
import Sidebar from './components/Sidebar';
import ReportWriter from './components/ReportWriter';
import PayloadGenerator from './components/PayloadGenerator';
import ToolDashboard from './components/ToolDashboard';
import CyberTools from './components/CyberTools';
import TargetManager from './components/TargetManager';
import PromptLibrary from './components/PromptLibrary';
import KnowledgeBase from './components/KnowledgeBase';
import { Globe } from 'lucide-react';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>('target-manager');
  const [language, setLanguage] = useState<Language>('zh');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'target-manager':
        return <TargetManager language={language} />;
      case 'report-writer':
        return <ReportWriter language={language} />;
      case 'payloads':
        return <PayloadGenerator language={language} />;
      case 'resources':
        return <ToolDashboard language={language} />;
      case 'cyber-tools':
        return <CyberTools language={language} />;
      case 'prompts':
        return <PromptLibrary language={language} />;
      case 'knowledge-base':
        return <KnowledgeBase language={language} />;
      default:
        return <TargetManager language={language} />;
    }
  };

  const getViewTitle = () => {
    if (language === 'zh') {
        const map: Record<ViewState, string> = {
            'target-manager': '项目管理',
            'report-writer': '漏洞报告助手',
            'cyber-tools': '编码工具箱',
            'payloads': 'Payload 仓库',
            'knowledge-base': '知识库',
            'resources': '工具导航',
            'prompts': 'AI 提示词库'
        };
        return map[activeView];
    }
    return activeView.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="flex h-screen w-full bg-cyber-900 text-cyber-text font-sans overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar activeView={activeView} setActiveView={setActiveView} language={language} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-cyber-900 relative">
        <header className="sticky top-0 z-20 bg-cyber-900/90 backdrop-blur border-b border-cyber-800 px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight text-white capitalize">
            {getViewTitle()}
          </h1>
          <div className="flex items-center space-x-6">
             <button 
                onClick={toggleLanguage}
                className="flex items-center space-x-2 bg-cyber-800 hover:bg-cyber-700 text-slate-300 px-3 py-1.5 rounded-lg border border-cyber-700 transition-colors text-sm"
             >
                <Globe size={14} />
                <span>{language === 'en' ? '中文' : 'English'}</span>
             </button>
             <div className="flex items-center space-x-4 text-sm text-slate-400">
                <span>v1.2.0</span>
                <span className="w-2 h-2 rounded-full bg-cyber-accent"></span>
                <span>Online</span>
             </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
