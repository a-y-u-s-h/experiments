let data = {
  sketch: {
    background: "#FFFFFF34"
  }
};

let cursor;
let loading = true;
let locations = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  cursor = loadImage("assets/media/img/95.png", loaded);
}

function loaded() {
  loading = false;
}

function draw() {
  background(data.sketch.background);
  if (!loading) {
    let speed = abs(mouseX - pmouseX) + abs(mouseY - pmouseY);
    image(cursor, mouseX, mouseY, 14, 21);

    for (var i = 0, upperLimit_i = locations.length; i < upperLimit_i; i += 1) {
      if (i < locations.length - 1) {
        locations[i].x = lerp(locations[i].x, locations[i + 1].x, 0.3);
        locations[i].y = lerp(locations[i].y, locations[i + 1].y, 0.5);
      } else {
        locations[i].x = lerp(locations[i].x, mouseX, 0.3);
        locations[i].y = lerp(locations[i].y, mouseY, 0.5);
      }

      image(cursor, locations[i].x, locations[i].y, 14, 21);
    }

    if (frameCount % 15 == 0) {
      locations.splice(0, 1);
    }

    if (speed > 10) {
      locations.push(new p5.Vector(mouseX, mouseY));
    }

    if (locations.length > 300) {
      locations.splice(0, 1);
    }
  }
}
