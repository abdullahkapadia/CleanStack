import { useState, useEffect } from "react";
import { Project, ScanResult } from "../types";
import { CleanFiles } from "../../wailsjs/go/main/App";
import { formatSize, categoryColor, categoryIcon } from "../utils/format";

interface CleanupPageProps {
    project: Project | null;
    scanResult: ScanResult | null;
    onCleanupComplete: () => void;
    onError: (message: string) => void;
}

export default function CleanupPage({ project, scanResult, onCleanupComplete, onError }: CleanupPageProps) {
    const [selectedPaths, setSelectedPaths] = useState<Set<string>>(new Set());
    const [cleaning, setCleaning] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Auto-select all items by default when scanResult changes
    useEffect(() => {
        if (scanResult) {
            const allPaths = new Set(scanResult.issues.map(i => i.path));
            setSelectedPaths(allPaths);
            setSuccessMessage(null);
        }
    }, [scanResult]);

    async function handleCleanup() {
        if (!project || selectedPaths.size === 0) return;
        setCleaning(true);
        try {
            const pathsToClean = Array.from(selectedPaths);
            const bytesFreed = await CleanFiles(project.name, project.path, pathsToClean);
            setSuccessMessage(`Successfully deleted ${pathsToClean.length} items and freed ${formatSize(bytesFreed)}.`);
            setSelectedPaths(new Set());
            onCleanupComplete();
        } catch (err) {
            onError("Cleanup failed. Please try again.");
        } finally {
            setCleaning(false);
        }
    }

    function toggleSelection(path: string) {
        const newSet = new Set(selectedPaths);
        if (newSet.has(path)) {
            newSet.delete(path);
        } else {
            newSet.add(path);
        }
        setSelectedPaths(newSet);
    }

    function toggleAll() {
        if (!scanResult) return;
        if (selectedPaths.size === scanResult.issues.length) {
            setSelectedPaths(new Set()); // Deselect all
        } else {
            setSelectedPaths(new Set(scanResult.issues.map(i => i.path))); // Select all
        }
    }

    if (!project || !scanResult) {
        return (
            <div className="p-8 lg:p-10 h-full overflow-y-auto relative">
                <div className="mb-6 animate-fade-in relative z-10">
                    <h1 className="text-[22px] font-bold text-text-primary tracking-tight leading-tight">Cleanup</h1>
                    <p className="text-[13px] text-text-secondary mt-1">Remove unnecessary files and dependencies.</p>
                </div>
                
                {successMessage ? (
                    <div className="border border-success/30 rounded-2xl p-14 flex flex-col items-center justify-center max-w-lg bg-success-subtle/20 animate-fade-in relative z-10">
                        <div className="w-12 h-12 rounded-full bg-success/10 text-success flex items-center justify-center mb-4">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <p className="text-[14px] font-semibold text-text-primary mb-1">Cleanup Complete</p>
                        <p className="text-[12.5px] text-text-secondary text-center leading-relaxed">{successMessage}</p>
                    </div>
                ) : (
                    <div className="border border-border/60 border-dashed rounded-2xl p-14 flex flex-col items-center justify-center max-w-lg animate-fade-in relative z-10">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3" className="text-text-muted/50 mb-3">
                            <path d="M6 9h16M10 9V7a1.5 1.5 0 011.5-1.5h5A1.5 1.5 0 0118 7v2M12 13v7M16 13v7" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7.5 9l1 14a2.5 2.5 0 002.5 2.5h6a2.5 2.5 0 002.5-2.5l1-14" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-[13px] font-semibold text-text-secondary mb-0.5">Nothing to clean</p>
                        <p className="text-[11.5px] text-text-muted text-center leading-relaxed max-w-xs">
                            Please scan a project first to identify files that can be safely removed.
                        </p>
                    </div>
                )}
            </div>
        );
    }

    const totalSelectedSize = scanResult.issues
        .filter(i => selectedPaths.has(i.path))
        .reduce((sum, i) => sum + i.size, 0);

    return (
        <div className="p-8 lg:p-10 h-full overflow-y-auto relative flex flex-col">
            <div className="mb-6 animate-fade-in relative z-10 flex items-start justify-between flex-shrink-0">
                <div>
                    <h1 className="text-[22px] font-bold text-text-primary tracking-tight leading-tight">Cleanup</h1>
                    <p className="text-[13px] text-text-secondary mt-1">Review and remove identified issues in {project.name}.</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="text-right mr-2">
                        <span className="block text-[10px] font-semibold uppercase tracking-[0.1em] text-text-muted/60">Selected to free</span>
                        <span className="block text-[15px] font-bold text-text-primary">{formatSize(totalSelectedSize)}</span>
                    </div>
                    <button
                        onClick={handleCleanup}
                        disabled={selectedPaths.size === 0 || cleaning}
                        className={`px-5 py-2 text-white text-[13px] font-medium rounded-lg transition-all duration-150 shadow-[0_1px_2px_rgba(239,68,68,0.25)] flex items-center gap-2
                            ${selectedPaths.size === 0 || cleaning 
                                ? "bg-text-muted cursor-not-allowed shadow-none" 
                                : "bg-danger hover:bg-danger/90 active:scale-95"}`}
                    >
                        {cleaning ? (
                            <>
                                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Cleaning...
                            </>
                        ) : (
                            <>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                                Delete Selected ({selectedPaths.size})
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="glass-panel rounded-2xl overflow-hidden flex flex-col flex-1 min-h-[300px] animate-fade-in relative z-10 shadow-sm border border-border/50">
                <div className="px-5 py-3 border-b border-border/40 bg-surface/80 flex items-center gap-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input 
                            type="checkbox" 
                            checked={selectedPaths.size > 0 && selectedPaths.size === scanResult.issues.length}
                            ref={input => {
                                if (input) {
                                    input.indeterminate = selectedPaths.size > 0 && selectedPaths.size < scanResult.issues.length;
                                }
                            }}
                            onChange={toggleAll}
                            className="w-4 h-4 rounded border-border/50 text-danger focus:ring-danger/20 transition-all cursor-pointer accent-danger"
                        />
                        <span className="text-[12px] font-semibold text-text-primary">Select All</span>
                    </label>
                </div>

                <div className="overflow-y-auto flex-1 bg-surface/30">
                    <table className="w-full">
                        <tbody>
                            {scanResult.issues.map((issue, idx) => (
                                <tr
                                    key={idx}
                                    onClick={() => toggleSelection(issue.path)}
                                    className={`border-b border-border/30 last:border-0 transition-colors duration-100 cursor-pointer
                                        ${selectedPaths.has(issue.path) ? "bg-danger-subtle/10" : "hover:bg-surface-hover/30"}`}
                                >
                                    <td className="px-5 py-3 w-[40px]">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedPaths.has(issue.path)}
                                            onChange={() => {}} // handled by row click
                                            className="w-4 h-4 rounded border-border/50 text-danger focus:ring-danger/20 transition-all cursor-pointer accent-danger"
                                        />
                                    </td>
                                    <td className="px-2 py-3 w-[150px]">
                                        <span
                                            className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-1 rounded-md"
                                            style={{
                                                backgroundColor: categoryColor(issue.category) + "15",
                                                color: categoryColor(issue.category),
                                            }}
                                        >
                                            {categoryIcon(issue.category)} {issue.description}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-[12px] text-text-secondary font-mono truncate max-w-[300px]">
                                        {issue.relPath}
                                    </td>
                                    <td className="px-5 py-3 text-[12px] text-text-muted text-right whitespace-nowrap font-mono w-[100px]">
                                        {formatSize(issue.size)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
