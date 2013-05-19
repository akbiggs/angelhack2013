var input = {
    left: false,
    right: false,
    up: false,
    down: false,
};

$(document).keydown(function(e) {
    var key = e.keyCode;
    if (key === 87)
        input.up = true;
    else if (key === 65)
        input.left = true;
    else if (key === 83)
        input.down = true;
    else if (key === 68)
        input.right = true;
});

$(document).keyup(function(e) {
    var key = e.keyCode;
    if (key === 87)
        input.up = false;
    else if (key === 65)
        input.left = false;
    else if (key === 83)
        input.down = false;
    else if (key === 68)
        input.right = false;
});
