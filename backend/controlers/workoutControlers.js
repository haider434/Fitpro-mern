const workoutModel = require('../models/workoutModel')
const mongoose = require('mongoose');


// Getting all the workouts

const getWorkouts = async (req, res) => {
    const user_id = req.user._id
    const workout = await workoutModel.find({user_id}).sort({createdAt: -1});
    res.status(200).json(workout)
}


// Get a single workout

const getSingleWorkout = async (req, res) => {
    const { id } = req.params;
if (!mongoose.Types.ObjectId.isValid(id)) {
   return res.status(404).json({ msg: 'No such workout' });
}
    try {
        const workout = await workoutModel.findById(id);
        
        if (!workout) {
            return res.status(404).json({ msg: 'Workout not found for the provided ID' });
        }

        res.status(200).json(workout);
    } catch (error) {
        console.error("Error retrieving workout:", error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};


// Post a workout

const createWorkout = async (req, res) => {
    const {title,load,reps} = req.body;
let emptyField =[];
if (!title) {
    emptyField.push('title');
}
if (!load) {
    emptyField.push('load')
}
if (!reps) {
    emptyField.push('reps')
}
if (emptyField > 0) {
    res.status(400).json({error : 'Please fill in all the fields', emptyField})
}

    // workout to db

    try {
        const user_id = req.user._id;
        const work = await workoutModel.create({title,load,reps, user_id});
        res.status(200).json(work)
    } catch (error) {
        res.status(400).json({error : error.message})
    }  
}


// Delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: 'No such workout' });
     }
     const workout = await workoutModel.findByIdAndDelete({_id: id});
     if (!workout) {
        return res.status(404).json({ msg: 'Workout not found for the provided ID' });
    }
    res.status(200).json(workout);
}

// Update a workout

const updateWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: 'No such workout' });
     }
     const workout = await workoutModel.findByIdAndUpdate({_id: id}, {
         ...req.body
     })
     res.status(200).json(workout);

}



module.exports= {createWorkout,getWorkouts,getSingleWorkout,deleteWorkout,updateWorkout}