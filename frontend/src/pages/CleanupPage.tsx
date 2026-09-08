export default function CleanupPage() {
    return (
        <div className="p-8 h-full overflow-y-auto">
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-text-primary">Cleanup</h1>
                <p className="text-sm text-text-secondary mt-1">Remove unnecessary files and dependencies.</p>
            </div>

            <div className="border border-border border-dashed rounded-lg p-12 flex flex-col items-center justify-center max-w-2xl">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted mb-3">
                    <path d="M6 10h20M12 10V7a2 2 0 012-2h4a2 2 0 012 2v3M14 15v8M18 15v8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 10l1.2 16a2.5 2.5 0 002.5 2.5h8.6a2.5 2.5 0 002.5-2.5L24 10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-sm text-text-secondary mb-1">Cleanup features coming in a future phase</p>
                <p className="text-xs text-text-muted">Safe file removal, dependency cleanup, and build artifact management will be available here.</p>
            </div>
        </div>
    );
}
