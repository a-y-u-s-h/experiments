var gl;
var shaderProgram;
var vertices;
var x;
let width;
let height;
initGL();
createShaders();
createVertices();
draw();

function initGL() {
  let canvas = document.getElementById("canvas");
  gl = canvas.getContext("webgl");
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1, 1, 1, 1);
}

function createShaders() {

  let vertex_shader_source = `

  attribute vec4 coords;
  attribute float pointSize;

  void main (void) {
    gl_Position = vec4(coords);
    gl_PointSize = pointSize;
  }
  `;

  let vertex_shader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertex_shader, vertex_shader_source);
  gl.compileShader(vertex_shader);
  let fragment_shader_source = `
  precision mediump float;
  uniform vec4 color;
    void main (void) {
      gl_FragColor = color;
    }
  `;

  let fragment_shader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragment_shader, fragment_shader_source);
  gl.compileShader(fragment_shader);

  shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertex_shader);
  gl.attachShader(shaderProgram, fragment_shader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);
}

function draw() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, 1);
}

function createVertices () {

  vertices = [
  -0.9, -0.9, 0.0,
  0.9, -0.9, 0.0,
  0.0, 0.9, 0.0
  ];

  var buffer = gl.createBuffer();
  gl.bindbuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new float32Array(vertices), gl.STATIC_DRAW);

  var coords = gl.getAttribLocation(shaderProgram, "coords");
  var pointSize = gl.getAttribLocation(shaderProgram, "pointSize");
  gl.vertexAttrib1f(pointSize, 10);

  var color = gl.getUniformLocation(shaderProgram, "color");
  gl.uniform4f(color, 0.2, 0.3, 0.1, 1);
}


