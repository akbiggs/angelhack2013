var Enemy = function(pos) {
    return {
        pos: pos,
        size: new Vector2(20, 20),
        color: "#ff0000",
        moveSpeed: 5,
        health: 1,

        update: function(timeElapsed) {
            var movementDirection = this.pos.directionTo(player.pos); 
            var nextPos = this.pos.add(movementDirection.scalarMul(this.moveSpeed));
            nextPos = nextPos.clamp(Vector2(0,0), Vector2(canvas.width-this.size.x, canvas.height-this.size.y)); 
            this.pos = nextPos;
        },

        draw: function(ctx) {
            ctx.save();
            
            ctx.fillStyle = this.color;
            ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y); 

            ctx.restore();
        },
    };
}
