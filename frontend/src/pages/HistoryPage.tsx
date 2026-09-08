export default function HistoryPage() {
    return (
        <div className="p-8 h-full overflow-y-auto">
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-text-primary">History</h1>
                <p className="text-sm text-text-secondary mt-1">View past scans and cleanup actions.</p>
            </div>

            <div className="border border-border border-dashed rounded-lg p-12 flex flex-col items-center justify-center max-w-2xl">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted mb-3">
                    <circle cx="16" cy="16" r="12" />
                    <path d="M16 8v8l5 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-sm text-text-secondary mb-1">No history yet</p>
                <p className="text-xs text-text-muted">Scan and cleanup actions will appear here once you start using the tool.</p>
            </div>
        </div>
    );
}
