export interface Project {
    name: string;
    path: string;
}

export type Page = "dashboard" | "projects" | "scan" | "cleanup" | "history" | "settings";
