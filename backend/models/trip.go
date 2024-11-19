package models

import "time"

type Trip struct {
    ID            int       `db:"id"`
    PickupTime    time.Time `db:"pickup_time"`
    DropoffTime   time.Time `db:"dropoff_time"`
    PickupLat     float64   `db:"pickup_lat"`
    PickupLong    float64   `db:"pickup_long"`
    DropoffLat    float64   `db:"dropoff_lat"`
    DropoffLong   float64   `db:"dropoff_long"`
    FareAmount    float64   `db:"fare_amount"`
    TripDistance  float64   `db:"trip_distance"`
    PaymentType   string    `db:"payment_type"`
}
