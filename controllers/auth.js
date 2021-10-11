const User = require('../models/User')
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')


// @desc      Register a user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req,res,next) => {
    const {
        username,
        email,
        password,
    } = req.body;

    //Create a user
    const user = await User.create({
        username,
        email,
        password
    })

    sendTokenResponse(user, 200, res);
})

// @desc      Login a user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req,res,next) => {
    const { email, password } = req.body

    //Validate email and password
    if( !email || !password){
        return next(new ErrorResponse('Please provide an email and password', 400));
    }

    //Check user
    const user = await User.findOne({email}).select('+password')

    if(!user){
        return next(new ErrorResponse('Invalid Credentials', 400));
    }

    //Check if password matches
    const isMatch = await user.matchPassword(password);

    if(!isMatch){
        return next(new ErrorResponse('Invalid Credentials', 400));
    }

    sendTokenResponse(user, 200, res);
})


// @desc      Log user out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Private
exports.logout = asyncHandler(async (req,res,next) => {
    res.cookie('token','none', {
        expires : new Date(Date.now() + 10 * 1000),
        httpOnly : true
    })

    res.status(200).json({
        success : true,
        data : {}
    })
})

const sendTokenResponse = (user, statusCode, res) => {
    //create token
    const token = user.getSignedJwtToken()

    const options = {
        expires : new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token
    });
}