const express= require('express');
const request= require("request")
const bodyParser= require('body-parser');
const https= require('https');
const app= express();


app.use(bodyParser.urlencoded({extended:true}));
// app.use(express.static("public"));


app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html");
})
app.post("/", function(req, res){
    var fName= req.body.firstName;
    var lName= req.body.lastName;
    var email= req.body.emailAdd;
    var dataObj={
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    }
    var jsonData= JSON.stringify(dataObj);
    const url= "https://us12.api.mailchimp.com/3.0/lists/62b241e96c";
    const options={
        method: "POST",
        auth: "SPoddar:1a2a520f30d443c39f68315132585011-us12"
    }
    const request= https.request(url,options,function(response){
        if(response.statusCode=== 200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data", function(data){
            // console.log(JSON.parse(data))
        })
        
    })
    request.write(jsonData);
    request.end();

})
app.post("/failure" , function(req, res){
    res.redirect('/')
})

app.listen(process.env.PORT || 3000, function(){
    console.log('Server Running');
})
// api key
// 1a2a520f30d443c39f68315132585011-us12
// 62b241e96c