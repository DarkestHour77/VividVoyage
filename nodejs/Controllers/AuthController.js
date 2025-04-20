const USerSchema = require("../Model/USerSchema");
const jwt =require("jsonwebtoken")


secretKey = "asdadadadaadaad"


async function signup(req, res) {
    const body = req.body;
    const username = body.username;
    const password = body.password;
    const email = body.email;  

    const userObject ={
        username,
        password,
        email,
    }

    const userCollectionObject = new USerSchema(userObject);
    const response = await userCollectionObject.save();

    res.status(201).json({
        success: true,
        user: response,
    })
}

async function login(req, res){
    const body = req.body;
    const username = body.username;
    const password = body.password;

    const userObject ={
        username,
        password,
    }

    const foundUser = await USerSchema.find({username: username});
    console.log(foundUser);
    if(!foundUser || foundUser.length === 0 ){
        res.status(401).json({ 
            success: false,
            message: "invalid credentials"
        })
    }else {
        const user = foundUser[0];
        if(password === user.password){
            const authData = {
                user: {id: user._id}
            }
            const token = jwt.sign(authData, secretKey)

            res.status(200).json({
                success: true,
                user: user,
                token
            }) 
        }
        else{
            res.status(401).json({
                success: false,
                message: " invalid password"
            }) 
        }
    }

       


}




module.exports = {login, signup}