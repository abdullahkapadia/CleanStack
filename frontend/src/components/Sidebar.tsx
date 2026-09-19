import { Page } from "../types";

interface SidebarProps {
    activePage: Page;
    onNavigate: (page: Page) => void;
    isOpen: boolean;
}

interface NavItem {
    id: Page;
    label: string;
    icon: React.ReactNode;
}

const navItems: NavItem[] = [
    {
        id: "dashboard",
        label: "Dashboard",
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="4.8" height="4.8" rx="1.2" />
                <rect x="9.2" y="2" width="4.8" height="4.8" rx="1.2" />
                <rect x="2" y="9.2" width="4.8" height="4.8" rx="1.2" />
                <rect x="9.2" y="9.2" width="4.8" height="4.8" rx="1.2" />
            </svg>
        ),
    },
    {
        id: "projects",
        label: "Projects",
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 5V13a1.5 1.5 0 001.5 1.5h9A1.5 1.5 0 0014 13V6.5A1.5 1.5 0 0012.5 5H8L6.5 3H3.5A1.5 1.5 0 002 4.5z" />
            </svg>
        ),
    },
    {
        id: "scan",
        label: "Scan",
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="7" cy="7" r="4.5" />
                <path d="M11 11l3 3" />
            </svg>
        ),
    },
    {
        id: "cleanup",
        label: "Cleanup",
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 5h10M5.5 5V3.5a.8.8 0 01.8-.8h3.4a.8.8 0 01.8.8V5M6.5 7.5v4M9.5 7.5v4" />
                <path d="M3.8 5l.5 8a1.5 1.5 0 001.5 1.4h4.4a1.5 1.5 0 001.5-1.4l.5-8" />
            </svg>
        ),
    },
    {
        id: "history",
        label: "History",
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="8" r="6" />
                <path d="M8 4.5v3.5l2.2 2.2" />
            </svg>
        ),
    },
];

export default function Sidebar({ activePage, onNavigate, isOpen }: SidebarProps) {
    return (
        <aside className={`w-[260px] min-w-[260px] bg-surface-raised flex flex-col shrink-0 transition-all duration-300 ease-in-out relative z-20 ${isOpen ? "ml-0 opacity-100" : "-ml-[260px] opacity-0 pointer-events-none"}`}>
            <div className="px-4 pt-5 pb-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted/70">
                    Menu
                </span>
            </div>
            <nav className="flex-1 px-2.5 space-y-[2px]">
                {navItems.map((item, idx) => {
                    const isActive = activePage === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`w-full flex items-center gap-2.5 px-3 py-[7px] rounded-[6px] text-[13px] font-medium transition-all duration-150 focus:outline-none animate-slide-in
                                ${isActive
                                    ? "bg-text-primary text-surface"
                                    : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
                                }`}
                            style={{ animationDelay: `${idx * 30}ms` }}
                        >
                            <span className={isActive ? "opacity-100" : "opacity-60"}>{item.icon}</span>
                            {item.label}
                        </button>
                    );
                })}
            </nav>
            <div className="px-4 py-4 mt-auto">
                <span className="text-[10px] text-text-muted/50 font-medium">v1.0.0-alpha</span>
            </div>
        </aside>
    );
}
