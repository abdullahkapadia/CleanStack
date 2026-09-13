import Accordion from "../components/Accordion";

export default function SettingsPage() {
    return (
        <div className="p-8 lg:p-10 h-full overflow-y-auto relative">
            <div className="mb-6 animate-fade-in relative z-10">
                <h1 className="text-[22px] font-bold text-text-primary tracking-tight leading-tight">Settings</h1>
                <p className="text-[13px] text-text-secondary mt-1">Configure application preferences.</p>
            </div>

            <div className="max-w-xl space-y-4 animate-fade-in relative z-10">
                <Accordion
                    title={
                        <div className="flex items-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted">
                                <circle cx="8" cy="8" r="2.5" />
                                <path d="M8 2.5v1M8 12.5v1M2.5 8h1M12.5 8h1M4.1 4.1l.7.7M11.2 11.2l.7.7M4.1 11.9l.7-.7M11.2 4.8l.7-.7" />
                            </svg>
                            General
                        </div>
                    }
                    defaultExpanded={true}
                    className="border-none shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05),0_1px_4px_-1px_rgba(0,0,0,0.03)]"
                >
                    <div className="px-6 divide-y divide-border/30 bg-surface/30">
                        <div className="flex items-center justify-between py-4 group">
                            <div>
                                <span className="text-[13px] font-medium text-text-primary block group-hover:text-accent transition-colors">Theme</span>
                                <span className="text-[11.5px] text-text-muted mt-0.5 block">Application color scheme</span>
                            </div>
                            <span className="text-[12px] text-text-secondary px-3 py-1 bg-surface-raised rounded-lg font-medium border border-border/50 shadow-sm">
                                Light (Premium)
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-4 group">
                            <div>
                                <span className="text-[13px] font-medium text-text-primary block group-hover:text-accent transition-colors">Version</span>
                                <span className="text-[11.5px] text-text-muted mt-0.5 block">Current application version</span>
                            </div>
                            <code className="text-[11.5px] text-text-secondary font-mono bg-surface-raised px-2 py-1 rounded border border-border/30">
                                1.0.0-alpha (Phase 2)
                            </code>
                        </div>
                    </div>
                </Accordion>

                <Accordion
                    title={
                        <div className="flex items-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted">
                                <circle cx="8" cy="8" r="6" />
                                <path d="M8 11V7" strokeLinecap="round" />
                                <path d="M8 5h.01" strokeLinecap="round" strokeWidth="2" />
                            </svg>
                            About
                        </div>
                    }
                    defaultExpanded={true}
                    className="border-none shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05),0_1px_4px_-1px_rgba(0,0,0,0.03)]"
                >
                    <div className="px-6 py-5 bg-surface/30">
                        <p className="text-[12.5px] text-text-secondary leading-relaxed mb-4">
                            AI Project Cleaner analyzes software projects to identify unnecessary files,
                            potential security issues, unused dependencies, and other project-health problems.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {['Go', 'Wails', 'React', 'TypeScript', 'Tailwind'].map(tech => (
                                <span key={tech} className="px-2.5 py-1 bg-surface-raised border border-border/40 rounded-md text-[11px] text-text-muted font-medium">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </Accordion>
            </div>
        </div>
    );
}
