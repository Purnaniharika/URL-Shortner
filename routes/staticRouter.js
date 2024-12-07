const express = require("express");
const { URL } = require("../models/url.js");
const { restrictTo } = require("../middleware/auth.js");
const router = express.Router();

router.get('/admin/urls',restrictTo(['Admin']),async(req,res)=>{
    const allurls = await URL.find({})
    return res.render('home',{
        urls : allurls
    });
})
router.get('/',restrictTo(['Normal','Admin']),async(req,res)=>{
    const allurls = await URL.find({createdBy:req.user._id})
    return res.render('home',{
        urls : allurls
    });
})

router.get("/signup",(req,res)=>{
    return res.render('signUp');
})
router.get("/login",(req,res)=>{
    return res.render('login');
})

module.exports = router;