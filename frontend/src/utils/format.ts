export function formatSize(bytes: number): string {
    if (bytes === 0) return "0 B";
    const units = ["B", "KB", "MB", "GB"];
    const k = 1024;
    let i = 0;
    let val = bytes;
    while (val >= k && i < units.length - 1) {
        val /= k;
        i++;
    }
    if (i === 0) return `${bytes} B`;
    return `${val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)} ${units[i]}`;
}

export function formatDuration(ms: number): string {
    if (ms < 1000) return `${ms}ms`;
    const seconds = ms / 1000;
    if (seconds < 60) return `${seconds.toFixed(1)}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}m ${remainingSeconds}s`;
}

export function categoryIcon(category: string): string {
    const icons: Record<string, string> = {
        build_artifact: "📦",
        cache: "🗄️",
        log: "📝",
        os_junk: "🗑️",
        large_file: "📀",
        temp_file: "⏳",
    };
    return icons[category] || "📄";
}

export function categoryColor(category: string): string {
    const colors: Record<string, string> = {
        build_artifact: "#e67e22",
        cache: "#9b59b6",
        log: "#3498db",
        os_junk: "#95a5a6",
        large_file: "#e74c3c",
        temp_file: "#f39c12",
    };
    return colors[category] || "#7f8c8d";
}
