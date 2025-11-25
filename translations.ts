
import { Language } from './types';

export const TRANSLATIONS = {
  en: {
    sidebar: {
      targetManager: 'Target Operations', // Renamed from Dashboard
      reportWriter: 'Report Writer',
      encoders: 'Cyber Tools',
      payloads: 'Payloads',
      prompts: 'AI Prompts',
      resources: 'Tools & Resources',
      knowledgeBase: 'Knowledge Base',
      dailyStat: 'Active Targets',
      reports: 'targets',
      today: 'added'
    },
    targetManager: {
       title: 'Target Operations',
       subtitle: 'Manage your active bug bounty targets and tracking progress.',
       addTarget: 'Add Target',
       name: 'Target Name',
       scope: 'Scope / URL',
       platform: 'Platform',
       notes: 'Notes / Todo',
       status: 'Status',
       save: 'Add Target',
       noTargets: 'No active targets. Add one to start hunting.',
       statuses: {
           New: 'New',
           Recon: 'Recon',
           Exploitation: 'Exploitation',
           Reported: 'Reported',
           Closed: 'Closed'
       },
       actions: 'Actions',
       cancel: 'Cancel'
    },
    report: {
      titlePlaceholder: 'New Report',
      template: 'Load Template',
      export: 'Export MD',
      save: 'Save Local',
      editor: 'EDITOR (MARKDOWN)',
      preview: 'PREVIEW',
      saveTemplate: 'Save as Template',
      templateName: 'Template Name',
      confirm: 'Save',
      cancel: 'Cancel'
    },
    payloads: {
      title: 'XSS Payload Reference',
      subtitle: 'Standard vectors from the 2020 XSS Cheat Sheet.',
      searchPlaceholder: 'Search payloads...',
      all: 'All',
      copy: 'Copy Payload'
    },
    tools: {
      encoder: 'Smart Encoder',
      formatter: 'JSON Formatter',
      diff: 'Diff Tool',
      input: 'Input',
      supported: 'Supported: Base64, URL, Hex, HTML Entity',
      transformations: 'Live Transformations',
      decoded: 'Decoded Candidates',
      jsonInput: 'JSON Input',
      prettify: 'Prettify / Validate',
      clear: 'Clear',
      error: 'Error',
      original: 'Original Text',
      modified: 'Modified Text',
      compare: 'Compare',
      noDiff: 'No differences found.'
    },
    knowledge: {
      title: 'Vulnerability Knowledge Base',
      subtitle: 'Archive of public vulnerability reports and disclosures.',
      search: 'Search reports...',
      filterSeverity: 'Severity',
      filterPlatform: 'Platform',
      bounty: 'Bounty'
    },
    resources: {
      searchPlaceholder: 'Search tools, lists, and resources...'
    },
    prompts: {
      copied: 'Copied!'
    }
  },
  zh: {
    sidebar: {
      targetManager: '项目管理', // Renamed from Dashboard
      reportWriter: '漏洞报告助手',
      encoders: '黑客工具箱',
      payloads: 'XSS 载荷库',
      prompts: 'AI 渗透指令',
      resources: '工具导航',
      knowledgeBase: '漏洞知识库',
      dailyStat: '活跃项目',
      reports: '个目标',
      today: '新增'
    },
    targetManager: {
       title: '项目管理 (Target Operations)',
       subtitle: '管理您的漏洞赏金目标、范围和测试进度。',
       addTarget: '添加新目标',
       name: '目标名称',
       scope: '范围 / URL',
       platform: '所属平台',
       notes: '备注 / 待办事项',
       status: '当前状态',
       save: '保存目标',
       noTargets: '暂无活跃目标。点击上方按钮开始您的狩猎。',
       statuses: {
           New: '新项目',
           Recon: '侦察中',
           Exploitation: '漏洞挖掘中',
           Reported: '已报告',
           Closed: '已结束'
       },
       actions: '操作',
       cancel: '取消'
    },
    report: {
      titlePlaceholder: '新漏洞报告标题...',
      template: '加载报告模板',
      export: '导出 Markdown',
      save: '本地保存',
      editor: '漏洞描述 (Markdown)',
      preview: '实时预览',
      saveTemplate: '另存为模板',
      templateName: '模板名称',
      confirm: '确认保存',
      cancel: '取消'
    },
    payloads: {
      title: 'XSS Payload 参考清单',
      subtitle: '源自 2020 版 XSS Cheat Sheet 的标准攻击向量集合。',
      searchPlaceholder: '搜索 Payloads (如: svg, reflection)...',
      all: '全部',
      copy: '复制 Payload'
    },
    tools: {
      encoder: '智能加解密',
      formatter: 'JSON 工具',
      diff: '文本对比 (Diff)',
      input: '输入内容',
      supported: '已支持: Base64, URL, Hex, HTML Entity',
      transformations: '实时转换结果',
      decoded: '解码候选项',
      jsonInput: 'JSON 输入',
      prettify: '美化 / 校验',
      clear: '清空',
      error: '错误',
      original: '原始文本',
      modified: '修改后文本',
      compare: '执行对比',
      noDiff: '未发现差异。'
    },
    knowledge: {
      title: '漏洞报告知识库',
      subtitle: '收录公开的漏洞赏金报告与披露详情。',
      search: '搜索报告标题、厂商...',
      filterSeverity: '严重程度',
      filterPlatform: '所属平台',
      bounty: '奖金'
    },
    resources: {
      searchPlaceholder: '搜索在线工具、靶场和资源...'
    },
    prompts: {
      copied: '已复制!'
    }
  }
};

export const t = (lang: Language, section: keyof typeof TRANSLATIONS['en'], key: string) => {
  // @ts-ignore
  return TRANSLATIONS[lang][section][key] || key;
};
