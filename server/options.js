var glob = require("glob");

glob("data/*.txt", function(err, files) {
    if (err) {
        console.log("ERROR: " + err);
        return;
    }
    
    exports.map_jobs = files;
    /*exports.map_jobs = files.map(function(file) {
        return file.split("/")[1];
    });*/
    console.log("Adding map jobs: " + exports.map_jobs);
});

exports.reduce_jobs = [];
exports.result = null;
