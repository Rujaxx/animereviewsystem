const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true,"Please add an username"],
        unique : true,
        trim : true
    },
    email : {
        type : String,
        required : [true,"Please add an email"],
        unique : true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
          ]
    },
    password : {
        type : String,
        required : [true, 'Please add a password'],
        minlength : 6,
        select : false
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    updatedAt : {
      type : Date,
      default : Date.now
  }
},{ timestamps : true})

module.exports = mongoose.model('User',UserSchema)