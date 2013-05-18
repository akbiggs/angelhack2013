var PORT = 8888;

var express = require("express");
var options = require("./options");

var app = express();

app.get("/", function(req, res) {
    redirectToMapReduce(res);
});

app.get("/map/*", function(req, res) {
    console.log(req.query.splat);
});

app.listen(process.env.PORT || PORT);

var redirectToMapReduce = function(res) {
    if (moreMapJobs())
        redirectToMapPage(res);
    if (moreReduceJobs())
        redirectToReducePage(res);
    finish(res);
}

var redirectToMapPage = function(res) {
    res.redirect("map/#" + options.map_jobs.pop());
}

var redirectToReducePage = function(res) {
    console.log("reducing phase");
}

var finish = function(res) {
    redirectToDonePage(res);
    res.end();
};

var redirectToDonePage = function(res) {
    console.log("done jobs");
}

var moreMapJobs = function() {
    return options.map_jobs.length != 0;
}

var moreReduceJobs = function() {
    return options.reduce_jobs.length != 0;
}
