package main

import (
	"context"
	"path/filepath"

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
