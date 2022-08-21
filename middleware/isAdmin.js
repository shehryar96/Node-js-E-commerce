const { json } = require("express");

module.exports = (req,res,next) =>{


   if(req.user)
   {
        if(req.user.isAdmin)
        {
            next()
        }
        else{
            res.status(404).send({"error_details":"You don't have an authority to perform cretain task"})
        }
   }
   else{
     return res.status(404).send('User Not found!');
   }
}