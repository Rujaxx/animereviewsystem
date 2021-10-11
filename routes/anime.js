const express = require('express')

const { getAnime,addReview,getOne,getAnimeByTitle } = require('../controllers/anime')

const router = express.Router()

const { protect } = require('../middleware/auth')

router.route('/')
.get(protect,getAnime)

router.route('/title')
.get(protect,getAnimeByTitle)

router.route('/:id').post(protect,addReview).get(protect,getOne)

module.exports = router