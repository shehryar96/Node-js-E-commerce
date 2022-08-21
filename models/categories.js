const mongoose = require('mongoose');
const Joi = require('joi');



const categoriesSchema = new mongoose.Schema({

        name : {
            type:String,
            minlenght:5,
            maxlenght:25,
            required:true
        }
});

const Categories = mongoose.model('categories',categoriesSchema);


function validateCategories(user){

    const schema = Joi.object({
        name: Joi.string().min(2).max(25).required(),
    });

    return schema.validate(user);

}

exports.Categories = Categories;
exports.validate = validateCategories;