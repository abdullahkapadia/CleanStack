import { useState } from "react";
import { Page, Project } from "./types";
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
    const [error, setError] = useState<string | null>(null);

    function handleError(message: string) {
        setError(message);
        setTimeout(() => setError(null), 4000);
    }

    function handleProjectSelected(p: Project) {
        setProject(p);
        setError(null);
    }

    function renderPage() {
        switch (activePage) {
            case "dashboard":
                return <Dashboard project={project} onProjectSelected={handleProjectSelected} onError={handleError} />;
            case "projects":
                return <ProjectsPage project={project} onProjectSelected={handleProjectSelected} onError={handleError} />;
            case "scan":
                return <ScanPage />;
            case "cleanup":
                return <CleanupPage />;
            case "history":
                return <HistoryPage />;
            case "settings":
                return <SettingsPage />;
        }
    }

    function getStatus() {
        if (project) {
            return `Project: ${project.name}`;
        }
        return "Ready";
    }

    return (
        <div className="h-full flex flex-col bg-surface">
            <TitleBar onSettingsClick={() => setActivePage("settings")} />

            {error && (
                <div className="mx-4 mt-2 px-4 py-2.5 bg-danger/10 border border-danger/20 rounded-md flex items-center justify-between">
                    <span className="text-sm text-danger">{error}</span>
                    <button onClick={() => setError(null)} className="text-danger/60 hover:text-danger text-sm ml-4">
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
