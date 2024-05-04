package cmd

import (
	"mime/multipart"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hweeks/bufo-offers-gen/backend/internal/masker"
)

type ImageRequest struct {
	OfferedImg *multipart.FileHeader `form:"offered_img"`
}

func MockupRouter(c *gin.Context) {
	var req ImageRequest
	if err := c.ShouldBind(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Open the file
	file, err := req.OfferedImg.Open()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to open the file"})
		return
	}
	defer file.Close()

	// Process the image data
	imageData, err := masker.AddOfferToMask(file)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Return the processed image
	c.Data(http.StatusOK, "image/png", imageData)
}
