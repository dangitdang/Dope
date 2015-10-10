var Planet = function(cX, cY, r, s, o) {
    var that = Object.create(Planet.prototype);
    var centerX = cX;
    var centerY = cY;
    var radius = r;
    var mainSpeed = s;
    var speed = 0;
    var offset = o;
    var size = 80;
    var currentX = 0;
    var currentY = 0;
    var el = ellipse(centerX + radius, centerY + radius, size, size);
    var fillColor = color(0, 0, 0);
    var curTrack;
    var lastX = 0;

    that.update = function() {
        var milli = millis();
        lastX = currentX;
        currentX = radius*cos(speed * milli + offset - Math.PI/2.0) + centerX;
        currentY = radius*sin(speed * milli + offset - Math.PI/2.0) + centerY;
        fill(fillColor);
        el = ellipse(currentX, currentY, size, size);

        theta = (speed * milli + offset) % 2*Math.PI;

        var xDiff = abs(currentX - centerX);
        if ( lastX < centerX && currentX >= centerX && currentY < centerY
         && curTrack) {
            console.log(theta);
            console.log('playing track');
            curTrack.play();
        }
    }

    that.contains = function(x, y) {
        return x < currentX + size && x > currentX - size
            && y < currentY + size && y > currentY - size;
    }

    that.start = function() {
        speed = mainSpeed;
    }

    that.clicked = function() {
        fillColor = color(255, 0, 0);
    }

    that.released = function() {
        fillColor = color(0, 0, 0);
    }

    var privatemethod = function() {

    }
    that.setTrack = function(track){
        console.log("track set");
        curTrack = track;
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

