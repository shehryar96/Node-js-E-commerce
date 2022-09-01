const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {Cart,validateCart} = require('../models/cart');

router.post('/addtocart',async (req,res) => {

    try{
        const error = validateCart(req.body);
    
        if(!error) return res.status(404).send("Validation Errors => "+error['error'].details[0].message);


        const C_cart = new Cart(_.pick(req.body,['userId','products']));
      
        const result =  await C_cart.save();

        return res.status(200).send({
            "cart Details ": result
        })
    }
    catch(e)
    {
        return res.status(404).send({"Error occured": e.message});
    }
    
});

// get cart by user

router.get('/getUsercart/:id',async(req,res) => {


    if(!req.params.id)
    {
        return res.status(404).send({error:'User ID is required'});
    }

    const cart = await Cart.find({'userId':req.params.id})

    return res.send(cart);


})

module.exports = router;