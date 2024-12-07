const {getUser} = require("../service/auth.js")

async function restrictToLoggedinUserOnly(req,res,next){
//    const userUid = req.cookies.uid;
const userUid = req.headers["authorization"]

   if(!userUid || !userUid.startsWith("Bearer ")) return res.redirect('/login');
   const token = userUid.split("Bearer ")[1];
   const user = getUser(token);
   if(!user) return res.redirect("/login")
     req.user = user ;
    next();
}
async function checkAuth(req,res,next){
    console.log(req.headers);
    
    const userUid = req.headers["authorization"]

    if (userUid && userUid.startsWith("Bearer ")) {
        const token = userUid.split("Bearer ")[1];

        const user = getUser(token);
        req.user = user ;
    }
    next();

 }

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth
}