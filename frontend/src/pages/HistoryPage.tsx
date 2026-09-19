import { useState, useEffect } from "react";
import { ActionHistory } from "../types";
import { GetHistory } from "../../wailsjs/go/main/App";
import { categoryColor } from "../utils/format";

export default function HistoryPage() {
    const [history, setHistory] = useState<ActionHistory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadHistory();
    }, []);

    async function loadHistory() {
        try {
            setLoading(true);
            const data = await GetHistory();
            setHistory(data || []);
        } catch (err) {
            console.error("Failed to load history", err);
        } finally {
            setLoading(false);
        }
    }

    function formatDate(dateStr: string) {
        try {
            const date = new Date(dateStr);
            return new Intl.DateTimeFormat('en-US', {
                month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'
            }).format(date);
        } catch (e) {
            return dateStr;
        }
    }

    if (loading) {
        return (
            <div className="p-8 lg:p-10 h-full overflow-y-auto relative flex items-center justify-center">
                <div className="w-8 h-8 border-[2.5px] border-surface-overlay border-t-accent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-8 lg:p-10 h-full overflow-y-auto relative flex flex-col bg-surface">
            <div className="mb-6 animate-fade-in relative z-10 flex items-start justify-between">
                <div>
                    <h1 className="text-[22px] font-bold text-text-primary tracking-tight leading-tight">History</h1>
                    <p className="text-[13px] text-text-secondary mt-1">Review past scans and cleanup actions.</p>
                </div>
                <button
                    onClick={loadHistory}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-border/70 text-text-secondary hover:text-text-primary hover:bg-surface-hover active:scale-95 transition-all duration-150"
                    title="Refresh history"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="23 4 23 10 17 10"></polyline>
                        <polyline points="1 20 1 14 7 14"></polyline>
                        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                    </svg>
                </button>
            </div>

            {history.length === 0 ? (
                <div className="flat-panel p-14 flex flex-col items-center justify-center max-w-lg animate-fade-in relative z-10">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3" className="text-text-muted/50 mb-3">
                        <circle cx="14" cy="14" r="10.5" />
                        <path d="M14 7v7l4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-[13px] font-semibold text-text-secondary mb-0.5">No history yet</p>
                    <p className="text-[11.5px] text-text-muted text-center leading-relaxed max-w-xs">
                        Scan and cleanup actions will appear here once you start using the tool.
                    </p>
                </div>
            ) : (
                <div className="max-w-2xl space-y-4 animate-fade-in relative z-10">
                    {history.map((item, idx) => {
                        const isScan = item.actionType === "scan";
                        return (
                            <div key={item.id || idx} className="flat-panel p-5 flex items-start gap-4">
                                <div 
                                    className={`w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5
                                        ${isScan ? "bg-accent/10 text-accent" : "bg-danger/10 text-danger"}`}
                                >
                                    {isScan ? (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="11" cy="11" r="8"></circle>
                                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                        </svg>
                                    ) : (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        </svg>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-1">
                                        <h3 className="text-[14px] font-semibold text-text-primary flex items-center gap-2">
                                            {isScan ? "Project Scanned" : "Project Cleaned"}
                                            <span className="text-[10px] uppercase font-bold tracking-wide text-text-muted/60 bg-surface-overlay/80 px-2 py-0.5 rounded-full border border-border/30">
                                                {item.projectName}
                                            </span>
                                        </h3>
                                        <span className="text-[11px] text-text-muted font-medium bg-surface-raised px-2 py-1 rounded-md border border-border">
                                            {formatDate(item.timestamp)}
                                        </span>
                                    </div>
                                    <p className="text-[12.5px] text-text-secondary leading-relaxed mb-2">
                                        {item.details}
                                    </p>
                                    <code className="text-[10px] text-text-muted/70 font-mono block truncate max-w-[400px]" title={item.projectPath}>
                                        {item.projectPath}
                                    </code>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
