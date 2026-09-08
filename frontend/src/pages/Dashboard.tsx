import { Project } from "../types";
import { SelectProject } from "../../wailsjs/go/main/App";

interface DashboardProps {
    project: Project | null;
    onProjectSelected: (project: Project) => void;
    onError: (message: string) => void;
}

export default function Dashboard({ project, onProjectSelected, onError }: DashboardProps) {
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
            <div className="mb-8">
                <h1 className="text-xl font-semibold text-text-primary">AI Project Cleaner</h1>
                <p className="text-sm text-text-secondary mt-1">
                    Keep your projects clean, safe, and healthy.
                </p>
            </div>

            {!project ? (
                <div className="border border-border rounded-lg bg-surface-raised p-8 max-w-lg">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-lg bg-surface-overlay flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted">
                                <path d="M2 6.5L2 15.5a2 2 0 002 2h12a2 2 0 002-2V8.5a2 2 0 00-2-2H10L8 4.5H4a2 2 0 00-2 2z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-sm font-medium text-text-primary">No project selected</h2>
                            <p className="text-xs text-text-muted">Choose a local project directory to get started.</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSelectProject}
                        className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-md transition-colors"
                    >
                        Select Project
                    </button>
                </div>
            ) : (
                <div className="border border-border rounded-lg bg-surface-raised max-w-lg">
                    <div className="p-5 border-b border-border-subtle">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Project</span>
                        <h2 className="text-lg font-semibold text-text-primary mt-1">{project.name}</h2>
                    </div>

                    <div className="p-5 space-y-4">
                        <div>
                            <span className="text-xs text-text-muted block mb-1">Location</span>
                            <span className="text-sm text-text-secondary font-mono">{project.path}</span>
                        </div>

                        <div>
                            <span className="text-xs text-text-muted block mb-1">Status</span>
                            <span className="inline-flex items-center gap-1.5 text-sm text-success">
                                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                                Ready to scan
                            </span>
                        </div>
                    </div>

                    <div className="p-5 border-t border-border-subtle flex items-center gap-3">
                        <button
                            disabled
                            className="px-4 py-2 bg-surface-overlay text-text-muted text-sm font-medium rounded-md cursor-not-allowed"
                            title="Project scanning will be available in Phase 2"
                        >
                            Scan Project
                        </button>
                        <button
                            onClick={handleSelectProject}
                            className="px-4 py-2 border border-border text-text-secondary hover:text-text-primary hover:border-text-muted text-sm font-medium rounded-md transition-colors"
                        >
                            Change Project
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
