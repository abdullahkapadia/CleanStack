export type Page = "dashboard" | "projects" | "scan" | "cleanup" | "history" | "settings";

export interface Project {
    name: string;
    path: string;
}

export interface FileIssue {
    path: string;
    relPath: string;
    size: number;
    category: string;
    description: string;
}

export interface CategorySummary {
    category: string;
    label: string;
    fileCount: number;
    totalSize: number;
    description: string;
}

export interface ScanResult {
    projectPath: string;
    projectName: string;
    totalFiles: number;
    totalDirs: number;
    totalSize: number;
    issues: FileIssue[];
    categories: CategorySummary[];
    scannedAt: string;
    scanDurationMs: number;
    cleanableSize: number;
    cleanableCount: number;
}

export interface ActionHistory {
    id: string;
    actionType: string;
    projectName: string;
    projectPath: string;
    details: string;
    timestamp: string;
}
