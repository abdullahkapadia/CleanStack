export default function CleanupPage() {
    return (
        <div className="p-8 lg:p-10 h-full overflow-y-auto">
            <div className="mb-6 animate-fade-in">
                <h1 className="text-[22px] font-bold text-text-primary tracking-tight leading-tight">Cleanup</h1>
                <p className="text-[13px] text-text-secondary mt-1">Remove unnecessary files and dependencies.</p>
            </div>
            <div className="border border-border/60 border-dashed rounded-2xl p-14 flex flex-col items-center justify-center max-w-lg animate-fade-in">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3" className="text-text-muted/50 mb-3">
                    <path d="M6 9h16M10 9V7a1.5 1.5 0 011.5-1.5h5A1.5 1.5 0 0118 7v2M12 13v7M16 13v7" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.5 9l1 14a2.5 2.5 0 002.5 2.5h6a2.5 2.5 0 002.5-2.5l1-14" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-[13px] font-semibold text-text-secondary mb-0.5">Cleanup features coming soon</p>
                <p className="text-[11.5px] text-text-muted text-center leading-relaxed max-w-xs">
                    Safe file removal, dependency cleanup, and build artifact management will be available here.
                </p>
            </div>
        </div>
    );
}
