const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User,validate } = require('../models/users');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

router.post('/createUser',auth,isAdmin,async (req,res)=>{

   // return res.status(200).send(JSON.stringify(req.body))
    const error = validate(req.body);

    if(!error) return res.status(404).send("Validation Errors => "+error['error'].details[0].message);

    // check if user exist
    const findUser = await User.findOne(_.pick(req.body,['email']));
    if(findUser)
    {
        return res.status(404).send("User Already Exist");
    }

    const salt = await bcrypt.genSalt(10)
   
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    const user = new User(_.pick(req.body,['name','email','password','phone','isAdmin','token']))
    
    // User.create(
    //     _.pick(req.body,['name','email','password','phone','isAdmin','token'])
    // )

    user.password = hashedPassword;

    const result =  await user.save();


    const gentoken = user.generateAuthToken();


    try{
        const updatedUser = await User.findByIdAndUpdate(result._id,{
            token:gentoken
        },{new: true})

        return res.status(200).send("User Created Successfully!"+updatedUser);

    }
    catch(e)
    {
        return res.send(e);

    }


});





module.exports = router;
