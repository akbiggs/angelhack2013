var Player = function(pos) {
    return {
        candies: 0,
        consumed: 0,
        exp: 0,
        mood: "hungry",
        mood_faces: {
            "hungry": ":(",
            "neutral": ":|",
            "happy": ":)",
            "ecstatic": ":D",
            "sick": ":'(",
            "dead": "X("
        },
        resourcesUpdated: false,

        update: function(timeElapsed) {
            this.resourcesUpdated = false;
            if (timeElapsed >= 2000) {
                this.resourcesUpdated = true;
                this.candies += 1;
            }

            if (this.consumed < 10)
                this.mood = "hungry";
            if (this.consumed >= 10 && this.consumed < 30)
                this.mood = "neutral";
            if (this.consumed >= 30 && this.consumed < 70)
                this.mood = "happy";
            if (this.consumed >= 70 && this.consumed < 120)
                this.mood = "ecstatic";
            if (this.consumed >= 120 && this.consumed < 150)
                this.mood = "sick";
            if (this.consumed >= 150)
                this.mood = "dead";
        },

        eat_candies: function(timeElapsed) {
                         if (this.candies >= 5) {
                            this.candies -= 5;
                            this.consumed += 5;
                         }
                     },
        
        cheat: function() {
                   this.candies += 10;
               },

        draw: function() {
            $("#player").html("<p>You're feeling " + this.mood + " " + this.mood_faces[this.mood] + "</p>");
            $("#player").append("<p>You have eaten " + this.consumed + " candy rocks.</p>");
        },
    };
}
