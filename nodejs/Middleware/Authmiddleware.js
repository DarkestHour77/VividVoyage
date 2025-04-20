

function AuthenticateUser (req,res,next){
    const PASSWORD = req.PASSWORD

    const headers = req.headers;
    const authorization = headers.authorization;

    if(authorization === PASSWORD){
        next();
    }else{
        res.status(403).json({message: "password wrong"});
    }
}

module.exports = AuthenticateUser;