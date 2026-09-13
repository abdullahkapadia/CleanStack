export namespace scanner {
	
	export class CategorySummary {
	    category: string;
	    label: string;
	    fileCount: number;
	    totalSize: number;
	    description: string;
	
	    static createFrom(source: any = {}) {
	        return new CategorySummary(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.category = source["category"];
	        this.label = source["label"];
	        this.fileCount = source["fileCount"];
	        this.totalSize = source["totalSize"];
	        this.description = source["description"];
	    }
	}
	export class FileIssue {
	    path: string;
	    relPath: string;
	    size: number;
	    category: string;
	    description: string;
	
	    static createFrom(source: any = {}) {
	        return new FileIssue(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.path = source["path"];
	        this.relPath = source["relPath"];
	        this.size = source["size"];
	        this.category = source["category"];
	        this.description = source["description"];
	    }
	}
	export class ScanResult {
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
	
	    static createFrom(source: any = {}) {
	        return new ScanResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.projectPath = source["projectPath"];
	        this.projectName = source["projectName"];
	        this.totalFiles = source["totalFiles"];
	        this.totalDirs = source["totalDirs"];
	        this.totalSize = source["totalSize"];
	        this.issues = this.convertValues(source["issues"], FileIssue);
	        this.categories = this.convertValues(source["categories"], CategorySummary);
	        this.scannedAt = source["scannedAt"];
	        this.scanDurationMs = source["scanDurationMs"];
	        this.cleanableSize = source["cleanableSize"];
	        this.cleanableCount = source["cleanableCount"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

