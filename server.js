// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
var bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

var mysql      = require('mysql');
var con = mysql.createConnection({
  host     : process.env.HOST,
  user     : process.env.USERNAME,
  password : process.env.PASSWORD,
  database : process.env.DB
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});


app.get("/translate/:word", (request, response) => {
  
  console.log(request.params.word);
  
  var temp = JSON.parse("{}");
  
  con.query("SELECT * FROM `cloudic_words` WHERE `english` = '" + request.params.word + "'", function (err, result) {
    if (err) throw err;
    console.log("Result: " + result[0]);
    if (result != '') temp = result[0];
    response.send(temp);
  });
  
});


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});