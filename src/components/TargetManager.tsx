
import React, { useState, useEffect } from 'react';
import { Language, BountyTarget } from '../types';
import { TRANSLATIONS } from '../translations';
import { Crosshair, Plus, Trash2, Edit2, CheckCircle, Save } from 'lucide-react';

interface TargetManagerProps {
  language: Language;
}

const TargetManager: React.FC<TargetManagerProps> = ({ language }) => {
  const t = TRANSLATIONS[language].targetManager;
  const statuses = ['New', 'Recon', 'Exploitation', 'Reported', 'Closed'];

  // Load targets from local storage
  const [targets, setTargets] = useState<BountyTarget[]>(() => {
    try {
      const saved = localStorage.getItem('hunteros_targets');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isAdding, setIsAdding] = useState(false);
  
  // New Target Form State
  const [newName, setNewName] = useState('');
  const [newScope, setNewScope] = useState('');
  const [newPlatform, setNewPlatform] = useState('');
  const [newNotes, setNewNotes] = useState('');

  // Persist to local storage
  useEffect(() => {
    localStorage.setItem('hunteros_targets', JSON.stringify(targets));
  }, [targets]);

  const addTarget = () => {
    if (!newName.trim()) return;

    const newTarget: BountyTarget = {
      id: Date.now().toString(),
      name: newName,
      scope: newScope,
      platform: newPlatform || 'Private',
      status: 'New',
      notes: newNotes,
      dateAdded: Date.now()
    };

    setTargets([newTarget, ...targets]);
    // Reset Form
    setNewName('');
    setNewScope('');
    setNewPlatform('');
    setNewNotes('');
    setIsAdding(false);
  };

  const deleteTarget = (id: string) => {
    if (confirm('Are you sure you want to delete this target?')) {
        setTargets(targets.filter(t => t.id !== id));
    }
  };

  const updateStatus = (id: string, status: BountyTarget['status']) => {
    setTargets(targets.map(t => t.id === id ? { ...t, status } : t));
  };

  const updateNotes = (id: string, notes: string) => {
    setTargets(targets.map(t => t.id === id ? { ...t, notes } : t));
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'New': return 'bg-blue-900/50 text-blue-300 border-blue-700';
          case 'Recon': return 'bg-purple-900/50 text-purple-300 border-purple-700';
          case 'Exploitation': return 'bg-red-900/50 text-red-300 border-red-700';
          case 'Reported': return 'bg-green-900/50 text-green-300 border-green-700';
          case 'Closed': return 'bg-slate-800 text-slate-500 border-slate-700';
          default: return 'bg-slate-800';
      }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end border-b border-cyber-700 pb-4">
        <div>
            <h2 className="text-xl font-bold text-white mb-1 flex items-center">
                <Crosshair className="mr-2 text-cyber-accent" size={24} />
                {t.title}
            </h2>
            <p className="text-slate-400 text-sm">{t.subtitle}</p>
        </div>
        <button 
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center space-x-2 bg-cyber-accent hover:bg-cyber-accentHover text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-emerald-900/20"
        >
            <Plus size={18} />
            <span>{t.addTarget}</span>
        </button>
      </div>

      {isAdding && (
          <div className="bg-cyber-800 border border-cyber-700 rounded-xl p-6 animate-in slide-in-from-top-4 fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">{t.name}</label>
                      <input 
                        type="text" 
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full bg-cyber-900 border border-cyber-700 rounded-lg px-3 py-2 text-white focus:border-cyber-accent focus:outline-none"
                        placeholder="e.g. Tesla"
                      />
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">{t.platform}</label>
                      <input 
                        type="text" 
                        value={newPlatform}
                        onChange={(e) => setNewPlatform(e.target.value)}
                        className="w-full bg-cyber-900 border border-cyber-700 rounded-lg px-3 py-2 text-white focus:border-cyber-accent focus:outline-none"
                        placeholder="e.g. Bugcrowd"
                      />
                  </div>
                  <div className="lg:col-span-2">
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">{t.scope}</label>
                      <input 
                        type="text" 
                        value={newScope}
                        onChange={(e) => setNewScope(e.target.value)}
                        className="w-full bg-cyber-900 border border-cyber-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-cyber-accent focus:outline-none"
                        placeholder="e.g. *.tesla.com"
                      />
                  </div>
              </div>
              <div className="mb-4">
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">{t.notes}</label>
                  <textarea 
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    className="w-full bg-cyber-900 border border-cyber-700 rounded-lg px-3 py-2 text-white focus:border-cyber-accent focus:outline-none h-20 resize-none"
                    placeholder="Initial scope notes..."
                  />
              </div>
              <div className="flex justify-end space-x-3">
                  <button onClick={() => setIsAdding(false)} className="px-4 py-2 text-slate-400 hover:text-white transition-colors">{t.cancel}</button>
                  <button onClick={addTarget} className="px-6 py-2 bg-cyber-accent text-white rounded-lg font-bold hover:bg-cyber-accentHover transition-colors">{t.save}</button>
              </div>
          </div>
      )}

      {targets.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-cyber-700 rounded-xl">
              <Crosshair size={48} className="mx-auto text-cyber-700 mb-4" />
              <p className="text-slate-500">{t.noTargets}</p>
          </div>
      ) : (
          <div className="grid grid-cols-1 gap-4">
              {targets.map(target => (
                  <div key={target.id} className="bg-cyber-800 border border-cyber-700 rounded-xl p-5 hover:border-cyber-600 transition-all group">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                          <div>
                              <div className="flex items-center space-x-3">
                                  <h3 className="text-xl font-bold text-white">{target.name}</h3>
                                  <span className="text-xs bg-cyber-900 text-slate-400 px-2 py-0.5 rounded border border-cyber-700">{target.platform}</span>
                              </div>
                              <code className="text-sm text-cyber-accent font-mono mt-1 block">{target.scope}</code>
                          </div>
                          
                          <div className="flex items-center space-x-4 w-full md:w-auto">
                              <select 
                                value={target.status}
                                onChange={(e) => updateStatus(target.id, e.target.value as any)}
                                className={`px-3 py-1.5 rounded-lg border text-sm font-medium focus:outline-none appearance-none cursor-pointer ${getStatusColor(target.status)}`}
                              >
                                  {statuses.map(s => (
                                      <option key={s} value={s} className="bg-cyber-900 text-slate-300">
                                          {/* @ts-ignore */}
                                          {t.statuses[s] || s}
                                      </option>
                                  ))}
                              </select>
                              <button 
                                onClick={() => deleteTarget(target.id)}
                                className="text-slate-500 hover:text-red-400 transition-colors p-2"
                              >
                                  <Trash2 size={18} />
                              </button>
                          </div>
                      </div>
                      
                      <div className="bg-cyber-900/50 rounded-lg p-3 border border-cyber-700/50">
                          <textarea
                             value={target.notes}
                             onChange={(e) => updateNotes(target.id, e.target.value)}
                             className="w-full bg-transparent text-slate-300 text-sm focus:outline-none resize-none"
                             rows={2}
                             placeholder={t.notes}
                          />
                      </div>
                  </div>
              ))}
          </div>
      )}
    </div>
  );
};

export default TargetManager;
