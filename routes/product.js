const express = require('express');
const multer  = require('multer')
const router = express.Router();
const mongoose = require('mongoose');
const _ = require('lodash');
const {Product,Validate} = require('../models/products');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

// For uploading product images
const upload = require('../image_upload');

router.post('/addProduct',auth ,isAdmin, upload.single('image'), async(req,res) => {

    try {
        
        const error = Validate(req.body);

        if(!error) return res.status(404).send("Validation Errors => "+error['error'].details[0].message);

        const product = new Product(_.pick(req.body,['name','description','price','category_id']))

        if(req.file)
        {
            const productImages = req.file;
            const image_detail = {
                'name':productImages.originalname,
                'path':productImages.destination
            }
    
            product.images.push(image_detail);
        }

        const result = await product.save();



        return res.status(200).send({
            "Product Details ": result
        })



    } catch (e) {

        console.log(e)
        return res.status(404).send({"Error occured": e.message});
    }

});


router.get('/allProducts',auth ,isAdmin,async (req,res) => {
    
    const { page = 1, limit = 10 } = req.query;


    try{

        const products = await Product.find().populate('category_id')
        .limit(limit * 1).skip((page-1) * limit).exec();

        if(products)
        {

                const count = await Product.countDocuments();


                return res.status(200).send(
                {
                    "Products":products,
                    "totalPages": Math.ceil(count / limit),
                    "currentPage": page
                })
        }
        else{
            return res.status(200).send({
                'Message':'Products not found!'
            })
        }


    }
    catch(e)
    {
        return res.status(404).send({
            "Error occured":e.message
        })
    }

});


router.put('/update',auth ,isAdmin,upload.single('image'), async (req,res)=>{

        try{    

            /* return res.send(_.pick(req.body,['_id']));*/

            const product = await Product.findById(_.pick(req.body,['_id']));

            if(!product) return res.status(404).send({'error':'Product Not exist'})

            let image_detail = ''
            if(req.file)
            {
                const productImages = req.file;
                image_detail = {
                    'name':productImages.originalname,
                    'path':productImages.destination
                }

                /*updateProduct.images.push(image_detail);*/
                
            }

            
            const updateProduct = await Product.findByIdAndUpdate(req.body._id,_.pick(req.body,['name','description','price','category_id'])
            ,{new: true})

            
            // {$set:{'images.$.name':req.file.originalname}}
            updateProduct.images.pop();
            updateProduct.images.push(image_detail)

            await updateProduct.save();
           

            return res.status(200).send(
            {
                    "Updated Products ":updateProduct
            })

        }
        catch(e)
        {
            return res.status(404).send({
                "Error occured":e.message
            })
        }

});

// passing ID through params
router.delete('/delete/:id',auth ,isAdmin,async(req,res) => {

    if(!req.params.id)
    {
        return res.status(404).send({error:'Product ID is Required!'});
    }

    const product = await Product.findByIdAndRemove(req.params.id);

    if(!product) return res.status(404).send({'error':'Product Not exist'})

    return res.send({"success":"Product Deleted successfully!"})




    
})

module.exports = router;