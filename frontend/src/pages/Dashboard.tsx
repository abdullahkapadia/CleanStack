import { Project, ScanResult } from "../types";
import { SelectProject } from "../../wailsjs/go/main/App";
import { formatSize, categoryColor } from "../utils/format";
import Accordion from "../components/Accordion";

interface DashboardProps {
    project: Project | null;
    scanResult: ScanResult | null;
    onProjectSelected: (project: Project) => void;
    onNavigateToScan: () => void;
    onError: (message: string) => void;
}

export default function Dashboard({ project, scanResult, onProjectSelected, onNavigateToScan, onError }: DashboardProps) {
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
        <div className="p-8 lg:p-10 h-full overflow-y-auto relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            
            <div className="mb-8 animate-fade-in relative z-10">
                <h1 className="text-[22px] font-bold text-text-primary tracking-tight leading-tight">
                    AI Project Cleaner
                </h1>
                <p className="text-[13px] text-text-secondary mt-1.5">
                    Keep your projects clean, safe, and healthy.
                </p>
            </div>

            {!project ? (
                <div className="animate-fade-in glass-panel rounded-2xl p-8 max-w-md relative z-10">
                    <div className="flex items-start gap-3.5 mb-5">
                        <div className="w-10 h-10 rounded-xl bg-surface-overlay flex items-center justify-center flex-shrink-0">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" className="text-text-muted">
                                <path d="M2 6.5V16a2 2 0 002 2h12a2 2 0 002-2V8.5a2 2 0 00-2-2h-5.5L9 4.5H4a2 2 0 00-2 2z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="pt-0.5">
                            <h2 className="text-[14px] font-semibold text-text-primary leading-snug">
                                No project selected
                            </h2>
                            <p className="text-[12.5px] text-text-muted mt-0.5 leading-relaxed">
                                Choose a local project directory to get started.
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleSelectProject}
                        className="px-4 py-2 bg-accent hover:bg-accent-hover active:scale-95 text-white text-[13px] font-medium rounded-lg transition-all duration-150 shadow-[0_1px_2px_rgba(79,125,249,0.25)] hover:shadow-[0_4px_12px_rgba(79,125,249,0.3)]"
                    >
                        Select Project
                    </button>
                </div>
            ) : (
                <div className="space-y-4 max-w-lg animate-fade-in relative z-10">
                    <div className="glass-panel rounded-2xl overflow-hidden">
                        <div className="px-6 py-5 border-b border-border/50 bg-surface/30">
                            <span className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-text-muted/60">
                                Project
                            </span>
                            <h2 className="text-[18px] font-bold text-text-primary mt-1 tracking-tight">
                                {project.name}
                            </h2>
                        </div>

                        <div className="px-6 py-5 space-y-4">
                            <div>
                                <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-text-muted/60 block mb-1">
                                    Location
                                </span>
                                <code className="text-[12px] text-text-secondary font-mono bg-surface-overlay/80 px-2.5 py-1 rounded-md inline-block border border-border/30">
                                    {project.path}
                                </code>
                            </div>

                            <div>
                                <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-text-muted/60 block mb-1">
                                    Status
                                </span>
                                {scanResult ? (
                                    <span className="inline-flex items-center gap-1.5 text-[12px] text-accent bg-accent-subtle px-2.5 py-1.5 rounded-md font-medium border border-accent/10 shadow-sm">
                                        <span className="w-[6px] h-[6px] rounded-full bg-accent shadow-[0_0_4px_rgba(79,125,249,0.5)]" />
                                        Scanned — {scanResult.cleanableCount} issues
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1.5 text-[12px] text-success bg-success-subtle px-2.5 py-1.5 rounded-md font-medium border border-success/10 shadow-sm">
                                        <span className="w-[6px] h-[6px] rounded-full bg-success shadow-[0_0_4px_rgba(52,199,114,0.5)]" />
                                        Ready to scan
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="px-6 py-4 border-t border-border/40 flex items-center gap-2.5 bg-surface/40">
                            <button
                                onClick={onNavigateToScan}
                                className="px-4 py-2 bg-accent hover:bg-accent-hover active:scale-95 text-white text-[13px] font-medium rounded-lg transition-all duration-150 shadow-[0_1px_2px_rgba(79,125,249,0.25)]"
                            >
                                {scanResult ? "View Results" : "Scan Project"}
                            </button>
                            <button
                                onClick={handleSelectProject}
                                className="px-4 py-2 border border-border/70 text-text-secondary hover:text-text-primary hover:bg-surface-hover active:scale-95 text-[13px] font-medium rounded-lg transition-all duration-150"
                            >
                                Change
                            </button>
                        </div>
                    </div>

                    {scanResult && scanResult.categories.length > 0 && (
                        <Accordion 
                            title={
                                <div className="flex items-center gap-2">
                                    <span className="text-[13px]">Scan Summary</span>
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-subtle text-accent font-bold">
                                        {formatSize(scanResult.cleanableSize)} cleanable
                                    </span>
                                </div>
                            }
                            defaultExpanded={true}
                            className="border-none shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05),0_1px_4px_-1px_rgba(0,0,0,0.03)]"
                        >
                            <div className="px-6 py-5 bg-surface/30">
                                <div className="grid grid-cols-3 gap-3 mb-5">
                                    {[
                                        { label: "Files", value: scanResult.totalFiles.toLocaleString() },
                                        { label: "Issues", value: String(scanResult.cleanableCount), accent: true },
                                        { label: "Cleanable", value: formatSize(scanResult.cleanableSize), accent: true },
                                    ].map((item) => (
                                        <div key={item.label} className="bg-surface-raised rounded-xl px-3.5 py-3 border border-border/30 shadow-sm">
                                            <span className="text-[9.5px] font-semibold uppercase tracking-[0.1em] text-text-muted/60 block">{item.label}</span>
                                            <span className={`text-[16px] font-bold tracking-tight ${item.accent ? "text-accent drop-shadow-sm" : "text-text-primary"}`}>{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-2">
                                    {scanResult.categories.map(cat => (
                                        <div key={cat.category} className="flex items-center justify-between py-1.5 text-[12px] group">
                                            <div className="flex items-center gap-2">
                                                <span 
                                                    className="w-2 h-2 rounded-full" 
                                                    style={{ backgroundColor: categoryColor(cat.category) }}
                                                />
                                                <span className="text-text-secondary group-hover:text-text-primary transition-colors">{cat.label}</span>
                                            </div>
                                            <span className="text-text-muted font-mono text-[11px] group-hover:text-text-secondary transition-colors">
                                                {cat.fileCount} · {formatSize(cat.totalSize)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Accordion>
                    )}
                </div>
            )}
        </div>
    );
}
