var prevTime = new Date();
var timeElapsed = 0;

var player = null;

var startGame = function() {
    player = Player(Vector2(185, 185));
    
    setInterval(function() {
        update(timeElapsed);
        draw();
    }, 1000/30);
}

var update = function(timeElapsed) {
    updateTimer();

    player.update(timeElapsed);
    if (player.resourcesUpdated) {
        resetTimer(timeElapsed);
    }
};

var updateTimer = function() {
    var curTime = new Date();
    timeElapsed += curTime - prevTime;
    prevTime = curTime;
};

var resetTimer = function(curTime) {
    timeElapsed = curTime % 2000;
}

var draw = function() {
    $("#inventory .candies").html("You have " + player.candies + " candy rocks.");
    player.draw();
};
