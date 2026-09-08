export default function ScanPage() {
    return (
        <div className="p-8 h-full overflow-y-auto">
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-text-primary">Scan</h1>
                <p className="text-sm text-text-secondary mt-1">Analyze your project for issues.</p>
            </div>

            <div className="border border-border border-dashed rounded-lg p-12 flex flex-col items-center justify-center max-w-2xl">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted mb-3">
                    <circle cx="14" cy="14" r="9" />
                    <path d="M22 22l6 6" />
                </svg>
                <p className="text-sm text-text-secondary mb-1">Scanning features coming in Phase 2</p>
                <p className="text-xs text-text-muted">Project analysis, security checks, and dependency scanning will be available here.</p>
            </div>
        </div>
    );
}
