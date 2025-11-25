# HunterOS Deployment Guide (GitHub Pages)

This guide explains how to deploy the HunterOS application to GitHub Pages using the configured Vite build system.

## 1. Local Setup

Ensure your local directory structure matches the standard Vite layout:

```text
hunter-os/
├── public/           # Static assets
├── src/              # Source code
│   ├── components/   # React components
│   ├── App.tsx       # Main App component
│   ├── main.tsx      # Entry point
│   ├── index.css     # Global styles (Tailwind imports)
│   └── ...           # Constants, types, etc.
├── index.html        # Entry HTML
├── package.json      # Dependencies & Scripts
├── tailwind.config.js
├── vite.config.ts    # Vite Configuration
└── ...
```

## 2. Configuration

Before deploying, you **must** update the repository path in `vite.config.ts`.

1.  Open `vite.config.ts`.
2.  Locate the `base` property.
3.  Change it to match your GitHub repository name.

```typescript
// Example: If your repo is https://github.com/yourname/bug-tools
base: '/bug-tools/', 
```

## 3. Build & Deploy

Open your terminal in the project root and run:

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Initialize Git** (if not done):
    ```bash
    git init
    git add .
    git commit -m "Ready for deploy"
    git branch -M main
    ```

3.  **Connect to GitHub**:
    Create a repository on GitHub, then run:
    ```bash
    git remote add origin https://github.com/<USERNAME>/<REPO_NAME>.git
    git push -u origin main
    ```

4.  **Deploy**:
    Run the deployment script. This will automatically build the project and push the `dist` folder to the `gh-pages` branch.
    ```bash
    npm run deploy
    ```

## 4. Verify

1.  Go to your GitHub Repository Settings > **Pages**.
2.  Ensure the source is set to `Deploy from a branch` and the branch is `gh-pages`.
3.  Visit the provided URL (e.g., `https://<USERNAME>.github.io/<REPO_NAME>/`).