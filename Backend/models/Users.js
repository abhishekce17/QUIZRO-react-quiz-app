const mongoose  = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');


const UserSchema = new mongoose.Schema({
    "first name" : {
        type : String,
        required : true
    },
    "last name":{
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type: String,
    },
    googleId :{
        type : String
    },
    username : {
        type : Number 
    }

})

UserSchema.plugin(passportLocalMongoose)
UserSchema.plugin(findOrCreate)

module.exports = mongoose.model("user", UserSchema);