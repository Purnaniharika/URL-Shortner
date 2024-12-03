const shortid = require("shortid")

const {URL} = require('../models/url')

async function handleGenerateShortNewURL(req,res){
     const shortID = shortid(8);
     const body = req.body;
     if(!body.url) return res.status(400).json({error : "Enter URL"})
    await URL.create({
        shortID:shortID,
        redirectURL:body.url,
        visitHistory:[]
});

 return res.json({id:shortID})
}

async function handleGetAnalytics(req,res){
    const shortID = req.params.shortID;
    const result = await URL.findOne({shortID})
    return res.json(
        {totalClicks : result.visitHistory.length,
             analytics:result.visitHistory
            })
}

module.exports = {
    handleGenerateShortNewURL,
    handleGetAnalytics
}