const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser("secretCode"));

app.get("/" , (req,res)=>{
    console.dir(req.cookies);
    res.send("This is the main page");
})

app.get("/setcookies",(req,res)=>{
    res.cookie("Hello" , "Mannu");
    res.send("Welcome to Cookies Server");
})

app.get("/greet" , (req,res)=>{
    let {name = "InstagramUser"} = req.cookies;
    res.send(`Hi ${name}`);
})

app.get("/getsignedcookies" , (req,res)=>{
    res.cookie("madeIn" , "China", {signed : true});
    res.send("Signed Cookies Sent");
})

app.get("/verifysignedcookies",(req,res)=>{
    console.log(req.signedCookies);
    res.send("Verified");
})

app.listen("2020", () => {
    console.log("App is listening on port 2020");
})