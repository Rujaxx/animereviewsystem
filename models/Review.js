const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    text : {
        type : String,
        trim : true,
        required : [true,"Please add some text"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Please add a rating between 1 and 5']
    },
    createdAt: {
        type : String,
        default : Date.now
    },
    user: {
        type : mongoose.Schema.ObjectId,
        ref : 'User',
        required : true
    },
    anime :{
        type : String,
        required : true
    }

},{ timestamps : true})

module.exports = mongoose.model("Review",ReviewSchema)