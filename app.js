const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const urlencoded = require('body-parser/lib/types/urlencoded');
const https = require('https');

const app = express();

app.use(express.static('public')); // to access the public folder allows us to access the css and image files 
app.use(bodyParser.urlencoded({extended: true}));

// EVERYTHING ABOVE IS NEEDED TO RUN THE APP

app.listen(3000, function(){
    console.log('listening on 3000');
})


app.get('/', function(req, res){
    res.sendFile(__dirname + '/signup.html');
})

app.post('/', function(req, res){ // this is the post request
    const firstName = req.body.fName; // this is the name of the input field in the html file
    const lastName = req.body.lName; // ""
    const email = req.body.email; //""

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
    }
]

}
   
const jsonData = JSON.stringify(data); // this is the data that is going to be sent to the mailchimp api
   const url="https://us9.api.mailchimp.com/3.0/lists/94ffb4452a"
    const options = {
        method: 'POST', // this is the method that is going to be used to send the data
        auth: "oddthomas:" // this is the authentication that is going to be used to send the data
    }

   const request = https.request(url, options, function(response){
    
    if(response.statusCode === 200){ // if the response is 200 then the user is added to the list
        res.sendFile(__dirname + '/success.html');// this is the success page
    } else {
        res.sendFile(__dirname + '/failure.html');// this is the failure page
    }
    response.on("data", function(data){// this is the data that is returned from the mailchimp api
        console.log(JSON.parse(data));
    })
    })
    request.write(jsonData);// this is the data that is going to be sent to the mailchimp api
    request.end();// this is the end of the request
    })



//api

//list id
//94ffb4452a

///lists/{list_id}/members
