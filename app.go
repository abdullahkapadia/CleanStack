package main

import (
	"context"
	"errors"
	"fmt"
	"os"
	"path/filepath"

	"ai-project-cleaner/internal/history"
	"ai-project-cleaner/internal/scanner"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type App struct {
	ctx context.Context
}

func NewApp() *App {
	return &App{}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) SelectProject() (map[string]string, error) {
	dir, err := runtime.OpenDirectoryDialog(a.ctx, runtime.OpenDialogOptions{
		Title: "Select Project Directory",
	})
	if err != nil {
		return nil, err
	}

	if dir == "" {
		return nil, nil
	}

	name := filepath.Base(dir)

	result := map[string]string{
		"name": name,
		"path": dir,
	}

	return result, nil
}

func (a *App) ScanProject(projectPath string) (scanner.ScanResult, error) {
	if projectPath == "" {
		return scanner.ScanResult{}, errors.New("no project path provided")
	}

	result, err := scanner.ScanProject(projectPath)
	if err == nil {
		history.SaveAction(history.ActionHistory{
			ActionType:  "scan",
			ProjectName: result.ProjectName,
			ProjectPath: result.ProjectPath,
			Details:     fmt.Sprintf("Found %d issues (%s)", result.CleanableCount, formatSizeForHistory(result.CleanableSize)),
		})
	}
	return result, err
}

func (a *App) CleanFiles(projectName string, projectPath string, paths []string) (int64, error) {
	var totalFreed int64
	var deletedCount int

	for _, p := range paths {
		info, err := os.Stat(p)
		if err != nil {
			continue // Skip if file/dir doesn't exist or can't be stat
		}

		size := info.Size()
		if info.IsDir() {
			size = calcDirSizeForCleanup(p)
		}

		err = os.RemoveAll(p)
		if err == nil {
			totalFreed += size
			deletedCount++
		}
	}

	if deletedCount > 0 {
		history.SaveAction(history.ActionHistory{
			ActionType:  "cleanup",
			ProjectName: projectName,
			ProjectPath: projectPath,
			Details:     fmt.Sprintf("Cleaned %d items (freed %s)", deletedCount, formatSizeForHistory(totalFreed)),
		})
	}

	return totalFreed, nil
}

func (a *App) GetHistory() ([]history.ActionHistory, error) {
	return history.GetHistory()
}

func (a *App) GetAIInsights(result scanner.ScanResult) string {
	if result.CleanableCount == 0 {
		return "Great job! Your project is clean and healthy. No actionable items found."
	}

	insights := []string{}
	
	for _, cat := range result.Categories {
		if cat.Category == "build_artifact" && cat.TotalSize > 100*1024*1024 { // >100MB
			insights = append(insights, "You have a large amount of build artifacts. Ensure your package manager (like npm or yarn) is running optimally, and verify that these directories are added to your `.gitignore` so they aren't accidentally tracked in version control.")
		}
		if cat.Category == "large_file" && cat.FileCount > 0 {
			insights = append(insights, "I detected very large files (>10MB). If these are media assets, consider moving them to a CDN. If they must be in the repository, you should configure Git LFS (Large File Storage) to prevent your git history from bloating.")
		}
		if cat.Category == "os_junk" && cat.FileCount > 0 {
			insights = append(insights, "OS-generated metadata files (like .DS_Store) were found. These are generally harmless but can clutter your project. Consider adding them to a global `~/.gitignore_global` file.")
		}
	}

	if len(insights) == 0 {
		return "Your project has some standard clutter. Removing the detected issues will safely free up space without affecting your project's functionality."
	}

	return "Here are my smart recommendations based on the scan:\n\n- " + stringsJoin(insights, "\n- ")
}

// Helper functions for app.go
func calcDirSizeForCleanup(path string) int64 {
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

func formatSizeForHistory(bytes int64) string {
	const mb = 1024 * 1024
	if bytes >= mb {
		return fmt.Sprintf("%.2f MB", float64(bytes)/float64(mb))
	}
	const kb = 1024
	if bytes >= kb {
		return fmt.Sprintf("%.2f KB", float64(bytes)/float64(kb))
	}
	return fmt.Sprintf("%d B", bytes)
}

func stringsJoin(elems []string, sep string) string {
	if len(elems) == 0 {
		return ""
	}
	if len(elems) == 1 {
		return elems[0]
	}
	result := elems[0]
	for i := 1; i < len(elems); i++ {
		result += sep + elems[i]
	}
	return result
}
