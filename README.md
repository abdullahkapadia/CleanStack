# AI Project Cleaner

Desktop application that analyzes software projects to identify unnecessary files, potential security issues, unused dependencies, and other project-health problems.

## Phase 1 — Foundation

Desktop application shell, layout, navigation, and native project directory selection.

## Phase 2 — Project Scanning

Scan selected project directories to identify build artifacts, cache files, log files, OS junk, large files, and temporary files. Displays categorized results with file sizes.

## Stack

- Go
- Wails
- React
- TypeScript
- Tailwind CSS
- Vite

## Running Locally

### Prerequisites

- Go 1.21+
- Node.js 18+
- Wails CLI (`go install github.com/wailsapp/wails/v2/cmd/wails@latest`)

### Install Dependencies

```bash
cd ai-project-cleaner/frontend
npm install
```

### Development Mode

```bash
cd ai-project-cleaner
wails dev
```

### Build Desktop Application

```bash
cd ai-project-cleaner
wails build
```

The built executable will be in the `build/bin/` directory.

## Current Functionality

- ✓ Desktop application
- ✓ Dashboard
- ✓ Navigation
- ✓ Native project directory selection
- ✓ Selected project display
- ✓ Project scanning (build artifacts, caches, logs, OS junk, large files, temp files)
- ✓ Scan results with summary cards and categorized issue table
- ✓ Category filtering
- ✓ Re-scan support
- ✓ Basic error handling

## Not Implemented Yet

- ✗ AI analysis
- ✗ Security analysis
- ✗ Dependency analysis
<<<<<<< HEAD
- ✗ Cleanup / file deletion
- ✗ Git analysis
- ✗ Scan history persistence
=======
- ✗ Cleanup
- ✗ File deletion
- ✗ Git analysis

Additional features will be implemented in the future.
>>>>>>> f22b3bf1347caaf19eea2c3e1a1a041bc0a35b54
