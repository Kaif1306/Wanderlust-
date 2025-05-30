const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listings.js");

const dbUrl = process.env.ATLASDB_URL

main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(dbUrl);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj , owner : '6741708651889dc07accac75'}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");

};
initDB();