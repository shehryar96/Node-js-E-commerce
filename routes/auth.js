const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/users');
const Joi = require('joi');

router.post('/login',async (req,res)=>{

    const {error} = validate(req.body);

    if(error) return res.status(404).send({
        "Validation errors" : error.details[0].message
    });
   
    const user = await User.findOne(_.pick(req.body,['email']));
    
    if(!user)
    {
        return res.status(404).send('Invalid Email & Password');
    }

    const validPassword = await bcrypt.compare(req.body.password,user.password);

    if(!validPassword) return res.status(400).send('Invalid Email & Password');


    const token = user.generateAuthToken();


   return res.status(200).send({'Token Created ':token,'User ':user});


});

// validation request
function validate(req){

    const schema = Joi.object({

        email:Joi.string().min(5).max(1024).required(),
        password: Joi.string().min(5).max(1024).required()


    });

    return schema.validate(req);

}


module.exports = router;