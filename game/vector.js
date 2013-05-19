var Vector2 = function(_x, _y) {
    return {
        x: _x,
        y: _y,

        add: function(otherVector) {
            return Vector2(this.x + otherVector.x, this.y + otherVector.y);
        },

        sub: function(otherVector) {
            return Vector2(this.x - otherVector.x, this.y - otherVector.y);
        },

        scalarMul: function(scalar) {
                       return Vector2(this.x*scalar, this.y*scalar);
                   },

        clamp: function(min, max) {
            var clampedX = this.x < min.x ? min.x : this.x;
            clampedX = clampedX > max.x ? max.x : clampedX;
            var clampedY = this.y < min.y ? min.y : this.y;
            clampedY = clampedY > max.y ? max.y : clampedY;
           
            return Vector2(clampedX, clampedY);
        },

        normalize: function() {
            var sum = Math.abs(this.x) + Math.abs(this.y);
            return Vector2(this.x/sum, this.y/sum);
        },

        directionTo: function(destination) {
            return Vector2(destination.x - this.x, destination.y - this.y).normalize();
        },

        toString: function() {
            return "(" + this.x + ", " + this.y + ")"; 
        }
    }
}
