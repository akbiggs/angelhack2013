var glob = require("glob");

glob("data/*.txt", function(err, files) {
    if (err) {
        console.log("ERROR: " + err);
        return;
    }
    
    exports.map_jobs = files;
    console.log("Adding map jobs: " + exports.map_jobs);
});

exports.reduce_jobs = [];
exports.result = 0;
