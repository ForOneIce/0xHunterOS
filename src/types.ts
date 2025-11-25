
export type ViewState = 
  | 'target-manager'
  | 'report-writer'
  | 'cyber-tools'
  | 'payloads'
  | 'knowledge-base'
  | 'resources'
  | 'prompts';

export type Language = 'en' | 'zh';

export interface ToolLink {
  name: string;
  url: string;
  category: string;
  description: string;
}

export interface ReportTemplate {
  id: string;
  name: string;
  platform: 'HackerOne' | 'Bugcrowd' | 'Intigriti' | 'Custom';
  content: string;
}

export interface XSSPayload {
  id: string;
  title: string;
  vector: string;
  context: 'HTML' | 'JS' | 'Attribute' | 'URL' | 'Polyglot';
  description?: string;
}

// Replaced RSS Item with BountyTarget for real functionality
export interface BountyTarget {
  id: string;
  name: string;
  scope: string;
  platform: string;
  status: 'New' | 'Recon' | 'Exploitation' | 'Reported' | 'Closed';
  notes: string;
  dateAdded: number;
}

export interface PromptTemplate {
  id: string;
  title: string;
  prompt: string;
  category: 'Recon' | 'Code Analysis' | 'Report Writing' | 'Exploitation';
}

export interface VulnerabilityReport {
  id: string;
  title: string;
  program: string;
  bounty: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  link: string;
}
