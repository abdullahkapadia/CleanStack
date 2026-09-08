export default function ScanPage() {
    return (
        <div className="p-10 h-full overflow-y-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-text-primary tracking-tight">Scan</h1>
                <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                    Analyze your project for issues.
                </p>
            </div>

            <div className="border border-border border-dashed rounded-xl p-16 flex flex-col items-center justify-center max-w-2xl">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted mb-4">
                    <circle cx="15" cy="15" r="10" />
                    <path d="M24 24l7 7" />
                </svg>
                <p className="text-sm font-medium text-text-secondary mb-1">
                    Scanning features coming in Phase 2
                </p>
                <p className="text-xs text-text-muted text-center leading-relaxed max-w-sm">
                    Project analysis, security checks, and dependency scanning will be available here.
                </p>
            </div>
        </div>
    );
}
