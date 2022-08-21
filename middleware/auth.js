const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')



module.exports = (req,res,next) => {

    const token = req.header('x-auth-token');

    if(!token)
    {
        return res.status(404).send({'error_details':'Token is Required!'});
    }

    try{
        const verifytoken = jwt.verify(token,process.env.TOKEN_PRIVATE_KEY);
       // res.user = verifytoken;
        req.user = verifytoken;
        next();

    }
    catch(e)
    {
        return res.status(404).send('Invalid Token');

    }

    


}


