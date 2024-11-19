package controllers

import (
	"strconv"
	"yellow-taxi-dashboard/services"

	"github.com/gofiber/fiber/v2"
)

func GetTrips(c *fiber.Ctx) error {
    timeRange := c.Query("time")
    minFare, _ := strconv.ParseFloat(c.Query("minFare", "0"), 64)
    maxFare, _ := strconv.ParseFloat(c.Query("maxFare", "100"), 64)
    minDistance, _ := strconv.ParseFloat(c.Query("minDistance", "0"), 64)
    maxDistance, _ := strconv.ParseFloat(c.Query("maxDistance", "20"), 64)

    trips, err := services.GetTripsByFilter(timeRange, minFare, maxFare, minDistance, maxDistance)
    if err != nil {
        return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Could not get trips"})
    }
    return c.JSON(trips)
}
