const ANIAPI = require("@mattplays/aniapi");
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const API = new ANIAPI.API(process.env.JWT_TOKEN);
const Review = require('../models/Review')

// @desc      Add a review
// @route     POST /api/v1/anime/:id
// @access    Private
exports.addReview = asyncHandler(async (req,res,next) => {
    let id = req.params.id

    const anime = await API.Anime.GetByID(id)

    if(!anime){
        return next(new ErrorResponse(`Anime with given ${id} not found`,400))
    }

    req.body.user = req.user.id;
    req.body.anime = id

    const review = await Review.create(req.body);

    res.status(201).json({
        success: true,
        data: review,
        anime : anime
    });
})

// @desc      GET one anime
// @route     GET /api/v1/anime/:id
// @access    Private
exports.getOne = asyncHandler(async (req,res,next) => {
    let id = req.params.id
    const anime = await API.Anime.GetByID(id)

    if(!anime){
        return next(new ErrorResponse(`Anime with given ${id} not found`,400))
    }

    const reviews = await Review.find({anime : id});

    res.status(200).json({ success : true , data : anime , reviews : reviews})
})

// @desc      GET anime by title
// @route     GET /api/v1/anime/title
// @access    Private
exports.getAnimeByTitle = asyncHandler(async (req,res,next) => {
    const animes = await API.Anime.Get({
        title : req.query.title,
        per_page : 20
    })
    res.status(200).json({ success : true , data : animes})
})

// @desc      GET anime and by genre
// @route     GET /api/v1/anime
// @access    Private
exports.getAnime = asyncHandler(async (req,res,next) => {
    let animes
    if(!req.query.genres){
        animes = await API.Anime.Get({
            per_page : 20
        })
    }else{
        animes = await API.Anime.Get({
        genres : req.query.genres,
        per_page : 20
    })
    }
    
    res.status(200).json({ success : true , data : animes})
})