let sliders = [];

function setup() {
  noCanvas();

  for (var i = 0, upperLimit_i = 270; i < upperLimit_i; i += 1) {
    sliders[i] = createSlider(0, 100, 50);
    sliders[i].addClass("hf_range hf_range--medium");
  }
}

function draw() {
  for (var i = 0, upperLimit_i = sliders.length; i < upperLimit_i; i += 1) {
    sliders[i].value(50 + 50 * sin(frameCount * 0.1 + i * 0.01 + frameCount * 0.0001 * i));
  }
}
