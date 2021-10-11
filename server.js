const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const errorHandler = require('./middleware/error');


//Load env vars
dotenv.config({ path : './config/config.env'})

//connect Database
const connectDB = require('./config/db')
connectDB()

//Route files
const auth = require('./routes/auth')
const anime = require('./routes/anime')

const app = express()

//Body Parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors)

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Sanitize Data
app.use(mongoSanitize())

//Set Security Headers
app.use(helmet())

//Prevent XSS 
app.use(xss())

//Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max : 100 
})
app.use(limiter)

// Prevent http param pollution
app.use(hpp())

// Enable CORS
app.use(cors())

//Error Handler
app.use(errorHandler);

//Mount routers
app.use('/api/v1/auth', auth)
app.use('/api/v1/anime', anime)

const PORT = process.env.PORT || 8000

const server = app.listen(PORT,console.log(`Server is listening on ${PORT}`))