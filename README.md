# Hubject sample charging station backend

The Sample Electric Car Charging Station backend API provides endpoints to retrieve charging station data and manage review.

# This is a test project

Follow the instructions below to install and run the backend API:

# Installation

Clone the repository:

```
git clone https://github.com/hubject/hubject-sample-charging-station-backend
```

Navigate to the project directory:

```
cd hubject-sample-charging-station-backend
```

Install the dependencies:

```
npm install
```

# Running the API

Start the API server:

```
npm start
```

The API server will start running on the configured port (default is 3000).

Open http://localhost:3000/api/charging-stations to test that the server has started

## API Endpoints

### Get all charging stations

* Endpoint: GET /api/charging-stations

* Description: Retrieve all charging stations.

* Response format: JSON

* Response body example:

```
[
    {
        "id": 1,
        "name": "Charging Station 1",
        "address": "Address 1",
        "connectors": ["Type 1", "Type 2"],
        "price": 5.0
    },
    {
        "id": 2,
        "name": "Charging Station 2",
        "address": "Address 2",
        "connectors": ["Type 2", "Type 3"],
        "price": 7.5
    }
]
```

### Search charging stations

* Endpoint: POST /api/charging-stations/search

* Description: Search for charging stations based on location or criteria.

* Request body format: JSON

* Request body example:
```
{
    "location": "New York",
    "criteria": "fast"
}
```
* Response format: JSON

* Response body example:
```
[
    {
    "id": 1,
    "name": "Fast Charging Station",
    "address": "123 Main Street, New York",
    "connectors": ["Type 2", "CHAdeMO"],
    "price": 7.0
    }
]
```
### Get a specific charging station

* Endpoint: GET /api/charging-stations/:id

* Description: Retrieve a specific charging station by ID.
* Parameters:
  * id: The ID of the charging station.
* Response format: JSON

Response body example:
```
{
    "id": 1,
    "name": "Charging Station 1",
    "address": "Address 1",
    "connectors": ["Type 1", "Type 2"],
    "price": 5.0
}
```
### Get reviews for a charging station

* Endpoint: GET /api/charging-stations/:id/reviews

* Description: Retrieve reviews for a specific charging station.

* Parameters:

  * id: The ID of the charging station.

* Response format: JSON

* Response body example:
```
[
    {
        "id": 1,
        "chargingStationId": 1,
        "rating": 4,
        "comment": "Good charging station"
    },
    {
        "id": 2,
        "chargingStationId": 1,
        "rating": 5,
        "comment": "Excellent service"
    }
]
```
### Add a review for a charging station

* Endpoint: POST /api/charging-stations/:id/reviews

* Description: Add a new review for a charging station.

* Parameters:

    * id: The ID of the charging station.

* Request body format: JSON

* Request body example:
```
{
    "rating": 4,
    "comment": "Good charging experience"
}
```
* Response format: JSON

* Response body example:
```
{
    "id": 3,
    "chargingStationId": 1,
    "rating": 4,
    "comment": "Good chargingexperience"
}
```
