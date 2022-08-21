const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const _ = require('lodash');
const {Categories,validate} = require('../models/categories');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

router.post('/addCategories',auth,isAdmin, async(req,res)=>{

    const error = validate(req.body);

    if(!error) return res.status(404).send("Validation Errors => "+error['error'].details[0].message);

    const categoryExist = await Categories.find(_.pick(req.body,'name'));

    if(!categoryExist) return res.status(404).send('Category with same name already exists!')

    const category = new Categories(_.pick(req.body,'name'))

    const result = await category.save();

    return res.status(200).send({"Category Added Successfully ":result})


});

router.get('/getallcategories',auth,isAdmin,async (req,res)=>{


        try{

            const categories = await Categories.find();

            return res.status(200).send({"Categories":categories})


        }
        catch(e)
        {
            return res.status(404).send(e);
        }

});

module.exports = router;