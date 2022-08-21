const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
const Joi = require('joi');

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        minlenght:5,
        maxlenght:25
    },
    email:{
       type:String,
       required:true,
       minlenght:5,
       maxlenght:25

    },
    password:{
        type:String,
        required:true,
        minlenght:7,
        maxlenght:11,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        minlenght:5,
        maxlenght:11
    },
    isAdmin:{
        type:Number,
        default:0
    },
    token:{
        type:String
    }

});


userSchema.methods.generateAuthToken = function() {

    const token = jwt.sign({_id:this._id,isAdmin:this.isAdmin},process.env.TOKEN_PRIVATE_KEY);
    return token;
}





const User = mongoose.model('user',userSchema);

ValidateUser = (user) =>{

    const schema = Joi.object({
        name: Joi.string().min(5).max(25).required(),
        password: Joi.string().min(7).max(1024).required(),
        email: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isAdmin:Joi.number(),
        token:Joi.string().empty('')
    });

    return schema.validate(user)
}


exports.User = User;
exports.validate = ValidateUser;