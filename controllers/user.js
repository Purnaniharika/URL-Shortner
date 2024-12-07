const User = require("../models/user.js")
const {v4:uuidv4} = require('uuid')
const {setUser} = require('../service/auth.js')


async function handleUserSignUp(req,res){
    const {name,email,password} = req.body
    await User.create({
        name ,
        email,
        password
    });
    return res.render('home');
}

async function handleUserLogin(req,res){
    const {email,password} = req.body
    const user = await User.findOne({
        email,password
    })
    if(!user || !user._id || !user.email) return res.render('login',{
        error : "Invlaid Username or password"
    });
  const token = setUser(user);
//    res.cookie('uid',token)
//    return res.redirect('/');
return res.json({ token });
}
module.exports = {handleUserSignUp,
    handleUserLogin
}
