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
    planets = [Planet(centerX, centerY, 125, .002, 0),
              Planet(centerX, centerY, 250, .002, 0),
              Planet(centerX, centerY, 250, .002, Math.PI/4)];

    //for (var x = 0; x < 2; x++)
    //  addPlanet("https://d34x6xks9kc6p2.cloudfront.net/b9af100a-5da2-4841-a6ea-f5408a207660/b9af100a-5da2-4841-a6ea-f5408a207660.mp3");

    track = Track(100, {path:'https://d34x6xks9kc6p2.cloudfront.net/5791ecac-505b-4e53-901c-eab2e2b3f5a6/5791ecac-505b-4e53-901c-eab2e2b3f5a6.mp3'},
        function() {
            planets[0].setTrack(track);
            planets[0].start();
        });
    track2 = Track(100, {path:"https://d34x6xks9kc6p2.cloudfront.net/b9af100a-5da2-4841-a6ea-f5408a207660/b9af100a-5da2-4841-a6ea-f5408a207660.mp3"},
        function() {
            planets[1].setTrack(track2);
            planets[1].start();
        });
    track3 = Track(100, {path:"https://d34x6xks9kc6p2.cloudfront.net/b9af100a-5da2-4841-a6ea-f5408a207660/b9af100a-5da2-4841-a6ea-f5408a207660.mp3"},
        function() {
            planets[2].setTrack(track3);
            planets[2].start();
        });

    var heldPlanet = null;
}

function addPlanet(p) {
  planet = Planet(centerX, centerY, 125, .002, 0)
  tr = Track(100, {path:p},
        function() {
            planet.setTrack(tr);
            planet.start();
        });
  planets.push(planet);
}

function draw() {
  clear();
  var speed = 0.002;

  noFill();

  // Draw planets and orbits
   for (var i = 0; i < planets.length; i++) {
        planets[i].update();
    }

    for (var i = 0; i < orbits.length; i++) {
        orbits[i].draw();
    }
}

function mousePressed() {
    for (var i = 0; i < planets.length; i++) {
        if (planets[i].contains(mouseX, mouseY)) {
            planets[i].clicked();
            heldPlanet = planets[i];
        }
    }
}

function mouseReleased() {
    orbits.forEach(function(orbit){
      if (heldPlanet && orbit.isNear(mouseX, mouseY)){
          // Get planet ready to orbit new radius
          heldPlanet.setRadius(orbit.getRadius());
          heldPlanet.setOrbiting(true);
          theta = orbit.getAngle(mouseX, mouseY);

          // What snap-theta is closest?
          var numTheta = Math.round(theta / (Math.PI / 4));
          console.log(numTheta);
          console.log(theta);

          //heldPlanet.setOffset(theta);
          heldPlanet.setLockedOffset(numTheta);
          heldPlanet = null;
        }
    })

}

function mouseDragged() {
  heldPlanet.dragged();
  orbits.forEach(function(orbit) {
    if (heldPlanet && orbit.isNear(mouseX, mouseY))
      orbit.setHover(true);
    else
      orbit.setHover(false);
  })
}

function mouseMoved() {
}
