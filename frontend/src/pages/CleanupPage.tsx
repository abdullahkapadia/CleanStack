export default function CleanupPage() {
    return (
        <div className="p-10 h-full overflow-y-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-text-primary tracking-tight">Cleanup</h1>
                <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                    Remove unnecessary files and dependencies.
                </p>
            </div>

            <div className="border border-border border-dashed rounded-xl p-16 flex flex-col items-center justify-center max-w-2xl">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted mb-4">
                    <path d="M8 12h20M14 12V8.5a2 2 0 012-2h4a2 2 0 012 2V12M16 17v9M20 17v9" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 12l1.5 17a3 3 0 003 3h7a3 3 0 003-3L26 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-sm font-medium text-text-secondary mb-1">
                    Cleanup features coming in a future phase
                </p>
                <p className="text-xs text-text-muted text-center leading-relaxed max-w-sm">
                    Safe file removal, dependency cleanup, and build artifact management will be available here.
                </p>
            </div>
        </div>
    );
}
