interface StatusBarProps {
    status: string;
}

export default function StatusBar({ status }: StatusBarProps) {
    return (
        <div className="h-7 bg-surface-raised border-t border-border flex items-center px-4">
            <div className="flex items-center gap-2 text-xs text-text-muted">
                <span className="w-2 h-2 rounded-full bg-success" />
                {status}
            </div>
        </div>
    );
}
