const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express()

//API key - d7bc4d3eaa9f28d956fd89498896b911-us13
//List/audience id - bd2075e240

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", (req, res) => {
    const fname = req.body.fname
    const lname = req.body.lname
    const email = req.body.email

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname,
                    // BIRTHDAY: 
                }

            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const list_id = "bd2075e240"
    const url = `https://us13.api.mailchimp.com/3.0/lists/${list_id}`
    const options = {
        method: 'POST',
        auth: "anystring:d7bc4d3eaa9f28d956fd89498896b911-us13"
    };
    const request = https.request(url, options, function (response) {
        response.on("data", (data)=>{
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();

});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on http://127.0.0.1:3000/");
})