var canvas, ctx;

var prevTime = new Date();
var timeElapsed = 0;

var player = null;
var enemies = [];
var enemyGenerated = false;

var startGame = function() {
    canvas = document.getElementById("mainCanvas");
    ctx = canvas.getContext("2d");
    player = Player(Vector2(185, 185));
    
    setInterval(function() {
        update(timeElapsed);
        draw(ctx);
    }, 1000/30);
}

var update = function(timeElapsed) {
    updateTimer();

    player.update(timeElapsed);
    if (player.resourcesUpdated) {
        resetTimer(timeElapsed);
    }

    updateEnemies(timeElapsed);
};

var updateTimer = function() {
    var curTime = new Date();
    timeElapsed += curTime - prevTime;
    prevTime = curTime;
};

var resetTimer = function(curTime) {
    timeElapsed = curTime % 2000;
    enemyGenerated = false;
}

var updateEnemies = function(timeElapsed) {
    if (shouldGenerateEnemy(timeElapsed)) {
        generateEnemy();
    }
    $.each(enemies, function(index, enemy) {
        enemy.update(timeElapsed);
    });
}

var shouldGenerateEnemy = function(timeElapsed) {
    return timeElapsed >= 800 && !enemyGenerated;
};

var generateEnemy = function() {
    enemies.push(new Enemy(getNextEnemyPosition()));
    enemyGenerated = true;
}

var getNextEnemyPosition = function() {
    var chosenPos = Vector2(Math.random() * canvas.width, Math.random() * canvas.height);
    if (chosenPos.x <= player.pos.x) {
        chosenPos.x = Math.min(chosenPos.x, player.pos.x - 75);
    } else if (chosenPos.x >= player.pos.x) {
        chosenPos.x = Math.max(chosenPos.x, player.pos.x + 75);
    }

    if (chosenPos.y <= player.pos.y) {
        chosenPos.y = Math.min(chosenPos.y, player.pos.y - 75);
    } else if (chosenPos.y >= player.pos.y) {
        chosenPos.y = Math.max(chosenPos.y, player.pos.y + 75);
    }

    return chosenPos;
}

var draw = function(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawEnemies(ctx);
    player.draw(ctx);
    drawHUD(ctx);
};

var drawEnemies = function(ctx) {
    $.each(enemies, function(index, enemy) {
        enemy.draw(ctx);
    });
};

var drawHUD = function(ctx) {
    ctx.fillText(getHUDText(), 10, 50);
}

var getHUDText = function() {
    return "M: " + player.minerals + ", O: " + player.ozone + ", R: " + player.rockets;
}
