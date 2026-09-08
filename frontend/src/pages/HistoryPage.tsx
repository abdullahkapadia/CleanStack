export default function HistoryPage() {
    return (
        <div className="p-10 h-full overflow-y-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-text-primary tracking-tight">History</h1>
                <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                    View past scans and cleanup actions.
                </p>
            </div>

            <div className="border border-border border-dashed rounded-xl p-16 flex flex-col items-center justify-center max-w-2xl">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted mb-4">
                    <circle cx="18" cy="18" r="13" />
                    <path d="M18 9v9l5.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-sm font-medium text-text-secondary mb-1">No history yet</p>
                <p className="text-xs text-text-muted text-center leading-relaxed max-w-sm">
                    Scan and cleanup actions will appear here once you start using the tool.
                </p>
            </div>
        </div>
    );
}
