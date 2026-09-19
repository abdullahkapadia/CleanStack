import { useState } from "react";

interface TitleBarProps {
    onSettingsClick: () => void;
    onToggleSidebar: () => void;
    isSidebarOpen: boolean;
}

export default function TitleBar({ onSettingsClick, onToggleSidebar, isSidebarOpen }: TitleBarProps) {
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
        <div
            className="flex items-center h-[46px] bg-surface-raised border-b border-border select-none shrink-0"
            style={{ "--wails-draggable": "drag" } as React.CSSProperties}
        >
            <div className="flex-1 flex items-center gap-2 pl-2">
                <button
                    onClick={onToggleSidebar}
                    className="w-[36px] h-[36px] flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface-hover rounded-md transition-colors"
                    title={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
                    style={{ "--wails-draggable": "no-drag" } as React.CSSProperties}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
                <div className="flex items-center gap-2 text-[13px] text-text-primary font-semibold ml-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    </svg>
                    AI Project Cleaner
                </div>
            </div>

            <div
                className="flex items-center h-full"
                style={{ "--wails-draggable": "no-drag" } as React.CSSProperties}
            >
                <button
                    onClick={onSettingsClick}
                    className="w-[46px] h-full flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors"
                    title="Settings"
                >
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="7.5" cy="7.5" r="2.2" />
                        <path d="M7.5 1.5v1M7.5 12.5v1M1.5 7.5h1M12.5 7.5h1M3.3 3.3l.7.7M11 11l.7.7M3.3 11.7l.7-.7M11 4l.7-.7" />
                    </svg>
                </button>
                <div className="w-[1px] h-[16px] bg-border mx-1"></div>
                <button
                    onClick={handleMinimize}
                    className="w-[46px] h-full flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
                >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <line x1="1" y1="6" x2="11" y2="6" />
                    </svg>
                </button>
                <button
                    onClick={handleMaximize}
                    className="w-[46px] h-full flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
                >
                    {isMaximized ? (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="3" y="3" width="8" height="8" />
                            <polyline points="3 3 1 3 1 11 9 11 9 9" />
                        </svg>
                    ) : (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="1.5" y="1.5" width="9" height="9" />
                        </svg>
                    )}
                </button>
                <button
                    onClick={handleClose}
                    className="w-[46px] h-full flex items-center justify-center text-text-secondary hover:text-white hover:bg-[#e81123] transition-colors"
                >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <line x1="1.5" y1="1.5" x2="10.5" y2="10.5" />
                        <line x1="10.5" y1="1.5" x2="1.5" y2="10.5" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
