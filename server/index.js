var PORT = 8888;

var express = require("express");
var fs = require("fs");
var options = require("./options");

var app = express();
app.use(express.bodyParser());

app.get("/", function(req, res) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log("root");
    redirectToMapReduce(res);
});

app.get("/map", function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    fs.readFile(req.query.file, function(err, data) {
        if (err) {
            console.log("ERROR: " + err);
            res.json({error: err});
            res.end();
        } else {
            res.json({map: data.toString()});
            res.end();
        }
    });
});

app.get("/reduce", function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json({reduce: options.reduce_jobs});
    options.reduce_jobs = [];
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
        case "finalize": 
            makeResult(data.sum);
            res.end();
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
