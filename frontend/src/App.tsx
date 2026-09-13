import { useState } from "react";
import { Page, Project, ScanResult } from "./types";
import TitleBar from "./components/TitleBar";
import Sidebar from "./components/Sidebar";
import StatusBar from "./components/StatusBar";
import Dashboard from "./pages/Dashboard";
import ProjectsPage from "./pages/ProjectsPage";
import ScanPage from "./pages/ScanPage";
import CleanupPage from "./pages/CleanupPage";
import HistoryPage from "./pages/HistoryPage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
    const [activePage, setActivePage] = useState<Page>("dashboard");
    const [project, setProject] = useState<Project | null>(null);
    const [scanResult, setScanResult] = useState<ScanResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    function handleError(message: string) {
        setError(message);
        setTimeout(() => setError(null), 4000);
    }

    function handleProjectSelected(p: Project) {
        setProject(p);
        setScanResult(null);
        setError(null);
    }

    function handleNavigateToScan() {
        setActivePage("scan");
    }

    function handleScanComplete(result: ScanResult) {
        setScanResult(result);
    }

    function getStatus() {
        if (scanResult) {
            return `Project: ${project?.name} — ${scanResult.cleanableCount} issues found`;
        }
        if (project) {
            return `Project: ${project.name}`;
        }
        return "Ready";
    }

    function renderPage() {
        switch (activePage) {
            case "dashboard":
                return (
                    <Dashboard
                        project={project}
                        scanResult={scanResult}
                        onProjectSelected={handleProjectSelected}
                        onNavigateToScan={handleNavigateToScan}
                        onError={handleError}
                    />
                );
            case "projects":
                return (
                    <ProjectsPage
                        project={project}
                        onProjectSelected={handleProjectSelected}
                        onError={handleError}
                    />
                );
            case "scan":
                return (
                    <ScanPage
                        project={project}
                        scanResult={scanResult}
                        onScanComplete={handleScanComplete}
                        onError={handleError}
                    />
                );
            case "cleanup":
                return <CleanupPage />;
            case "history":
                return <HistoryPage />;
            case "settings":
                return <SettingsPage />;
        }
    }

    return (
        <div className="h-full flex flex-col bg-surface">
            <TitleBar onSettingsClick={() => setActivePage("settings")} />

            {error && (
                <div className="mx-5 mt-3 px-4 py-3 bg-danger-subtle border border-danger/15 rounded-lg flex items-center justify-between">
                    <span className="text-sm text-danger font-medium">{error}</span>
                    <button onClick={() => setError(null)} className="text-danger/50 hover:text-danger text-sm ml-4">
                        ✕
                    </button>
                </div>
            )}

            <div className="flex flex-1 overflow-hidden">
                <Sidebar activePage={activePage} onNavigate={setActivePage} />
                <main className="flex-1 overflow-hidden">
                    {renderPage()}
                </main>
            </div>

            <StatusBar status={getStatus()} />
        </div>
    );
}
