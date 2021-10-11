const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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



UserSchema.pre('save', async function(next){
    //Hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})

//Get jwt token
UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id : this._id}, process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_EXPIRE
    })
}

//MatchPassword
UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

module.exports = mongoose.model('User',UserSchema)