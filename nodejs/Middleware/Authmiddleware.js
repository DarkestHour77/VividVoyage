const jwt = require("jsonwebtoken");
const { secretKey } = require("../Controllers/AuthController");


function AuthenticateUser (req,res,next){
    
    const token = req.headers?.authorization?.split(" ")[1];

    if(!token){
        res.status(401).json({
            success:false,
            message:"autentication required"
        })
    }else{
        jwt.verify(token, secretKey,(error, decodedMessage)=>{
            if(error){
                res.status(401).json({
                    success:false,
                    message:"invalid token"
                })
            }else{
                req.userId = decodedMessage.user
                next();
            }
        })
    }
    

}

module.exports =  AuthenticateUser ;