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
        <div className="p-10 h-full overflow-y-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-text-primary tracking-tight">Projects</h1>
                <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                    Manage your project directories.
                </p>
            </div>

            {project ? (
                <div className="space-y-5 max-w-2xl">
                    <div className="border border-border rounded-xl bg-surface p-5 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-accent-subtle flex items-center justify-center flex-shrink-0">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                                    <path d="M2 5.5V14a1.5 1.5 0 001.5 1.5h11A1.5 1.5 0 0016 14V7a1.5 1.5 0 00-1.5-1.5H9L7.5 3.5H3.5A1.5 1.5 0 002 5z" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div>
                                <span className="text-sm font-semibold text-text-primary block">
                                    {project.name}
                                </span>
                                <span className="text-xs text-text-muted font-mono mt-0.5 block">
                                    {project.path}
                                </span>
                            </div>
                        </div>
                        <span className="inline-flex items-center gap-2 text-xs text-success bg-success-subtle px-3 py-1.5 rounded-md font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-success" />
                            Active
                        </span>
                    </div>

                    <button
                        onClick={handleSelectProject}
                        className="px-5 py-2.5 border border-border text-text-secondary hover:text-text-primary hover:border-text-muted text-sm font-medium rounded-lg transition-colors"
                    >
                        Add Another Project
                    </button>
                </div>
            ) : (
                <div className="border border-border border-dashed rounded-xl p-16 flex flex-col items-center justify-center max-w-2xl">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted mb-4">
                        <path d="M4 10V25a3 3 0 003 3h22a3 3 0 003-3V13a3 3 0 00-3-3H18l-3-4H7a3 3 0 00-3 3z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-sm font-medium text-text-secondary mb-1">No projects added yet</p>
                    <p className="text-xs text-text-muted mb-5">Select a project directory to begin.</p>
                    <button
                        onClick={handleSelectProject}
                        className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                    >
                        Select Project
                    </button>
                </div>
            )}
        </div>
    );
}
