package routes

import (
	"yellow-taxi-dashboard/controllers"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
    api := app.Group("/api")
    api.Get("/trips", controllers.GetTrips)
}
