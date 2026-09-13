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
        <div className="p-8 lg:p-10 h-full overflow-y-auto">
            <div className="mb-6 animate-fade-in">
                <h1 className="text-[22px] font-bold text-text-primary tracking-tight leading-tight">Projects</h1>
                <p className="text-[13px] text-text-secondary mt-1">Manage your project directories.</p>
            </div>

            {project ? (
                <div className="space-y-4 max-w-xl animate-fade-in">
                    <div className="border border-border/70 rounded-2xl bg-surface-raised p-5 flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                        <div className="flex items-center gap-3.5">
                            <div className="w-9 h-9 rounded-xl bg-accent-subtle flex items-center justify-center flex-shrink-0">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" className="text-accent">
                                    <path d="M2 5V13a1.5 1.5 0 001.5 1.5h9A1.5 1.5 0 0014 13V6.5A1.5 1.5 0 0012.5 5H8L6.5 3H3.5A1.5 1.5 0 002 4.5z" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div>
                                <span className="text-[13px] font-semibold text-text-primary block">{project.name}</span>
                                <code className="text-[11px] text-text-muted font-mono mt-0.5 block">{project.path}</code>
                            </div>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-[11px] text-success bg-success-subtle px-2.5 py-1 rounded-md font-medium">
                            <span className="w-[5px] h-[5px] rounded-full bg-success" />
                            Active
                        </span>
                    </div>

                    <button
                        onClick={handleSelectProject}
                        className="px-4 py-2 border border-border/70 text-text-secondary hover:text-text-primary hover:bg-surface-hover text-[13px] font-medium rounded-lg transition-all duration-150"
                    >
                        Add Another Project
                    </button>
                </div>
            ) : (
                <div className="border border-border/60 border-dashed rounded-2xl p-14 flex flex-col items-center justify-center max-w-xl animate-fade-in">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3" className="text-text-muted/50 mb-3">
                        <path d="M4 8V20a3 3 0 003 3h14a3 3 0 003-3V11a3 3 0 00-3-3h-6l-2.5-3H7a3 3 0 00-3 3z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-[13px] font-semibold text-text-secondary mb-0.5">No projects added yet</p>
                    <p className="text-[11.5px] text-text-muted mb-4">Select a project directory to begin.</p>
                    <button
                        onClick={handleSelectProject}
                        className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-[13px] font-medium rounded-lg transition-all duration-150 shadow-[0_1px_2px_rgba(79,125,249,0.25)]"
                    >
                        Select Project
                    </button>
                </div>
            )}
        </div>
    );
}
