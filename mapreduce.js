var HOST = "http://localhost:8888";

var mapreduce = function() {
    $.getJSON(HOST, function(response) {
        if (response.map) {
            map(response.title, response.map);
        } else if (response.reduce) {
            reduce(response.reduce);
        } else if (response.result) {
            finish(response.result);
        } else {
            mapreduce();
        }
    });
};

var map = function(title, data) {
    updateProblemText("Summing up all the words in: " + title);
    console.log("lag");
    var words = data.split(/\n|\s/).length;
    emit("reduce", {"count": words});
    mapreduce();
};

var reduce = function(partials) {
    updateProblemText("Reducing partial sums...");
    var sum = 0;
    console.log("lag");
    $.each(partials, function(index, partial) {
        sum += partial;
        if (index === partials.length-1)
            emit("finalize", {"sum": sum});
    });
    mapreduce();
};

var emit = function(phase, data) {
    $.post(HOST + "/emit/" + phase, data);
};

var finish = function(result) {
    updateProblemText("Result is: " + result);
};

var updateProblemText = function(newText) {
    $("#problem").html("<p>" + newText + "</p>");
}
