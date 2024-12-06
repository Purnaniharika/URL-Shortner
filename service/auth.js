const jwt = require("jsonwebtoken")
const secret = "niharika";


//user keliye token assignment 
function setUser(user){
    const payload = {
        _id : user._id,
        email : user.email
    };
    return jwt.sign(payload,secret)
}

function getUser(token){
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return null;
    }
}

module.exports ={
    setUser,getUser
}