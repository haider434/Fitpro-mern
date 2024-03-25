const User = require('../models/User');
const jwt = require('jsonwebtoken')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const createToken = (_id)=>{
 return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}
// login user

 const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    try {

        if (!email || !password) {
            throw Error('All fields must be filled')
        }
        if (!validator.isEmail(email)) {
            throw Error('Email is not valid')
        }
        const user = await User.findOne({email});
        if (!user) {
            throw Error('User not found Please sign up first to login ')
        }
            const match  = await bcrypt.compare(password, user.password)
            if (!match) {
                throw Error('Incorrect Password')
        }
        const token = createToken(user._id, process.env.SECRET)
        res.status(200).json({ message: 'Login successful', email, token }); // Modified response
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  
}

// for signing up user

 const signupUser = async (req, res) => {
    const { email, password } = req.body; // Destructure email and password from req.body
    try {
        // Check if email and password exist in req.body
        if (!email || !password) {
            throw new Error('All fields must be filled');
        }

        // Check if email is valid
        if (!validator.isEmail(email)) {
            throw new Error('Email is not valid');
        }

        // Check if user already exists
        const exists = await User.findOne({ email });
        if (exists) {
            throw new Error('User already exists');
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user
        const user = await User.create({ email, password: hashedPassword });

        // Generate token
        const token = createToken(user._id, process.env.SECRET);

        // Send response
        res.status(200).json({ email, token });
    } catch (error) {
        // Handle errors
        res.status(400).json({ error: error.message });
    }
}
module.exports = {loginUser,signupUser}