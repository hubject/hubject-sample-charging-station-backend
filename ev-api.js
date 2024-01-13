const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuid } = require('uuid');

app.use(bodyParser.json());

app.use(cors());

// Dummy data for charging stations and reviews
let chargingStations = [
    {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Charging Station Boylston St',
        address: '955 Boylston St, Boston, MA 02115',
        connectors: ['Type 1', 'Type 2'],
        price: 5.0,
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440001',
        name: 'Charging Station Tremont St',
        address: '139 Tremont St, Boston, MA 021115',
        connectors: ['Type 2', 'Type 3'],
        price: 7.5,
    },
    {
        id: '550e8400-e29b-41d4-a716-446655444000',
        name: 'Charging Station Newbury St',
        address: '304 Newbury St #287, Boston, MA 02115',
        connectors: ['Type 2', 'Type 3'],
        price: 7.5,
    },
    {
        id: '550e8400-e29b-41d4-a716-146655440000',
        name: 'Charging Station Charles St',
        address: '70 Charles St, Boston, MA 02114',
        connectors: ['Type 2', 'Type 3'],
        price: 7.5,
    },
];

let reviews = [
    {
        id: '550e2400-e29b-41d4-a716-146655440000',
        chargingStationId: '550e8400-e29b-41d4-a716-446655440000',
        rating: 4,
        comment: 'Good charging station',
    },
    {
        id: '550e8400-e29b-41d4-a711-146655440000',
        chargingStationId: '550e8400-e29b-41d4-a716-446655440000',
        rating: 5,
        comment: 'Excellent service',
    },
];

// Endpoint to retrieve all charging stations
app.get('/api/charging-stations', (req, res) => {
    res.json(chargingStations);
});

// Endpoint to retrieve a specific charging station by ID
app.get('/api/charging-stations/:id', (req, res) => {
    const stationId = req.params.id;
    const station = chargingStations.find(
        (station) => station.id === stationId
    );

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

// Create charging station
app.post('/api/charging-stations', (req, res) => {
    const { name, address, price, connectors } = req.body;

    if (!name || !address || !price || connectors.length === 0) {
        res.status(400).json({ error: 'All input fields are required' });
        return;
    }

    const newStation = {
        id: uuid(),
        name,
        address,
        price,
        connectors,
    };

    chargingStations.push(newStation);
    res.status(201).json(newStation);
});

// Edit charging station
app.put('/api/charging-stations/:id', (req, res) => {
    const stationId = req.params.id;
    const { name, address, price, connectors } = req.body;

    if (!name || !address || !price || connectors.length === 0) {
        res.status(400).json({ error: 'All input fields are required' });
        return;
    }

    const updatedStation = {
        name,
        address,
        price,
        connectors,
    };

    // Find the station index to be edited
    const stationIndex = chargingStations.findIndex(
        (station) => station.id === stationId
    );

    if (stationIndex !== -1) {
        chargingStations[stationIndex] = {
            id: chargingStations[stationIndex].id,
            ...updatedStation,
        };

        let editedStation = chargingStations[stationIndex];

        res.status(200).json(editedStation);
    } else {
        res.status(404).json({ error: 'Charging station not found' });
    }
});

// Endpoint to delete a charging station
app.delete('/api/charging-stations/:id', (req, res) => {
    const stationId = req.params.id;

    // Find the station index to be deleted
    const deletedStationIndex = chargingStations.findIndex(
        (stations) => stations.id === stationId
    );

    if (deletedStationIndex !== -1) {
        const deletedStation = chargingStations.splice(
            deletedStationIndex,
            1
        )[0];
        res.status(200).json(deletedStation);
    } else {
        res.status(404).json({ error: 'Station not found' });
    }
});

// Endpoint to retrieve reviews for a specific charging station
app.get('/api/charging-stations/:id/reviews', (req, res) => {
    const stationId = req.params.id;
    const stationReviews = reviews.filter(
        (review) => review.chargingStationId === stationId
    );

    if (stationReviews.length > 0) {
        res.json(stationReviews);
    } else {
        res.status(404).json({
            error: 'No reviews found for the charging station',
        });
    }
});

// Endpoint to add a new review for a charging station
app.post('/api/charging-stations/:id/reviews', (req, res) => {
    const stationId = req.params.id;
    const { rating, comment } = req.body;

    if (!rating || !comment) {
        res.status(400).json({ error: 'Rating and comment are required' });
        return;
    }

    const newReview = {
        id: uuid(),
        chargingStationId: stationId,
        rating: rating,
        comment: comment,
    };

    reviews.push(newReview);
    res.status(201).json(newReview);
});

// Endpoint to edit review for a charging station
app.put('/api/charging-stations/:id/reviews/:reviewId', (req, res) => {
    const reviewId = req.params.reviewId;
    const { rating, comment } = req.body;

    // Find the review index to be edited
    const reviewIndex = reviews.findIndex((review) => review.id === reviewId);

    if (reviewIndex !== -1) {
        reviews[reviewIndex].rating = rating;
        reviews[reviewIndex].comment = comment;

        const updatedReview = reviews[reviewIndex];

        res.status(200).json(updatedReview);
    } else {
        res.status(404).json({ error: 'Review not found' });
    }
});

// Endpoint to delete review for a charging station
app.delete('/api/charging-stations/:id/reviews/:reviewId', (req, res) => {
    const reviewId = req.params.reviewId;

    // Find the review index to be deleted
    const deletedReviewIndex = reviews.findIndex(
        (review) => review.id === reviewId
    );

    if (deletedReviewIndex !== -1) {
        const deletedReview = reviews.splice(deletedReviewIndex, 1)[0];
        res.status(200).json(deletedReview);
    } else {
        res.status(404).json({ error: 'Review not found' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
