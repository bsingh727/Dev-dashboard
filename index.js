var application_root = __dirname,
    express = require("express"),
    cors = require("cors"),
    path = require("path");

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
var fs = require('fs');

var app = express();
app.use(cors());
app.use( bodyParser.urlencoded( {
    extended: true
}));

app.use( bodyParser.json() );

console.log("Server is running");

app.post('/getprojectdetails', function(req, res){

    console.log(req.body);
    var project_name = req.body.project_name;

    fs.readFile('src/newmanresults/PRJ1/1.JSON', 'utf-8', function(err, content) {
        if (err) {
         // onError(err);
          return err;
        }
        res.send(content);
    });
});

app.listen(1212);
