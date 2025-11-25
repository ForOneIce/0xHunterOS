# HunterOS - Bug Bounty Toolkit

**HunterOS** is an all-in-one frontend workspace designed specifically for bug bounty hunters. It unifies the scattered workflow of penetration testing into a single, cohesive, "Cyber-themed" interface.

## Key Features

1.  **Target Operations (Project Management)**: 
    *   **Real-time Tracking**: Manage active targets, define scopes, and track status (New, Recon, Exploitation, Reported).
    *   **Persistent Notes**: Keep scratchpad notes for every target.
    *   **Local Storage**: All data is saved locally in your browser, ensuring privacy and persistence.

2.  **Report Writer**: 
    *   Integrated Markdown editor with live preview.
    *   **Custom Templates**: Create, name, and save your own report templates.
    *   Pre-loaded templates for HackerOne and Bugcrowd.
    *   **Export**: Download reports as `.md` files.

3.  **Cyber Tools**:
    *   **Smart Encoder**: Real-time multi-format encoding (Base64, URL, Hex, HTML Entities).
    *   **JSON Tools**: Validate, format, and error-check JSON data.
    *   **Diff Tool**: Compare HTTP responses or code snippets line-by-line to identify changes.

4.  **Payload Generator**:
    *   **Massive Library**: Over 30+ vectors based on the 2020 XSS Cheat Sheet.
    *   **Filtering**: Search by context (HTML, JS, Attribute) or keyword.
    *   One-click copy to clipboard.

5.  **Vulnerability Knowledge Base**:
    *   Searchable archive of public vulnerability reports.
    *   Filter by Platform (HackerOne, etc.) and Severity.

6.  **Resource Dashboard**:
    *   Curated navigation to essential recon, DNS, and training tools (Shodan, Censys, PortSwigger, etc.).
  
7.  **AI Prompts**:
    *   A library of useful LLM prompts tailored for security researchers (Code Analysis, Reporting, Recon).

8.  **Multi-Language Support**:
    *   Toggle instantly between **English** and **Chinese** (Simplified).

## How to Use

### Installation
This project uses **Vite** + **React** + **TypeScript**.

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open your browser at `http://localhost:5173`.

### Deployment to GitHub Pages
1.  Open `vite.config.ts` and set the `base` property to your repository name (e.g., `/my-repo/`).
2.  Run the deploy script:
    ```bash
    npm run deploy
    ```

### Workflow
*   **Start**: Go to **Target Operations**. Add your program (e.g., "Starbucks").
*   **Hunt**: Use **Resources** to find recon tools.
*   **Test**: Use **Payloads** for XSS vectors and **Cyber Tools** for encoding/decoding data.
*   **Analyze**: Use the **Diff Tool** to compare responses.
*   **Report**: Draft your finding in the **Report Writer** and export it.

## Credits
UI Design & Concept by HunterOS Team.  
Payloads sourced from various open-source security cheat sheets.