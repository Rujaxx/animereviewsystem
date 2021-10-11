const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
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

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(errorHandler);

//Mount routers
app.use('/api/v1/auth', auth)
app.use('/api/v1/anime', anime)

const PORT = process.env.PORT || 8000

const server = app.listen(PORT,console.log(`Server is listening on ${PORT}`))