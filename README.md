# AI Project Cleaner

Desktop application that analyzes software projects to identify unnecessary files, potential security issues, unused dependencies, and other project-health problems.

## Phase 1

Desktop application foundation and project selection.

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
- ✓ Basic error handling

## Not Implemented Yet

- ✗ Project scanning
- ✗ AI analysis
- ✗ Security analysis
- ✗ Dependency analysis
- ✗ Cleanup
- ✗ File deletion
- ✗ Git analysis

Additional features will be implemented in the future.