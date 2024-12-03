const express = require("express");

const urlRoute = require("./routes/url.js")
const {MongoConnect }= require("./connection.js")

const {URL} = require("./models/url.js")

const app  = express();
const port = 8002;
app.use(express.json())

MongoConnect("mongodb://localhost:27017/short-url")
.then(()=>{
    console.log("MonogoDB connected");
    
})

app.use("/url",urlRoute);

app.get('/:shortID',async(req,res)=>{
   const shortID = req.params.shortID;
  const entry = await URL.findOneAndUpdate(
    {shortID},
    {
   $push:{
    visitHistory:{
        timestamp : Date.now()
    }
   }
   }
) ;
         res.redirect(entry.redirectURL)
});


app.listen(port,()=>console.log("server started at PORT:",port)
)