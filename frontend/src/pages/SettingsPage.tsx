export default function SettingsPage() {
    return (
        <div className="p-8 h-full overflow-y-auto">
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-text-primary">Settings</h1>
                <p className="text-sm text-text-secondary mt-1">Configure application preferences.</p>
            </div>

            <div className="max-w-2xl space-y-6">
                <div className="border border-border rounded-lg bg-surface-raised">
                    <div className="p-4 border-b border-border-subtle">
                        <h2 className="text-sm font-medium text-text-primary">General</h2>
                    </div>
                    <div className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-sm text-text-primary block">Theme</span>
                                <span className="text-xs text-text-muted">Application color scheme</span>
                            </div>
                            <span className="text-sm text-text-muted px-3 py-1 bg-surface-overlay rounded-md">Dark</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-sm text-text-primary block">Version</span>
                                <span className="text-xs text-text-muted">Current application version</span>
                            </div>
                            <span className="text-sm text-text-muted font-mono">1.0.0-alpha</span>
                        </div>
                    </div>
                </div>

                <div className="border border-border rounded-lg bg-surface-raised">
                    <div className="p-4 border-b border-border-subtle">
                        <h2 className="text-sm font-medium text-text-primary">About</h2>
                    </div>
                    <div className="p-4">
                        <p className="text-sm text-text-secondary">
                            AI Project Cleaner analyzes software projects to identify unnecessary files,
                            potential security issues, unused dependencies, and other project-health problems.
                        </p>
                        <p className="text-xs text-text-muted mt-2">
                            Built with Go, Wails, React, and TypeScript.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
