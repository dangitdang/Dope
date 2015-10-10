var Planet = function(cX, cY, r, s, o) {
    var that = Object.create(Planet.prototype);
    var centerX = cX;
    var centerY = cY;
    var radius = r;
    var speed = s;
    var offset = o;
    var size = 80;
    var currentX = 0;
    var currentY = 0;
    var el = ellipse(centerX + radius, centerY + radius, size, size);
    var fillColor = color(0, 0, 0);

    that.update = function() {
        var milli = millis();
        currentX = radius*cos(speed * milli + offset - Math.PI/2.0) + centerX;
        currentY = radius*sin(speed * milli + offset - Math.PI/2.0) + centerY;
        fill(fillColor);
        el = ellipse(currentX, currentY, size, size);
    }

    that.contains = function(x, y) {
        return x < currentX + size && x > currentX - size
            && y < currentY + size && y > currentY - size;
    }

    that.clicked = function() {
        fillColor = color(255, 0, 0);
    }

    that.released = function() {
        fillColor = color(0, 0, 0);
    }

    var privatemethod = function() {

    }

    Object.freeze(that);
    return that;
}

var Orbit = function(centerX, centerY, radius) {
    var that = Object.create(Orbit.prototype);

    that.draw = function() {
        noFill();
        ellipse(centerX, centerY, radius, radius);
    }

    Object.freeze(that);
    return that;
}

