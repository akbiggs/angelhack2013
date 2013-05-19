var world = {
    update: function(timeElapsed) {
        if (player.candies >= 100 && !$("#space").is(":visible")) {
            this.revealCandyRockMountain();
        }
        if (player.candies >= 200 && !$("#space").is(":visible")) {
            this.revealGundam();
        }
    },

    revealCandyRockMountain: function() {
        
        $("#mountain").show();
    },

    revealGundam: function() {
        $("#pilot_gundam").show();
        $("#gundam").show();
    },

    revealSpace: function() {
        $("#space").show();
        $("#pilot_gundam").hide();
        $("#mountain").hide();
        $("#gundam").hide();
    },
}
