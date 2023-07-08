const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));

app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/signup.html")
})

app.post("/", (req, res)=>{
    fname = req.body.fname
    lname = req.body.lname
    email = req.body.email
    console.log(fname);
    console.log(lname);
    console.log(email);
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server running on http://127.0.0.1:3000/");
})