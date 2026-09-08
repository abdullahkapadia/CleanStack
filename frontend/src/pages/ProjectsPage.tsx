import { Project } from "../types";
import { SelectProject } from "../../wailsjs/go/main/App";

interface ProjectsPageProps {
    project: Project | null;
    onProjectSelected: (project: Project) => void;
    onError: (message: string) => void;
}

export default function ProjectsPage({ project, onProjectSelected, onError }: ProjectsPageProps) {
    async function handleSelectProject() {
        try {
            const result = await SelectProject();
            if (result && result.name && result.path) {
                onProjectSelected({ name: result.name, path: result.path });
            }
        } catch (err) {
            onError("Unable to select project directory. Please try again.");
        }
    }

    return (
        <div className="p-8 h-full overflow-y-auto">
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-text-primary">Projects</h1>
                <p className="text-sm text-text-secondary mt-1">Manage your project directories.</p>
            </div>

            {project ? (
                <div className="space-y-4">
                    <div className="border border-border rounded-lg bg-surface-raised p-4 flex items-center justify-between max-w-2xl">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-accent-subtle flex items-center justify-center">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                                    <path d="M2 5.5L2 14a1.5 1.5 0 001.5 1.5h11A1.5 1.5 0 0016 14V7a1.5 1.5 0 00-1.5-1.5H9L7.5 3.5H3.5A1.5 1.5 0 002 5z" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-text-primary block">{project.name}</span>
                                <span className="text-xs text-text-muted font-mono">{project.path}</span>
                            </div>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-xs text-success">
                            <span className="w-1.5 h-1.5 rounded-full bg-success" />
                            Active
                        </span>
                    </div>

                    <button
                        onClick={handleSelectProject}
                        className="px-4 py-2 border border-border text-text-secondary hover:text-text-primary hover:border-text-muted text-sm font-medium rounded-md transition-colors"
                    >
                        Add Another Project
                    </button>
                </div>
            ) : (
                <div className="border border-border border-dashed rounded-lg p-12 flex flex-col items-center justify-center max-w-2xl">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted mb-3">
                        <path d="M4 10L4 25a3 3 0 003 3h18a3 3 0 003-3V13a3 3 0 00-3-3h-9l-3-4H7a3 3 0 00-3 3z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-sm text-text-secondary mb-1">No projects added yet</p>
                    <p className="text-xs text-text-muted mb-4">Select a project directory to begin.</p>
                    <button
                        onClick={handleSelectProject}
                        className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-md transition-colors"
                    >
                        Select Project
                    </button>
                </div>
            )}
        </div>
    );
}
