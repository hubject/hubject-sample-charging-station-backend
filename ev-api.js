const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Dummy data for charging stations and reviews
let chargingStations = [
  { id: 1, name: 'Charging Station 1', address: 'Address 1', connectors: ['Type 1', 'Type 2'], price: 5.0 },
  { id: 2, name: 'Charging Station 2', address: 'Address 2', connectors: ['Type 2', 'Type 3'], price: 7.5 }
];

let reviews = [
  { id: 1, chargingStationId: 1, rating: 4, comment: 'Good charging station' },
  { id: 2, chargingStationId: 1, rating: 5, comment: 'Excellent service' }
];

// Endpoint to retrieve all charging stations
app.get('/api/charging-stations', (req, res) => {
  res.json(chargingStations);
});

// Endpoint to retrieve a specific charging station by ID
app.get('/api/charging-stations/:id', (req, res) => {
  const stationId = parseInt(req.params.id);
  const station = chargingStations.find(station => station.id === stationId);

  if (station) {
    res.json(station);
  } else {
    res.status(404).json({ error: 'Charging station not found' });
  }
});

// Search charging stations
app.post('/api/charging-stations/search', (req, res) => {
  const { location, criteria } = req.body;

  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }
  
  // Perform search logic based on location and criteria
  const results = chargingStations.filter((station) => {
    return (
      station.address.toLowerCase().includes(location.toLowerCase()) &&
      station.connectors.includes(criteria)
    );
  });
  res.json(results);
});


// Endpoint to retrieve reviews for a specific charging station
app.get('/api/charging-stations/:id/reviews', (req, res) => {
  const stationId = parseInt(req.params.id);
  const stationReviews = reviews.filter(review => review.chargingStationId === stationId);

  if (stationReviews.length > 0) {
    res.json(stationReviews);
  } else {
    res.status(404).json({ error: 'No reviews found for the charging station' });
  }
});

// Endpoint to add a new review for a charging station
app.post('/api/charging-stations/:id/reviews', (req, res) => {
  const stationId = parseInt(req.params.id);
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    res.status(400).json({ error: 'Rating and comment are required' });
    return;
  }

  const newReview = {
    id: reviews.length + 1,
    chargingStationId: stationId,
    rating: rating,
    comment: comment
  };

  reviews.push(newReview);
  res.status(201).json(newReview);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
