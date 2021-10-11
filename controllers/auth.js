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

    res.status(200).json({data : user})
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

    res.status(200).json({message: 'logged in successfully'})
})