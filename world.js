var world = {
    update: function(timeElapsed) {
        if (player.candies >= 100) {
            this.revealCandyRockMountain();
        }
        if (player.candies >= 500) {
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
}
