require('dotenv').config()
const WorkoutRoutes = require('./routes/workoutRoutes')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const LoginRoutes = require('./routes/userRoutes')
// express app
const app = express()

//APp cors

app.use(cors());

// Connect to  database 

mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    const port = process.env.PORT || 4000 ;
    app.listen(port, () => {
  console.log('Connected to db & listening on port', port)
})
})
.catch((err)=>{
    console.log(err);
console.log( 'Some Error accured while connecting to database')
})



// middleware
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes for crud opeartioon
app.use('/api/workouts', WorkoutRoutes)

// routes for login and signupUser
app.use('/api/user', LoginRoutes)

