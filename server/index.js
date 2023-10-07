// env
require('dotenv').config()

// Basic imports
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

// Importing models
const User = require('./models/User')
const Post = require('./models/Post')

// Importing routes
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')

// Cors
app.use(cors({
    credentials: true,
    origin: 'https://blogify-bishal.vercel.app'
}))

// Middleware configuration
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

// PORT from .env file
const PORT = process.env.PORT || 8080

// Database connection
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}

// routes
app.use('/api/post', postRoutes)
app.use('/api', userRoutes)


app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}!`)
})