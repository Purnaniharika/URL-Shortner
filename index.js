const express = require("express");
const path = require("path");
const cookiParser = require('cookie-parser')
const {checkForAuthentication,restrictTo} = require('./middleware/auth.js')
//Routes
const userRoute = require("./routes/user.js")
const urlRoute = require("./routes/url.js")
const staticRoute = require("./routes/staticRouter.js")

//midlleware

const {MongoConnect }= require("./connection.js")

const {URL} = require("./models/url.js")

const app  = express();
const port = 8002;

MongoConnect("mongodb://localhost:27017/short-url")
.then(()=>{
    console.log("MonogoDB connected");
    
});

app.set('view engine', 'ejs');
app.set('views',path.resolve("./views"));

app.use(express.json())
app.use(cookiParser())
app.use(express.urlencoded({extended:false}))
app.use(checkForAuthentication)

app.use('/user',userRoute);
app.use("/",staticRoute);
app.use("/url",restrictTo(["Normal","Admin"]),urlRoute);  //inline middleware

// app.get("/test",async(req,res)=>{
//     const allUrls = await URL.find({});
//     return res.render("home",{
//         urls :allUrls,
//         name : "piyush"
//     });
// })


app.get("/url/:shortID", async (req, res) => {
    const shortID = req.params.shortID;
    try {
        const entry = await URL.findOneAndUpdate(
            { shortID },
            { $push: { visitHistory: { timestamp: Date.now() } } }
        );
        if (!entry) {
            console.log("No entry found for shortID:", shortID);
            return res.status(404).send("Short URL not found.");
        }
        res.redirect(entry.redirectURL);
    } catch (err) {
        console.error("Error in /:shortID route:", err);
        res.status(500).send("Internal Server Error");
    }
});


app.listen(port,()=>console.log("server started at PORT:",port)
)