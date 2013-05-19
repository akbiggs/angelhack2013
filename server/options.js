var glob = require("glob");

exports.offsets = {};

glob("data/*.txt*", function(err, files) {
    if (err) {
        console.log("ERROR: " + err);
        return;
    }
    
    exports.map_jobs = files;
    for (var i=0; i < files.length; i++) {
        exports.offsets[files[i]] = 0;
    }
    console.log("Adding map jobs: " + exports.map_jobs);
});

exports.reduce_jobs = [];
exports.result = null;
