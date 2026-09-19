import { useState, useEffect } from "react";
import { Project, ScanResult } from "../types";
import { ScanProject, GetAIInsights } from "../../wailsjs/go/main/App";
import { formatSize, formatDuration, categoryIcon, categoryColor } from "../utils/format";
import Accordion from "../components/Accordion";

interface ScanPageProps {
    project: Project | null;
    scanResult: ScanResult | null;
    onScanComplete: (result: ScanResult) => void;
    onError: (message: string) => void;
}

export default function ScanPage({ project, scanResult, onScanComplete, onError }: ScanPageProps) {
    const [scanning, setScanning] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [aiInsight, setAiInsight] = useState<string | null>(null);

    useEffect(() => {
        if (scanResult) {
            GetAIInsights(scanResult as any).then(setAiInsight).catch(console.error);
        } else {
            setAiInsight(null);
        }
    }, [scanResult]);

    async function handleScan() {
        if (!project) return;
        setScanning(true);
        setActiveCategory(null);
        try {
            const result = await ScanProject(project.path);
            onScanComplete(result);
        } catch (err) {
            onError("Scan failed. Please try again.");
        } finally {
            setScanning(false);
        }
    }

    if (!project) {
        return (
            <div className="p-8 lg:p-10 h-full overflow-y-auto relative">
                <PageHeader title="Scan" subtitle="Analyze your project for issues." />
                <EmptyState
                    icon={
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3" className="text-text-muted">
                            <path d="M4 8V20a3 3 0 003 3h14a3 3 0 003-3V11a3 3 0 00-3-3h-6l-2.5-3H7a3 3 0 00-3 3z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    }
                    title="No project selected"
                    subtitle="Select a project from the Dashboard to start scanning."
                />
            </div>
        );
    }

    if (scanning) {
        return (
            <div className="p-8 lg:p-10 h-full overflow-y-auto relative">
                <PageHeader title="Scan" subtitle={`Analyzing ${project.name}...`} />
                <div className="flat-panel p-14 flex flex-col items-center justify-center max-w-lg animate-fade-in relative overflow-hidden">
                    <div className="w-8 h-8 border-[2.5px] border-surface-overlay border-t-text-primary rounded-full animate-spin mb-4 relative z-10" />
                    <p className="text-[13px] font-semibold text-text-primary mb-0.5 relative z-10">Scanning project...</p>
                    <p className="text-[11.5px] text-text-muted relative z-10">This may take a moment for large projects.</p>
                </div>
            </div>
        );
    }

    if (!scanResult) {
        return (
            <div className="p-8 lg:p-10 h-full overflow-y-auto relative">
                <PageHeader title="Scan" subtitle="Analyze your project for issues." />
                <div className="flat-panel max-w-lg overflow-hidden animate-fade-in relative">
                    <div className="px-6 py-5 border-b border-border relative z-10">
                        <span className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-text-muted/60">Project</span>
                        <h2 className="text-[16px] font-bold text-text-primary mt-1 tracking-tight">{project.name}</h2>
                        <code className="text-[11px] text-text-muted font-mono mt-0.5 block">{project.path}</code>
                    </div>
                    <div className="px-6 py-5 relative z-10">
                        <p className="text-[12.5px] text-text-secondary mb-4 leading-relaxed">
                            Scan will analyze the project directory for build artifacts, cache files, 
                            log files, OS junk, large files, and temporary files.
                        </p>
                        <button
                            onClick={handleScan}
                            className="px-4 py-2 bg-text-primary hover:bg-accent-hover active:scale-95 text-surface text-[13px] font-medium rounded-md transition-all duration-150 shadow-sm"
                        >
                            Start Scan
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const filteredCategories = activeCategory
        ? scanResult.categories.filter(c => c.category === activeCategory)
        : scanResult.categories;

    return (
        <div className="p-8 lg:p-10 h-full overflow-y-auto">
            <div className="mb-6 flex items-start justify-between animate-fade-in">
                <div>
                    <h1 className="text-[22px] font-bold text-text-primary tracking-tight leading-tight">Scan Results</h1>
                    <p className="text-[13px] text-text-secondary mt-1">
                        {project.name} — scanned in {formatDuration(scanResult.scanDurationMs)}
                    </p>
                </div>
                <button
                    onClick={handleScan}
                    className="px-3.5 py-[7px] border border-border text-text-secondary hover:text-text-primary hover:bg-surface-hover active:scale-95 text-[12.5px] font-medium rounded-md transition-all duration-150"
                >
                    Re-scan
                </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6 max-w-4xl animate-fade-in" style={{ animationDelay: "50ms" }}>
                {[
                    { label: "Total Files", value: scanResult.totalFiles.toLocaleString(), accent: false },
                    { label: "Project Size", value: formatSize(scanResult.totalSize), accent: false },
                    { label: "Issues Found", value: String(scanResult.cleanableCount), accent: scanResult.cleanableCount > 0 },
                    { label: "Cleanable", value: formatSize(scanResult.cleanableSize), accent: scanResult.cleanableSize > 0 },
                ].map((card) => (
                    <div key={card.label} className="flat-panel p-4">
                        <span className="text-[9.5px] font-semibold uppercase tracking-[0.1em] text-text-muted/60 block mb-0.5">
                            {card.label}
                        </span>
                        <span className={`text-[18px] font-bold tracking-tight ${card.accent ? "text-success" : "text-text-primary"}`}>
                            {card.value}
                        </span>
                    </div>
                ))}
            </div>

            {aiInsight && (
                <div className="mb-6 max-w-4xl animate-fade-in relative z-10" style={{ animationDelay: "75ms" }}>
                    <div className="flat-panel p-5 border-l-4 border-l-success bg-surface-raised">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-md bg-success/10 flex items-center justify-center flex-shrink-0 text-success">
                                ✨
                            </div>
                            <div>
                                <h3 className="text-[13px] font-bold text-text-primary mb-1">AI Insight</h3>
                                <div className="text-[12.5px] text-text-secondary leading-relaxed whitespace-pre-wrap">
                                    {aiInsight}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {scanResult.categories.length === 0 ? (
                <div className="border border-border/60 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center max-w-4xl animate-fade-in">
                    <p className="text-[15px] mb-1">✨</p>
                    <p className="text-[13px] font-semibold text-text-primary mb-0.5">Project looks clean!</p>
                    <p className="text-[11.5px] text-text-muted">No issues were found in this project.</p>
                </div>
            ) : (
                <div className="max-w-4xl space-y-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        <FilterPill
                            active={activeCategory === null}
                            onClick={() => setActiveCategory(null)}
                            label={`All (${scanResult.issues.length})`}
                        />
                        {scanResult.categories.map(cat => (
                            <FilterPill
                                key={cat.category}
                                active={activeCategory === cat.category}
                                onClick={() => setActiveCategory(cat.category)}
                                label={`${categoryIcon(cat.category)} ${cat.label} (${cat.fileCount})`}
                            />
                        ))}
                    </div>

                    <div className="space-y-3">
                        {filteredCategories.map(cat => {
                            const catIssues = scanResult.issues.filter(i => i.category === cat.category);
                            
                            const headerTitle = (
                                <div className="flex items-center gap-3">
                                    <span 
                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[14px]"
                                        style={{ backgroundColor: categoryColor(cat.category) + "15", color: categoryColor(cat.category) }}
                                    >
                                        {categoryIcon(cat.category)}
                                    </span>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[14px]">{cat.label}</span>
                                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-surface-overlay/80 border border-border/30 text-text-secondary">
                                                {cat.fileCount} items
                                            </span>
                                        </div>
                                        <div className="text-[11.5px] text-text-muted font-normal mt-0.5">
                                            {formatSize(cat.totalSize)} · {cat.description}
                                        </div>
                                    </div>
                                </div>
                            );

                            return (
                                <Accordion 
                                    key={cat.category} 
                                    title={headerTitle} 
                                    defaultExpanded={activeCategory === cat.category}
                                    className="border-none shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05),0_1px_4px_-1px_rgba(0,0,0,0.03)]"
                                    headerClassName="py-3"
                                >
                                    <div className="bg-surface/30">
                                        <table className="w-full">
                                            <tbody>
                                                {catIssues.map((issue, idx) => (
                                                    <tr
                                                        key={idx}
                                                        className="border-b border-border/30 last:border-0 hover:bg-surface-hover/30 transition-colors duration-100"
                                                    >
                                                        <td className="px-6 py-2.5 text-[12px] text-text-secondary font-mono truncate max-w-[400px]" title={issue.relPath}>
                                                            {issue.relPath}
                                                        </td>
                                                        <td className="px-6 py-2.5 text-[12px] text-text-muted text-right whitespace-nowrap font-mono w-[100px]">
                                                            {formatSize(issue.size)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </Accordion>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
    return (
        <div className="mb-6 animate-fade-in relative z-10">
            <h1 className="text-[22px] font-bold text-text-primary tracking-tight leading-tight">{title}</h1>
            <p className="text-[13px] text-text-secondary mt-1">{subtitle}</p>
        </div>
    );
}

function EmptyState({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
    return (
        <div className="border border-border/60 border-dashed rounded-2xl p-14 flex flex-col items-center justify-center max-w-lg animate-fade-in relative z-10">
            <div className="mb-3 opacity-50">{icon}</div>
            <p className="text-[13px] font-semibold text-text-secondary mb-0.5">{title}</p>
            <p className="text-[11.5px] text-text-muted text-center leading-relaxed max-w-xs">{subtitle}</p>
        </div>
    );
}

function FilterPill({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-[6px] rounded-md text-[11.5px] font-medium transition-all duration-200 focus:outline-none active:scale-95
                ${active
                    ? "bg-text-primary text-surface shadow-sm"
                    : "bg-surface-raised text-text-secondary hover:text-text-primary hover:shadow-sm border border-border"
                }`}
        >
            {label}
        </button>
    );
}
