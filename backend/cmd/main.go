package cmd

import (
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func StartServer() {
	router := gin.Default()
	router.Use(cors.Default())

	// Handle API route
	router.POST("/api/create-offers", MockupRouter)

	// Check if the STATIC_DIR environment variable is set
	staticDir := os.Getenv("STATIC_DIR")
	if staticDir != "" {
		router.Static("/assets", staticDir)

		router.GET("/", func(ctx *gin.Context) {
			ctx.File(staticDir + "/index.html")
		})

		router.NoRoute(func(ctx *gin.Context) {
			if ctx.Request.Method == "GET" && !ctx.IsWebsocket() {
				ctx.File(staticDir + "/index.html")
			} else {
				ctx.Status(http.StatusNotFound)
			}
		})
	} else {
		router.GET("/", func(ctx *gin.Context) {
			ctx.JSON(http.StatusOK, gin.H{"message": "API is running"})
		})
	}

	// Start the server
	router.Run("0.0.0.0:3005")
}
