const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')

//Load env vars
dotenv.config({ path : './config/config.env'})

//connect db
const connectDB = require('./config/db')
connectDB()

const app = express()

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

const PORT = process.env.PORT || 8000

const server = app.listen(PORT,console.log(`Server is listening on ${PORT}`))