const ANIAPI = require("@mattplays/aniapi");
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const API = new ANIAPI.API("DUMMY_JWT");

exports.getAnime = asyncHandler(async (req,res,next) => {
    const animes = await API.Anime.Get({
        per_page : 20
    })
    console.log(req.cookies.token)
    res.status(200).json({ success : true , data : animes})
})