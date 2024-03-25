const express = require('express');
const router = express.Router();
const {
    createWorkout,
    getWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controlers/workoutControlers'); // Corrected spelling of 'controllers'
const requireAuth = require('../midlewares/requireAuth');

// Middleware to require authentication for all routes
router.use(requireAuth);

// TO get all the workouts
router.get('/', getWorkouts);

// To post a Route
router.post('/', createWorkout);

// to get specific workout
router.get('/:id', getSingleWorkout);

// To delete a workout
router.delete('/:id', deleteWorkout);

// TO update any workout
router.patch('/:id', updateWorkout);

module.exports = router;
