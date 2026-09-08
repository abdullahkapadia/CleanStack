export default function SettingsPage() {
    return (
        <div className="p-10 h-full overflow-y-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-text-primary tracking-tight">Settings</h1>
                <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                    Configure application preferences.
                </p>
            </div>

            <div className="max-w-2xl space-y-6">
                <div className="border border-border rounded-xl bg-surface shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-border bg-surface-raised">
                        <h2 className="text-sm font-semibold text-text-primary">General</h2>
                    </div>
                    <div className="px-6 py-5 space-y-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-sm font-medium text-text-primary block">Theme</span>
                                <span className="text-xs text-text-muted mt-0.5 block">
                                    Application color scheme
                                </span>
                            </div>
                            <span className="text-sm text-text-secondary px-3 py-1.5 bg-surface-overlay rounded-lg font-medium">
                                Light
                            </span>
                        </div>
                        <div className="h-px bg-border" />
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-sm font-medium text-text-primary block">Version</span>
                                <span className="text-xs text-text-muted mt-0.5 block">
                                    Current application version
                                </span>
                            </div>
                            <span className="text-sm text-text-secondary font-mono">1.0.0-alpha</span>
                        </div>
                    </div>
                </div>

                <div className="border border-border rounded-xl bg-surface shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-border bg-surface-raised">
                        <h2 className="text-sm font-semibold text-text-primary">About</h2>
                    </div>
                    <div className="px-6 py-5">
                        <p className="text-sm text-text-secondary leading-relaxed">
                            AI Project Cleaner analyzes software projects to identify unnecessary files,
                            potential security issues, unused dependencies, and other project-health problems.
                        </p>
                        <p className="text-xs text-text-muted mt-3">
                            Built with Go, Wails, React, and TypeScript.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
