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
        <div className="p-10 h-full overflow-y-auto">
            <div className="mb-10">
                <h1 className="text-2xl font-bold text-text-primary tracking-tight">
                    AI Project Cleaner
                </h1>
                <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                    Keep your projects clean, safe, and healthy.
                </p>
            </div>

            {!project ? (
                <div className="border border-border rounded-xl bg-surface p-10 max-w-xl shadow-sm">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-11 h-11 rounded-xl bg-surface-overlay flex items-center justify-center flex-shrink-0">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted">
                                <path d="M2 7V17a2.5 2.5 0 002.5 2.5h13A2.5 2.5 0 0020 17V9.5A2.5 2.5 0 0017.5 7H12L10 4.5H4.5A2.5 2.5 0 002 7z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-text-primary">
                                No project selected
                            </h2>
                            <p className="text-sm text-text-muted mt-1 leading-relaxed">
                                Choose a local project directory to get started.
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleSelectProject}
                        className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                    >
                        Select Project
                    </button>
                </div>
            ) : (
                <div className="border border-border rounded-xl bg-surface max-w-xl shadow-sm overflow-hidden">
                    <div className="px-8 py-6 border-b border-border">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                            Project
                        </span>
                        <h2 className="text-xl font-bold text-text-primary mt-2 tracking-tight">
                            {project.name}
                        </h2>
                    </div>

                    <div className="px-8 py-6 space-y-5">
                        <div>
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted block mb-1.5">
                                Location
                            </span>
                            <span className="text-sm text-text-secondary font-mono bg-surface-overlay px-3 py-1.5 rounded-md inline-block">
                                {project.path}
                            </span>
                        </div>

                        <div>
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted block mb-1.5">
                                Status
                            </span>
                            <span className="inline-flex items-center gap-2 text-sm text-success bg-success-subtle px-3 py-1.5 rounded-md font-medium">
                                <span className="w-2 h-2 rounded-full bg-success" />
                                Ready to scan
                            </span>
                        </div>
                    </div>

                    <div className="px-8 py-5 border-t border-border flex items-center gap-3 bg-surface-raised">
                        <button
                            disabled
                            className="px-5 py-2.5 bg-surface-overlay text-text-muted text-sm font-medium rounded-lg cursor-not-allowed"
                            title="Project scanning will be available in Phase 2"
                        >
                            Scan Project
                        </button>
                        <button
                            onClick={handleSelectProject}
                            className="px-5 py-2.5 border border-border text-text-secondary hover:text-text-primary hover:border-text-muted text-sm font-medium rounded-lg transition-colors"
                        >
                            Change Project
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
