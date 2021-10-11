const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')

//Load env vars
dotenv.config({ path : './config/config.env'})

//connect Database
const connectDB = require('./config/db')
connectDB()

//Route files
const auth = require('./routes/auth')

const app = express()

//Body Parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

//Mount routers
app.use('/api/v1/auth', auth)

const PORT = process.env.PORT || 8000

const server = app.listen(PORT,console.log(`Server is listening on ${PORT}`))