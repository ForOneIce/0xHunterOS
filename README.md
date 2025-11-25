# HunterOS - Bug Bounty Toolkit

**HunterOS** is an all-in-one frontend workspace designed specifically for bug bounty hunters. It unifies the scattered workflow of penetration testing into a single, cohesive, "Cyber-themed" interface.

## Key Features

1.  **Target Operations (New)**: 
    *   **Project Management**: distinct dashboard to manage your active bug bounty targets.
    *   **Tracking**: Define Scopes, Platforms, and track status (New, Recon, Exploitation, Reported).
    *   **Notes**: Persistent scratchpad for every target.
    *   **Local Persistence**: All data is saved to your browser's Local Storage.

2.  **Report Writer**: 
    *   Integrated Markdown editor with live preview.
    *   **Custom Templates**: Create, name, and save your own report templates locally.
    *   Pre-loaded templates for HackerOne and Bugcrowd.
    *   Export functionality (`.md`) to save your reports to disk.

3.  **Cyber Tools**:
    *   **Smart Encoder**: Real-time multi-format encoding (Base64, URL, Hex, HTML Entities).
    *   **JSON Formatter**: Validate and prettify JSON data instantly.
    *   **Diff Tool**: Compare two text or code blocks line-by-line to identify changes.

4.  **Payload Generator**:
    *   **Massive Library**: Over 30+ vectors based on the 2020 XSS Cheat Sheet (Basics, Polyglots, Bypasses).
    *   **Context Aware**: Filter by HTML, JS, URL, or Attribute contexts.
    *   One-click copy to clipboard.

5.  **Vulnerability Knowledge Base**:
    *   Searchable archive of public vulnerability reports.
    *   Filter by Platform (HackerOne, etc.) and Severity.
    *   View bounty amounts and direct links to disclosures.

6.  **Resource Dashboard**:
    *   Curated navigation to essential recon, DNS, and training tools (Shodan, Censys, PortSwigger, etc.).
  
7.  **AI Prompts**:
    *   A library of useful LLM prompts tailored for security researchers (Code Analysis, Reporting, Recon).

8.  **Multi-Language Support**:
    *   Full UI support for **English** and **Chinese** (Simplified). Toggle instantly from the header.

## How to Use

### Installation
This is a frontend-only React application.
1.  Clone the repository.
2.  Run `npm install` to install dependencies.
3.  Run `npm start` to launch the development server.

### Workflow
*   **Start your day** at the **Target Operations** tab. Add the programs you are currently hunting on (e.g., "Starbucks", "*.starbucks.com").
*   Update the status of your targets as you progress from **Recon** to **Exploitation**.
*   Check the **Knowledge Base** to study recent critical findings relevant to your targets.
*   Use the **Tools & CTF** section to navigate to external recon platforms.
*   When testing inputs, use **Payloads** to find specific vectors and **Encoders** to obfuscate them.
*   Use the **Diff Tool** to compare HTTP responses or code snippets.
*   When you find a bug, switch to **Report Writer**, load a template (or create your own), and draft your submission.

## Credits
UI Design & Concept by HunterOS Team.  
Payloads sourced from various open-source security cheat sheets (Brute Logic, PayloadsAllTheThings).