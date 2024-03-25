const express = require('express');
const router = express.Router();
const User = require('../models/User')
const {loginUser, signupUser} = require('../controlers/userController');
// Login user
router.post('/login',loginUser)
router.get('/login', async (req, res) => {
    try {
        const users = await User.find({}); // Use await to wait for the query to finish
        res.json(users); // Send the array of users as JSON response
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" }); // Send a 500 error response in case of any error
    }
});

//signUp Route 
router.post('/signup',signupUser)
module.exports =router;