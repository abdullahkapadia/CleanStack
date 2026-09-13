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
        <div
            className="flex items-center h-[46px] bg-surface-raised border-b border-border/60 select-none shrink-0"
            style={{ "--wails-draggable": "drag" } as React.CSSProperties}
        >
            <div
                className="flex items-center gap-[7px] pl-[18px]"
                style={{ "--wails-draggable": "no-drag" } as React.CSSProperties}
            >
                <button
                    onClick={handleClose}
                    className="w-[12px] h-[12px] rounded-full bg-[#ff5f57] hover:bg-[#e04a42] transition-colors duration-150 focus:outline-none"
                />
                <button
                    onClick={handleMinimize}
                    className="w-[12px] h-[12px] rounded-full bg-[#febc2e] hover:bg-[#e0a520] transition-colors duration-150 focus:outline-none"
                />
                <button
                    onClick={handleMaximize}
                    className="w-[12px] h-[12px] rounded-full bg-[#28c840] hover:bg-[#1fad34] transition-colors duration-150 focus:outline-none"
                />
            </div>

            <div className="flex-1 text-center text-[12.5px] text-text-muted font-medium tracking-wide">
                AI Project Cleaner
            </div>

            <button
                onClick={onSettingsClick}
                className="w-[46px] h-full flex items-center justify-center text-text-muted hover:text-text-secondary hover:bg-surface-hover transition-all duration-150 focus:outline-none"
                style={{ "--wails-draggable": "no-drag" } as React.CSSProperties}
            >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                    <circle cx="7.5" cy="7.5" r="2.2" />
                    <path d="M7.5 1.5v1M7.5 12.5v1M1.5 7.5h1M12.5 7.5h1M3.3 3.3l.7.7M11 11l.7.7M3.3 11.7l.7-.7M11 4l.7-.7" />
                </svg>
            </button>
        </div>
    );
}
