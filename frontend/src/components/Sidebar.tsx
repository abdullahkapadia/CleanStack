import { Page } from "../types";

interface SidebarProps {
    activePage: Page;
    onNavigate: (page: Page) => void;
}

interface NavItem {
    id: Page;
    label: string;
    icon: JSX.Element;
}

const navItems: NavItem[] = [
    {
        id: "dashboard",
        label: "Dashboard",
        icon: (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="5.5" height="5.5" rx="1" />
                <rect x="10.5" y="2" width="5.5" height="5.5" rx="1" />
                <rect x="2" y="10.5" width="5.5" height="5.5" rx="1" />
                <rect x="10.5" y="10.5" width="5.5" height="5.5" rx="1" />
            </svg>
        ),
    },
    {
        id: "projects",
        label: "Projects",
        icon: (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 5.5L2 14a1.5 1.5 0 001.5 1.5h11A1.5 1.5 0 0016 14V7a1.5 1.5 0 00-1.5-1.5H9L7.5 3.5H3.5A1.5 1.5 0 002 5z" />
            </svg>
        ),
    },
    {
        id: "scan",
        label: "Scan",
        icon: (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="8" r="5.5" />
                <path d="M13 13l3 3" />
            </svg>
        ),
    },
    {
        id: "cleanup",
        label: "Cleanup",
        icon: (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 5h12M6 5V3.5a1 1 0 011-1h4a1 1 0 011 1V5M7.5 8v5M10.5 8v5" />
                <path d="M4 5l.7 9.5a1.5 1.5 0 001.5 1.5h5.6a1.5 1.5 0 001.5-1.5L14 5" />
            </svg>
        ),
    },
    {
        id: "history",
        label: "History",
        icon: (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="9" r="7" />
                <path d="M9 5v4l2.5 2.5" />
            </svg>
        ),
    },
];

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
    return (
        <div className="w-52 bg-surface-raised border-r border-border flex flex-col">
            <nav className="flex-1 py-3 px-2 space-y-0.5">
                {navItems.map((item) => {
                    const isActive = activePage === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
                                ${isActive
                                    ? "bg-accent-subtle text-accent"
                                    : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
                                }`}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    );
                })}
            </nav>
        </div>
    );
}
