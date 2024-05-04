package masker

import (
	"errors"
	"os"
	"path/filepath"
)

var RenderImages = map[string]string{
	"bufo-back":  "bufo-back.png",
	"bufo-front": "bufo-front.png",
}

var FontFaces = map[string]string{
	"authentic": "AUTHENTICSans-130.ttf",
}

func GetMaskImagePaths() (string, string, error) {
	front := RenderImages["bufo-front"]
	back := RenderImages["bufo-back"]
	baseDir := GetAssetFolder()
	if baseDir == "" {
		return "", "", errors.New("we could not resolve your asset folder")
	}
	return filepath.Join(baseDir, front), filepath.Join(baseDir, back), nil
}

func GetFontPath() string {
	// one day i will offer more!
	return filepath.Join(GetAssetFolder(), FontFaces["authentic"])
}

func GetImageOffset(imageToMask string) (float64, float64) {
	switch imageToMask {
	case "offer":
		return 7, 40
	}
	return 0, 0
}

func GetAssetFolder() string {
	home, err := os.UserHomeDir()
	if err != nil {
		return ""
	}

	// handle finding the files
	finalPath := filepath.Join(home, "projects", "bufo-offers-gen", "backend", "assets")
	pathToAssets := os.Getenv("MASK_ASSETS")
	if pathToAssets == "" {
		pathToAssets = finalPath

	}
	return finalPath
}
