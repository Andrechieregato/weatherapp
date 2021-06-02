const express = require("express");
const https = require("https");

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));


app.get("/", function(req,res){

    res.sendFile(__dirname + "/index.html");
  
});

app.post("/", function(req,res){

    
    const query = req.body.cityName; 
    const appKey = "44c42ed42f219fabaf9269591142529b";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appKey + "&units=" + unit;

https.get(url, function (response){
    console.log(response.statusCode);

    response.on("data", function(data){

        const weatherData = JSON.parse(data);

        const weatherTemp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write("<p>The weather is currently " + weatherDescription + "</p>");
        res.write("<h2>The temperature in " + query + " is " + weatherTemp + " degrees" + "</h2>");
        res.write("<img src=" + imageURL +">");
        
        
        res.send();

    });
})
})








app.listen(3000, function (){


    console.log("The server is running on port 3000");
})