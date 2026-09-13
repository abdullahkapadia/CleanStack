export default function HistoryPage() {
    return (
        <div className="p-8 lg:p-10 h-full overflow-y-auto">
            <div className="mb-6 animate-fade-in">
                <h1 className="text-[22px] font-bold text-text-primary tracking-tight leading-tight">History</h1>
                <p className="text-[13px] text-text-secondary mt-1">View past scans and cleanup actions.</p>
            </div>
            <div className="border border-border/60 border-dashed rounded-2xl p-14 flex flex-col items-center justify-center max-w-lg animate-fade-in">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3" className="text-text-muted/50 mb-3">
                    <circle cx="14" cy="14" r="10.5" />
                    <path d="M14 7v7l4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-[13px] font-semibold text-text-secondary mb-0.5">No history yet</p>
                <p className="text-[11.5px] text-text-muted text-center leading-relaxed max-w-xs">
                    Scan and cleanup actions will appear here once you start using the tool.
                </p>
            </div>
        </div>
    );
}
