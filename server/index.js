var PORT = 8888;

var reqsPerSec = 0;
var numReqs = 0;

var express = require("express");
var fs = require("fs");
var path = require("path");

var options = require("./options");

var app = express();
app.use(express.bodyParser());

var startTime = new Date();

setInterval(function() {
    reqsPerSec = (reqsPerSec + numReqs) / 2.0;
    numReqs = 0;
    console.log("Requests per second: " + reqsPerSec);
}, 1000);

app.get("/", function(req, res) {
    numReqs++;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log("root");
    redirectToMapReduce(res);
});

app.get("/map", function(req, res) {
    var fileName = req.query.file;
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    fs.readFile(fileName, function(err, data) {
        if (err) {
            console.log("ERROR: " + err);
            res.json({error: err});
            res.end();
        } else {
            res.json({title: req.query.file, speed: reqsPerSec, map: data.toString()});
            res.end();
        }
    });
});

function removeMapJob(fileName) {
    console.log("FINISHED JOB: " + fileName);
    options.map_jobs.splice(options.map_jobs.indexOf(fileName), 1);
};

app.get("/reduce", function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var jobs_to_send = options.reduce_jobs;
    options.reduce_jobs = [];
    res.json({reduce: jobs_to_send, speed: reqsPerSec});
});

app.get("/done", function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json({
        done: true,
        result: options.result
    });
});

app.post("/emit/:phase", function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    var data = req.body;
    switch (req.params.phase) {
        case "reduce": 
            addReduceJob(parseInt(data.count));
            res.end();
            break;
        case "finalize": 
            if (parseInt(data.sum) > options.result)
                makeResult(parseInt(data.sum));
            var curTime = new Date();
            var timeElapsed = curTime - startTime;
            console.log("Time to finish: " + timeElapsed * 1000);
            res.end();
            break;
    }
});

app.listen(process.env.PORT || PORT);

var redirectToMapReduce = function(res) {
    if (moreMapJobs())
        redirectToMapPage(res);
    if (moreReduceJobs())
        redirectToReducePage(res);
    redirectToDonePage(res);
}

var redirectToMapPage = function(res) {
    res.redirect("map?file=" + options.map_jobs.pop());
}

var getRandomJob = function() {
    return options.map_jobs[Math.floor(Math.random()*options.map_jobs.length)];
}

var redirectToReducePage = function(res) {
    res.redirect("reduce");
}

var redirectToDonePage = function(res) {
    res.redirect("done");
}

var addReduceJob = function(job) {
    options.reduce_jobs.push(job);
};

var makeResult = function(result) {
    console.log("result is: " + result);
    options.result = result;
}

var moreMapJobs = function() {
    return options.map_jobs.length != 0;
}

var moreReduceJobs = function() {
    return options.reduce_jobs.length != 0;
}
