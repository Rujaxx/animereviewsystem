const express = require('express')

const { getAnime } = require('../controllers/anime')

const router = express.Router()

const { protect } = require('../middleware/auth')

router.route('/').get(protect,getAnime)

module.exports = router