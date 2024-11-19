package services

import (
	"log"
	"yellow-taxi-dashboard/config"
	"yellow-taxi-dashboard/models"
)

func GetTripsByFilter(timeRange string, minFare, maxFare, minDistance, maxDistance float64) ([]models.Trip, error) {
    var trips []models.Trip
    query := `SELECT * FROM trips WHERE pickup_time BETWEEN $1 AND $2 AND fare_amount BETWEEN $3 AND $4 AND trip_distance BETWEEN $5 AND $6`
    
    err := config.DB.Select(&trips, query, timeRange, minFare, maxFare, minDistance, maxDistance)
    if err != nil {
        log.Println("Error fetching trips:", err)
        return nil, err
    }
    return trips, nil
}
