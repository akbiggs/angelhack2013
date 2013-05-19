var Player = function(pos) {
    return {
        candies: 0,
        exp: 0,
        mood: "hungry",
        mood_faces: {
            "hungry": ":(",
            "neutral": ":|",
            "happy": ":)",
            "ecstatic": ":D"
        },
        resourcesUpdated: false,

        update: function(timeElapsed) {
            this.resourcesUpdated = false;
            if (timeElapsed >= 2000) {
                this.resourcesUpdated = true;
                this.candies += 1;
            }
        },

        draw: function() {
            $("#player").html("You're feeling: " + this.mood + " " + this.mood_faces[this.mood]);
        },
    };
}
