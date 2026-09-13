package scanner

import (
	"os"
	"path/filepath"
	"strings"
	"time"
)

type FileIssue struct {
	Path        string `json:"path"`
	RelPath     string `json:"relPath"`
	Size        int64  `json:"size"`
	Category    string `json:"category"`
	Description string `json:"description"`
}

type CategorySummary struct {
	Category    string `json:"category"`
	Label       string `json:"label"`
	FileCount   int    `json:"fileCount"`
	TotalSize   int64  `json:"totalSize"`
	Description string `json:"description"`
}

type ScanResult struct {
	ProjectPath      string            `json:"projectPath"`
	ProjectName      string            `json:"projectName"`
	TotalFiles       int               `json:"totalFiles"`
	TotalDirs        int               `json:"totalDirs"`
	TotalSize        int64             `json:"totalSize"`
	Issues           []FileIssue       `json:"issues"`
	Categories       []CategorySummary `json:"categories"`
	ScannedAt        string            `json:"scannedAt"`
	ScanDurationMs   int64             `json:"scanDurationMs"`
	CleanableSize    int64             `json:"cleanableSize"`
	CleanableCount   int               `json:"cleanableCount"`
}

var buildArtifactDirs = []string{
	"node_modules",
	"dist",
	"build",
	"target",
	"__pycache__",
	".next",
	"out",
	".output",
	".nuxt",
	".svelte-kit",
	".angular",
	".expo",
	"vendor",
	".gradle",
	".idea",
	".vscode",
}

var cacheDirs = []string{
	".cache",
	".parcel-cache",
	".turbo",
	".sass-cache",
	".webpack",
}

var cacheFiles = []string{
	".eslintcache",
	".tsbuildinfo",
	".stylelintcache",
	".prettiercache",
}

var logPatterns = []string{
	".log",
}

var logFiles = []string{
	"npm-debug.log",
	"yarn-error.log",
	"yarn-debug.log",
	"lerna-debug.log",
	"pnpm-debug.log",
}

var osJunkFiles = []string{
	".DS_Store",
	"Thumbs.db",
	"desktop.ini",
	"ehthumbs.db",
	"ehthumbs_vista.db",
}

var tempExtensions = []string{
	".tmp",
	".bak",
	".swp",
	".swo",
	".orig",
}

const largeSizeThreshold int64 = 10 * 1024 * 1024

var categoryLabels = map[string]string{
	"build_artifact": "Build Artifacts",
	"cache":          "Cache Files",
	"log":            "Log Files",
	"os_junk":        "OS Junk Files",
	"large_file":     "Large Files",
	"temp_file":      "Temporary Files",
}

var categoryDescriptions = map[string]string{
	"build_artifact": "Generated build output and dependency directories",
	"cache":          "Cached data from build tools and linters",
	"log":            "Log files from package managers and build tools",
	"os_junk":        "Operating system generated metadata files",
	"large_file":     "Files larger than 10 MB",
	"temp_file":      "Temporary, backup, and swap files",
}

func ScanProject(dirPath string) (ScanResult, error) {
	start := time.Now()

	result := ScanResult{
		ProjectPath: dirPath,
		ProjectName: filepath.Base(dirPath),
		Issues:      []FileIssue{},
		Categories:  []CategorySummary{},
	}

	skipDirs := map[string]bool{}
	categoryCounts := map[string]int{}
	categorySizes := map[string]int64{}

	err := filepath.WalkDir(dirPath, func(path string, d os.DirEntry, err error) error {
		if err != nil {
			return nil
		}

		relPath, _ := filepath.Rel(dirPath, path)
		name := d.Name()

		if d.IsDir() {
			if name == ".git" {
				return filepath.SkipDir
			}

			if shouldSkipAsChild(path, skipDirs) {
				return nil
			}

			result.TotalDirs++

			if matchesList(name, buildArtifactDirs) {
				dirSize := calcDirSize(path)
				issue := FileIssue{
					Path:        path,
					RelPath:     relPath,
					Size:        dirSize,
					Category:    "build_artifact",
					Description: name + " directory",
				}
				result.Issues = append(result.Issues, issue)
				categoryCounts["build_artifact"]++
				categorySizes["build_artifact"] += dirSize
				result.CleanableSize += dirSize
				result.CleanableCount++
				skipDirs[path] = true
				return filepath.SkipDir
			}

			if matchesList(name, cacheDirs) {
				dirSize := calcDirSize(path)
				issue := FileIssue{
					Path:        path,
					RelPath:     relPath,
					Size:        dirSize,
					Category:    "cache",
					Description: name + " directory",
				}
				result.Issues = append(result.Issues, issue)
				categoryCounts["cache"]++
				categorySizes["cache"] += dirSize
				result.CleanableSize += dirSize
				result.CleanableCount++
				skipDirs[path] = true
				return filepath.SkipDir
			}

			return nil
		}

		if shouldSkipAsChild(path, skipDirs) {
			return nil
		}

		info, infoErr := d.Info()
		if infoErr != nil {
			return nil
		}

		fileSize := info.Size()
		result.TotalFiles++
		result.TotalSize += fileSize

		if matchesList(name, cacheFiles) {
			issue := FileIssue{
				Path:        path,
				RelPath:     relPath,
				Size:        fileSize,
				Category:    "cache",
				Description: name,
			}
			result.Issues = append(result.Issues, issue)
			categoryCounts["cache"]++
			categorySizes["cache"] += fileSize
			result.CleanableSize += fileSize
			result.CleanableCount++
			return nil
		}

		if matchesList(name, osJunkFiles) {
			issue := FileIssue{
				Path:        path,
				RelPath:     relPath,
				Size:        fileSize,
				Category:    "os_junk",
				Description: name,
			}
			result.Issues = append(result.Issues, issue)
			categoryCounts["os_junk"]++
			categorySizes["os_junk"] += fileSize
			result.CleanableSize += fileSize
			result.CleanableCount++
			return nil
		}

		if isLogFile(name) {
			issue := FileIssue{
				Path:        path,
				RelPath:     relPath,
				Size:        fileSize,
				Category:    "log",
				Description: name,
			}
			result.Issues = append(result.Issues, issue)
			categoryCounts["log"]++
			categorySizes["log"] += fileSize
			result.CleanableSize += fileSize
			result.CleanableCount++
			return nil
		}

		if isTempFile(name) {
			issue := FileIssue{
				Path:        path,
				RelPath:     relPath,
				Size:        fileSize,
				Category:    "temp_file",
				Description: name,
			}
			result.Issues = append(result.Issues, issue)
			categoryCounts["temp_file"]++
			categorySizes["temp_file"] += fileSize
			result.CleanableSize += fileSize
			result.CleanableCount++
			return nil
		}

		if fileSize > largeSizeThreshold {
			issue := FileIssue{
				Path:        path,
				RelPath:     relPath,
				Size:        fileSize,
				Category:    "large_file",
				Description: formatSize(fileSize) + " file",
			}
			result.Issues = append(result.Issues, issue)
			categoryCounts["large_file"]++
			categorySizes["large_file"] += fileSize
			return nil
		}

		return nil
	})

	if err != nil {
		return result, err
	}

	allCategories := []string{"build_artifact", "cache", "log", "os_junk", "large_file", "temp_file"}
	for _, cat := range allCategories {
		count := categoryCounts[cat]
		if count > 0 {
			result.Categories = append(result.Categories, CategorySummary{
				Category:    cat,
				Label:       categoryLabels[cat],
				FileCount:   count,
				TotalSize:   categorySizes[cat],
				Description: categoryDescriptions[cat],
			})
		}
	}

	result.ScannedAt = time.Now().Format(time.RFC3339)
	result.ScanDurationMs = time.Since(start).Milliseconds()

	return result, nil
}

