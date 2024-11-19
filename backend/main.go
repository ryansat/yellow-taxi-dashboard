package main

import (
	"yellow-taxi-dashboard/config"
	"yellow-taxi-dashboard/routes"

	"github.com/gofiber/fiber/v2"
)

func main() {
    app := fiber.New()

    config.ConnectDB()
    routes.SetupRoutes(app)

    app.Listen(":3000")
}
