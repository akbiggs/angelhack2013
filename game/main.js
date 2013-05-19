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

    world.update(timeElapsed);
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
    if (player.candies < 1000000)
        $("#inventory .candies").html("You have " + player.candies + " candy rocks.");
    else
        $("#inventory .candies").html("You have a gazillion candy rocks.");
    player.draw();
};