func matchesList(name string, list []string) bool {
	lower := strings.ToLower(name)
	for _, item := range list {
		if lower == strings.ToLower(item) {
			return true
		}
	}
	return false
}

func isLogFile(name string) bool {
	lower := strings.ToLower(name)
	for _, f := range logFiles {
		if strings.HasPrefix(lower, strings.ToLower(f)) {
			return true
		}
	}
	for _, ext := range logPatterns {
		if strings.HasSuffix(lower, ext) {
			return true
		}
	}
	return false
}

func isTempFile(name string) bool {
	lower := strings.ToLower(name)
	if strings.HasSuffix(lower, "~") {
		return true
	}
	for _, ext := range tempExtensions {
		if strings.HasSuffix(lower, ext) {
			return true
		}
	}
	return false
}

func shouldSkipAsChild(path string, skipDirs map[string]bool) bool {
	for dir := range skipDirs {
		if strings.HasPrefix(path, dir+string(filepath.Separator)) {
			return true
		}
	}
	return false
}

func calcDirSize(path string) int64 {
	var size int64
	filepath.WalkDir(path, func(_ string, d os.DirEntry, err error) error {
		if err != nil {
			return nil
		}
		if !d.IsDir() {
			info, infoErr := d.Info()
			if infoErr == nil {
				size += info.Size()
			}
		}
		return nil
	})
	return size
}

func formatSize(bytes int64) string {
	const (
		kb = 1024
		mb = kb * 1024
		gb = mb * 1024
	)
	switch {
	case bytes >= gb:
		val := float64(bytes) / float64(gb)
		return strings.TrimRight(strings.TrimRight(
			strings.Replace(
				strings.Replace(
					formatFloat(val), ",", "", -1,
				), ".", ".", -1,
			), "0"), ".") + " GB"
	case bytes >= mb:
		val := float64(bytes) / float64(mb)
		return strings.TrimRight(strings.TrimRight(formatFloat(val), "0"), ".") + " MB"
	case bytes >= kb:
		val := float64(bytes) / float64(kb)
		return strings.TrimRight(strings.TrimRight(formatFloat(val), "0"), ".") + " KB"
	default:
		return formatInt(bytes) + " B"
	}
}

func formatFloat(f float64) string {
	return strings.TrimRight(strings.TrimRight(
		func() string {
			s := ""
			whole := int64(f)
			frac := int64((f - float64(whole)) * 100)
			if frac < 0 {
				frac = -frac
			}
			s = formatInt(whole)
			if frac > 0 {
				fracStr := formatInt(frac)
				if frac < 10 {
					fracStr = "0" + fracStr
				}
				s += "." + fracStr
			}
			return s
		}(),
		"0"), ".")
}

func formatInt(n int64) string {
	if n == 0 {
		return "0"
	}
	s := ""
	neg := false
	if n < 0 {
		neg = true
		n = -n
	}
	for n > 0 {
		s = string(rune('0'+n%10)) + s
		n /= 10
	}
	if neg {
		s = "-" + s
	}
	return s
}
