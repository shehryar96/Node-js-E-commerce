const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');


const cartSchema = new mongoose.Schema({

    userId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    products:[
       {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"product"
            },
            quantity:{
                type:String,
                default:'1'
            },
            amount:{
                type:String
            }
       }
    ]}
    ,{ timestamps:true }
);


const Cart = mongoose.model('cart',cartSchema);


const validateCart = (req) => {
    
    const schema = Joi.object({
        
        userId:Joi.string().required(),
        products: Joi.array().items(
            Joi.object().keys({
                productId:Joi.string().required(),
                quantity:Joi.string().required(),               
                amount:Joi.string().required(),

            })
        )
        // products: Joi.array().items(
        //     Joi.object().keys({
        //         productId:Joi.string().required(),
        //         quantity:Joi.Number.required(),
        //         amount:Joi.Number.required()
        //     })
        // )

  
    });

    return schema.validate(req);


}



exports.Cart = Cart;
exports.validateCart = validateCart;