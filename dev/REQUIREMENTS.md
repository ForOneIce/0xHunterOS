# HunterOS Requirements Specification

This document outlines the functional requirements for the HunterOS Bug Bounty Toolkit.

## 1. Report Writer Module
*   **Markdown Editor**: Full-featured markdown editing with live preview.
*   **Templates**: Pre-set templates for major platforms (HackerOne, Bugcrowd).
*   **Custom Templates**: Users can create, name, and save custom templates to `localStorage`.
*   **Export**: Ability to export reports to local `.md` files.

## 2. Cyber Tools (Encoding & Utilities)
*   **Smart Encoder**: Support Base64, URL, Hex, HTML Entities. One input generates multiple outputs.
*   **JSON Tools**: Formatting, Validation, and Prettifying.
*   **Diff Tool**: Line-by-line text comparison for analyzing responses or payloads.

## 3. Payload Generator
*   **Source**: Vectors based on standard XSS cheat sheets (2020 Edition).
*   **Filtering**: Search by vulnerability type, context (HTML/JS/Polyglot), and keyword.
*   **Action**: One-click copy to clipboard.

## 4. Vulnerability Knowledge Base
*   **Search Interface**: Dedicated page to search reports by title or program.
*   **Filtering**: Filter by Platform (HackerOne, Bugcrowd, etc.) and Severity (Critical, High, etc.).

## 5. Tool Navigation System
*   **Categorization**: Group tools by phase (Recon, DNS, Scanning, Exploitation).
*   **External Links**: Direct navigation to popular tools (Shodan, Virustotal, etc.).

## 6. Target Operations Module
*   **Functionality**: Replaces the traditional "Dashboard" with a functional Project Manager.
*   **Tracking**: Track Target Name, Scope (URL), Platform, and current Status.
*   **Persistence**: All data saved to Browser `localStorage`.
*   **Notes**: Ability to add quick notes/todos for each target.

## 7. AI Prompt Library
*   **Context**: Prompts specifically designed for Bug Bounty scenarios (Recon, Code Review).

## 8. Architecture & UI
*   **Tech Stack**: Vite, React, TypeScript, Tailwind CSS.
*   **Deployment**: GitHub Pages compatible.
*   **Theme**: "Cyber" / Dark mode aesthetic.
*   **Language**: Support for Chinese/English toggling.