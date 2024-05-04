package masker

import (
	"bytes"
	"fmt"
	"image"
	"image/png"
	"mime/multipart"

	"github.com/disintegration/imaging"
	"github.com/fogleman/gg"
)

func AddOfferToMask(file multipart.File) ([]byte, error) {
	front, back, err := GetMaskImagePaths()
	if err != nil {
		return nil, fmt.Errorf("failed to find an image: %s", err.Error())
	}
	backgroundImage, err := imaging.Open(back)
	if err != nil {
		return nil, fmt.Errorf("failed to open an image: %s", back)
	}
	foregroundImage, err := imaging.Open(front)
	if err != nil {
		return nil, fmt.Errorf("failed to open an image: %s", front)
	}

	// Decode the uploaded file
	uploadedImage, _, err := image.Decode(file)
	if err != nil {
		return nil, fmt.Errorf("failed to decode uploaded image: %s", err.Error())
	}

	// Resize the uploaded image
	targetWidth := 75 // Set your desired width
	resizedImage := imaging.Resize(uploadedImage, targetWidth, 0, imaging.Lanczos)
	// place the upload
	offsetX, offsetY := GetImageOffset("offer")
	position := image.Pt(int(offsetX), int(offsetY))
	dc := gg.NewContextForImage(backgroundImage)
	dc.DrawImage(resizedImage, position.X, position.Y)
	resultImage := imaging.Overlay(dc.Image(), foregroundImage, image.Pt(57, 77), 1.0)

	buf := new(bytes.Buffer)
	err = png.Encode(buf, resultImage)
	if err != nil {
		return nil, fmt.Errorf("failed to encode image: %s", err.Error())
	}
	return buf.Bytes(), nil
}
