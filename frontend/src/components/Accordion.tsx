import { useState, ReactNode } from "react";

interface AccordionProps {
    title: ReactNode;
    children: ReactNode;
    defaultExpanded?: boolean;
    className?: string;
    headerClassName?: string;
}

export default function Accordion({ 
    title, 
    children, 
    defaultExpanded = false,
    className = "",
    headerClassName = ""
}: AccordionProps) {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    return (
        <div className={`border border-border/70 rounded-2xl bg-surface-raised shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-200 ${className}`}>
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`w-full flex items-center justify-between px-6 py-4 bg-surface/50 hover:bg-surface-hover/50 transition-colors duration-150 focus:outline-none ${headerClassName}`}
            >
                <div className="flex-1 text-left text-[13px] font-semibold text-text-primary">
                    {title}
                </div>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-surface-overlay border border-border/50 text-text-muted transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 6l4 4 4-4" />
                    </svg>
                </div>
            </button>
            <div className={`accordion-grid ${isExpanded ? "expanded" : ""}`}>
                <div className="accordion-grid-inner">
                    <div className="border-t border-border/40 bg-surface-raised">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
