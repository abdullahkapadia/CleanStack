interface StatusBarProps {
    status: string;
}

export default function StatusBar({ status }: StatusBarProps) {
    return (
        <div className="h-[26px] bg-surface-raised border-t border-border/40 flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center gap-[6px] text-[10.5px] text-text-muted/70 font-medium">
                <span className="w-[5px] h-[5px] rounded-full bg-success shadow-[0_0_4px_rgba(52,199,114,0.4)]" />
                {status}
            </div>
            <span className="text-[10px] text-text-muted/40 font-medium">Phase 2</span>
        </div>
    );
}
