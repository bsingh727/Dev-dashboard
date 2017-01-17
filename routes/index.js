var express           = require('express');
var router            = express.Router();
var fs                = require('fs');
var cron              = require('node-cron');
var runner            = require('../model/runner');
var cors              = require("cors");
var bodyParser        = require('body-parser');
var urlencodedParser  = bodyParser.urlencoded({ extended: false });
var jsonParser        = bodyParser.json();
var async             = require("async");
var path              = require("path");
router.use(cors());

router.get('/', function(req, res, next){
    res.render('index.html');
});

router.get('/getuserdetails', function(req, res, next){
    res.render('index.html');
});

router.post('/devdashboard', function(req,res,next){
    var projectid=req.body.projectid;
    newmanrunner.checkFile('../model/newman_runner.js');
    fs.readFile( __dirname + "/" + "userpostcollection.json", 'utf8', function (err, data) {
           res.send( data );
     });
});

router.get('/run-scheduler', function(req,res,next){
    cron.schedule('* * * * *', function(){
            runner.readAllFile();
            console.log("Cron Trigger");
    })
    res.send( "Scheduler is runninr..." );
});


router.use( bodyParser.urlencoded( {
    extended: true
}));

router.use( bodyParser.json() );

console.log("Server is running");

router.post('/getprojectdetails', function(req, res){
    var project_name = req.body.project_name;
    fs.readFile('src/newmanresults/PRJ1/1.JSON', 'utf-8', function(err, content) {
        if (err) {
         // onError(err);
          return err;
        }
        res.send(content);
    });
});


router.get('/json', function(req, res) {
  var work = {};
  const parentFolder = './collection_output/';
  var fileNames = walk(parentFolder);
  for(var i= 0; i<fileNames.length ; i++){
      var dirName =   path.join(__dirname, '../');
      work['file0'+i] = async.apply(fs.readFile, dirName + fileNames[i].slice( 1 ));
  }
  async.parallel(work, function (error, results) {
    if (error) {
      res.status(500).send(error);
      return;
    }
    var resLen = Object.keys(results);
    for(var i= 0; i< resLen.length; i++){
        results['file0'+i] =  JSON.parse(results['file0'+i]);
    }
    res.send(results);
  });
});

var walk = function(dir) {
    var results = []
    var list = fs.readdirSync(dir)
    list.forEach(function(file) {
        file = dir + '/' + file
        var stat = fs.statSync(file)
        if (stat && stat.isDirectory()) results = results.concat(walk(file))
        else results.push(file)
    })

    return results
}

module.exports=router;
