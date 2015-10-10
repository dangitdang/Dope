var centerX;
var centerY;
var radius;
var planet;

function setup() {
  // uncomment this line to make the canvas the full size of the window
   createCanvas(windowWidth, windowHeight);
   centerX = 350;
   centerY = 400;
    radius = 150;

    orbits = [Orbit(centerX, centerY, 250), Orbit(centerX, centerY, 500)];
    planets = [Planet(centerX, centerY, 125, .001, 0), Planet(centerX, centerY, 250, .002, Math.PI)];

    // track = Track(100, {path:'https://d34x6xks9kc6p2.cloudfront.net/85eac288-b659-4d8e-b2ba-67ad5def2458/85eac288-b659-4d8e-b2ba-67ad5def2458.mp3'},
    //     function() {
    //         planets[0].setTrack(track);
    //         planets[0].start();
    //     });
    // track2 = Track(100, {path:"https://d34x6xks9kc6p2.cloudfront.net/85eac288-b659-4d8e-b2ba-67ad5def2458/85eac288-b659-4d8e-b2ba-67ad5def2458.mp3"},
    //     function() {
    //         planets[1].setTrack(track2);
    //         planets[1].start();
    //     });



}

function draw() {
  clear();
  var speed = 0.002;

  noFill();

  // Draw planets and orbits
   for (var i = 0; i < planets.length; i++) {
        orbits[i].draw();
        planets[i].update();
    }
}

function mousePressed() {
    for (var i = 0; i < planets.length; i++) {
        if (planets[i].contains(mouseX, mouseY)) {
                planets[i].clicked();
        }
    }
}

function mouseReleased() {
    for (var i = 0; i < planets.length; i++) {
        planets[i].released();
    }
}
