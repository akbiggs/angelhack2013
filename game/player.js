var Player = function(pos) {
    return {
        pos: pos,
        size: new Vector2(20, 20),
        center: function() { 
            return Vector2(this.pos.x + this.size.x/2, this.pos.y + this.size.y/2);
        },
        moveSpeed: 4,
        color: "#0000ff",
        health: 5,

        minerals: 0,
        ozone: 0,
        rockets: 0,
        exp: 0,
        resourcesUpdated: false,

        update: function(timeElapsed) {
            this.resourcesUpdated = false;
            if (timeElapsed >= 2000) {
                this.resourcesUpdated = true;
                this.minerals += 5;
            }

            if (input.left) {
                this.pos.x -= this.moveSpeed; 
            } else if (input.right) {
                this.pos.x += this.moveSpeed;
            }

            if (input.up) {
                this.pos.y -= this.moveSpeed; 
            } else if (input.down) {
                this.pos.y += this.moveSpeed;
            }

            this.pos = this.pos.clamp(Vector2(0, 0), Vector2(canvas.width - this.size.x, canvas.height - this.size.y));
        },

        draw: function(ctx) {
            ctx.save();
            
            ctx.fillStyle = this.color;
            ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y); 

            ctx.restore();
        },
    };
}
