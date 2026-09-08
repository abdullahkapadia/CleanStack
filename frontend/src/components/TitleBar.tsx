import { useState } from "react";

interface TitleBarProps {
    onSettingsClick: () => void;
}

export default function TitleBar({ onSettingsClick }: TitleBarProps) {
    const [isMaximized, setIsMaximized] = useState(false);

    function handleMinimize() {
        (window as any).runtime.WindowMinimise();
    }

    function handleMaximize() {
        if (isMaximized) {
            (window as any).runtime.WindowUnmaximise();
        } else {
            (window as any).runtime.WindowMaximise();
        }
        setIsMaximized(!isMaximized);
    }

    function handleClose() {
        (window as any).runtime.Quit();
    }

    return (
        <div className="flex items-center h-11 bg-surface-raised border-b border-border select-none"
             style={{ "--wails-draggable": "drag" } as React.CSSProperties}>

            <div className="flex items-center gap-2 pl-4"
                 style={{ "--wails-draggable": "no-drag" } as React.CSSProperties}>
                <button onClick={handleClose}
                    className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-90 transition-all" />
                <button onClick={handleMinimize}
                    className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-90 transition-all" />
                <button onClick={handleMaximize}
                    className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-90 transition-all" />
            </div>

            <div className="flex-1 text-center text-sm text-text-secondary font-medium">
                AI Project Cleaner
            </div>

            <button onClick={onSettingsClick}
                className="px-4 h-full flex items-center text-text-muted hover:text-text-secondary transition-colors"
                style={{ "--wails-draggable": "no-drag" } as React.CSSProperties}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="8" cy="8" r="2.5" />
                    <path d="M8 1.5v1.2M8 13.3v1.2M1.5 8h1.2M13.3 8h1.2M3.4 3.4l.85.85M11.75 11.75l.85.85M3.4 12.6l.85-.85M11.75 4.25l.85-.85" />
                </svg>
            </button>
        </div>
    );
}
