let data = {
  sketch: {
    addSharpness: -0.03,
    skyHeight: window.innerHeight / 10,
    noiseWidth: window.innerHeight / 3,
    noiseHeight: window.innerHeight,
    layerDifference: 100 + Math.random() * 10,
    layers: 12,
    barWidth: 1,
    minScale: 0.075,
    maxScale: 0.55
  }
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  colorMode(HSB, 360, 255, 255);
}

function draw() {
  noiseDetail(9, 0.5 + data.sketch.addSharpness);

  background(getColor(0));

  for (var i = 1; i < data.sketch.layers; i++) {
    var scale = exp(
      map(
        i,
        0,
        data.sketch.layers - 1,
        log(data.sketch.minScale),
        log(data.sketch.maxScale)
      )
    );
    var y =
      map(i, 0, data.sketch.layers, 0, height) * 1.7 * scale +
      data.sketch.skyHeight; // 1.7 is a quick fix

    var lightness = map(i, 0, data.sketch.layers - 1, 0, 1);
    fill(getColor(lightness));

    var xShift = 100 + frameCount * 0.01;
    for (var x = 0; x < width; x = x + data.sketch.barWidth) {
      var xCentered = x - width / 2;
      var noiseValue = noise(
        xCentered / scale / data.sketch.noiseWidth + xShift,
        i * data.sketch.layerDifference
      );
      var yMaxDifference = -data.sketch.noiseHeight / 2 * scale;
      var dy = map(noiseValue, 0, 1, -yMaxDifference, yMaxDifference);
      rect(int(x), int(y + dy), data.sketch.barWidth, height);
    }
  }
}

function getColor(lightness) {
  var gamma = exp(1.75 - lightness * 1.075); // lightness and contrast parameters
  lightness = pow(lightness, gamma) * 192 / 255; // *192/255 is a quick fix

  var hue1 = 60 + 5 * sin(frameCount * 0.12);
  var hue2 = 30 * sin(frameCount * 0.1) + 200;
  var addSaturation = 0.05;
  var addBrightness = -0.35;

  return color(
    map(lightness, 0, 1, hue1, hue2),
    map(pow(lightness, exp(-addSaturation)), 0, 1, 48, 255),
    map(pow(lightness, exp(addBrightness)), 0, 1, 255 - 16, 0)
  );
}
