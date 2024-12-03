const mongoose = require("mongoose");

async function MongoConnect(url){
    return mongoose.connect(url)
}

module.exports = {
    MongoConnect
}