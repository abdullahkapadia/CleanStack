package history

import (
	"encoding/json"
	"os"
	"path/filepath"
	"sync"
	"time"
)

type ActionHistory struct {
	ID          string `json:"id"`
	ActionType  string `json:"actionType"` // "scan" or "cleanup"
	ProjectName string `json:"projectName"`
	ProjectPath string `json:"projectPath"`
	Details     string `json:"details"`
	Timestamp   string `json:"timestamp"`
}

var (
	historyFile string
	mu          sync.Mutex
)

func init() {
	homeDir, err := os.UserConfigDir()
	if err != nil {
		homeDir = "."
	}
	appDir := filepath.Join(homeDir, "ai-project-cleaner")
	os.MkdirAll(appDir, 0755)
	historyFile = filepath.Join(appDir, "history.json")
}

func GetHistory() ([]ActionHistory, error) {
	mu.Lock()
	defer mu.Unlock()

	data, err := os.ReadFile(historyFile)
	if err != nil {
		if os.IsNotExist(err) {
			return []ActionHistory{}, nil
		}
		return nil, err
	}

	var history []ActionHistory
	if err := json.Unmarshal(data, &history); err != nil {
		return nil, err
	}

	return history, nil
}

func SaveAction(action ActionHistory) error {
	mu.Lock()
	defer mu.Unlock()

	history, err := loadHistoryUnlocked()
	if err != nil {
		return err
	}

	if action.Timestamp == "" {
		action.Timestamp = time.Now().Format(time.RFC3339)
	}
	if action.ID == "" {
		action.ID = time.Now().Format("20060102150405")
	}

	// Prepend new action
	history = append([]ActionHistory{action}, history...)

	// Keep only last 50 actions to prevent infinite growth
	if len(history) > 50 {
		history = history[:50]
	}

	data, err := json.MarshalIndent(history, "", "  ")
	if err != nil {
		return err
	}

	return os.WriteFile(historyFile, data, 0644)
}

func loadHistoryUnlocked() ([]ActionHistory, error) {
	data, err := os.ReadFile(historyFile)
	if err != nil {
		if os.IsNotExist(err) {
			return []ActionHistory{}, nil
		}
		return nil, err
	}

	var history []ActionHistory
	if err := json.Unmarshal(data, &history); err != nil {
		return nil, err
	}
	return history, nil
}
