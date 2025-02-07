const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

const sessionOptions = {
    secret : "supersecretcode",
    resave : false,
    saveUninitialized : true
}

app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
})

app.get("/register" , (req,res)=>{
    let {name = "anonymous"} = req.query;
    req.session.name = name;
   
    if(name=="anonymous"){
        req.flash("error" , "Messege not delivered");
    }else{
        req.flash("success", "Messege sent");
    }

    res.redirect("/hello");
})

app.get("/hello" , (req,res) => {
    res.render("page.ejs" , {name : req.session.name});
})

app.get("/count" , (req,res)=>{
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count = 1;
    }
   
    res.send(`Request : ${req.session.count} times`);
})


app.get("/" , (req,res)=>{
    res.send("This is the main page");
})

app.listen("2345", ()=>{
    console.log("Listening on port 2345");
})