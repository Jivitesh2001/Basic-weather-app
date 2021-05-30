const express = require("express");
const https = require("https");
//const bodyParser = require("body-parser");  body parser is deprecated in node 4.16 and higher and we are using node 4.17

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
    const query = req.body.cityName;
    const apiKey = "3a3bc76792345355418782181cb231ad";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units + "";
    https.get(url, function(response) {
        console.log(response.statusCode);
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            console.log(imageUrl);
            console.log(temp);
            res.write("<p>The weather is currently " + weatherDescription + "</p>")
            res.write("<h1>The temperature in " + query + " is: " + temp + " degrees C</h1>")
            res.write("<img src =" + imageUrl + ">");
            res.send()
        })


    })

})


app.listen(3000, function() {
    console.log("Server is running on port 3000.");
})