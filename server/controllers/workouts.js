const express = require('express');
const model = require('../models/workouts');
const router = express.Router();

router
    .get('/', (req, res) => {
        const list = model.getWorkouts();
        res.send(list)
    })

    .get('/search/:q', (req, res) => {
        const term = req.params.q;
        console.log({ term });
        const list = model.searchWorkouts(term);
        res.send(list);
    })

    .get('/:id', (req, res) => {
        const id = req.params.id;
        const workout = model.getWorkoutById(id);
        res.send(workout);
    })
    .post('/', (req, res) => {
        const workout = req.body;

        console.log({ workout });
        console.log( req.query );
        console.log( req.params );
        console.log( req.headers );

        model.addWorkout(workout);
        res.send(workout);
    })

    .patch('/:id', (req, res) => {
        const workout = req.body;
        model.updateWorkout(workout);
        res.send(workout);
    })

    .delete('/:id', (req, res) => {
        const id = req.params.id; 
        model.deleteWorkout(id);
        res.send({ id: id });
    })

module.exports = router;
