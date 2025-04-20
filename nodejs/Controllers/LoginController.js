const LoginSchema = require("../Model/LoginSchema")

async function LoginData (req, res) {
    try {
        const login = new LoginSchema({
           username: req.body.username,
           password: req.body.password,
        });
        await login.save();
        res.status(201).json({message: "Login saved"});
    } catch(error) {
        console.error("Error details:", error);
        res.status(500).json({error: error.message});    }
};

module.exports = { LoginData }