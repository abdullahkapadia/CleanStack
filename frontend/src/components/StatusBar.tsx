interface StatusBarProps {
    status: string;
}

export default function StatusBar({ status }: StatusBarProps) {
    return (
        <div className="h-8 bg-surface-raised border-t border-border flex items-center px-5">
            <div className="flex items-center gap-2 text-[11px] text-text-muted">
                <span className="w-[6px] h-[6px] rounded-full bg-success" />
                {status}
            </div>
        </div>
    );
}
