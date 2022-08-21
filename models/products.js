const mongoose = require('mongoose');
const Joi = require('joi');

const productSchema = new mongoose.Schema({
    
    name : {
        type:String,
        minlenght:5,
        maxlenght:1024,
        required:true
    },
    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"categories"
    },
    description:{
        type:String,
        minlenght:10,
        maxlenght:2048,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    // defined string array in mongo
    images:{
        type:[{'name':String,'path':String}], 
        default: []  
    }

})

const Product = mongoose.model('product',productSchema);


validateProduct =  (req) => {


    const schema = Joi.object({
        name: Joi.string().min(2).max(1024).required(),
        description: Joi.string().min(10).max(1024).required(),
        category_id: Joi.string().required(),
        price: Joi.number().required(),
    });

    return schema.validate(req);


}

exports.Product = Product;
exports.Validate = validateProduct;