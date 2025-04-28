const USerSchema = require("../Model/USerSchema");
const jwt =require("jsonwebtoken")
const bcrypt = require("bcrypt")

 const secretKey = "asdadadadaadaad";


async function signup(req, res) {
    const body = req.body;
    const username = body.username;
    const password = body.password;
    const email = body.email;  

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt);

    const userObject ={
        username,
        password: hashedPassword,
        email,
    }

    const userCollectionObject = new USerSchema(userObject);
    const response = await userCollectionObject.save();

    const authData = {
        user: {id: response._id}
    }
    const token = jwt.sign(authData, secretKey,{expiresIn: "600000"})



    res.status(201).json({
        success: true,
        user: response,
        token
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

    

    if(!foundUser || foundUser.length === 0 ){
        res.status(401).json({ 
            success: false,
            message: "invalid credentials"
        })
    }else {
        const user = foundUser[0];
        const isPasswordMatched = await bcrypt.compare(password, foundUser[0].password)

        if(isPasswordMatched){
            const authData = {
                user: {id: user._id}
            }
            const token = jwt.sign(authData, secretKey,{expiresIn: "100000"})

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




module.exports = {login, signup, secretKey}