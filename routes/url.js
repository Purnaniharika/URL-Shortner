const express = require("express");

const {handleGenerateShortNewURL,handleGetAnalytics} = require("../controllers/url")

const router = express.Router();

router.post("/",handleGenerateShortNewURL)

router.get("/analytics/:shortID",handleGetAnalytics)

module.exports = router;