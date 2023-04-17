// // HelloPint2.js (c) 2012 matsuda
// // Vertex shader program
var VSHADER_SOURCE = 
  'attribute vec4 a_Position;\n' + // attribute variable
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  gl_PointSize = 20.0;\n' +
  '}\n'; 

// Fragment shader program
var FSHADER_SOURCE = 
  'void main() {\n' +
  '  gl_FragColor = vec4(1.3, 1.0, 0.8, 1.0);\n' +
  '}\n';

  
// Variables
var g_points = [];
var moving_point = [];
var angle = 0;
var stepSize;

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('game');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Get the storage location of a_Position
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Set up circle and moving point
  draw_master_circle(gl, a_Position);
  stepSize = ((Math.PI * 2) / g_points.length);
  moving_point = [g_points[0], g_points[1]];

  // Specify the color for clearing <canvas>
  gl.clearColor(0.2, 0.1, 0.0, 1.0);

  // Draw the scene repeatedly
  setInterval(function() {
    draw_scene(gl, a_Position);
    update_moving_point();
  }); // 60 fps
}

function draw_master_circle(gl, a_Position) {
  const radius = 0.5;
  const points = 10000;

  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2;
    const x = Math.sin(angle) * radius;
    const y = Math.cos(angle) * radius-0.20;

    g_points.push(x, y);
  }
}

function draw_scene(gl, a_Position) {
  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw circle
  const len = g_points.length;
  // for (let i = 0; i < len; i += 2) {
  //   gl.vertexAttrib4f(a_Position, g_points[i], g_points[i + 1], 0.0,1.0);
  //   gl.drawArrays(gl.POINTS, 0, 1);
  // }


  // Draw moving point
  gl.vertexAttrib4f(a_Position, moving_point[0], moving_point[1], 0.0,1.0);
  gl.drawArrays(gl.POINTS, 0, 1);
}

function update_moving_point() {
  angle += stepSize;
  const index = Math.floor(angle * (g_points.length / (Math.PI * 2)));
  moving_point = [g_points[index * 2], g_points[index * 2 + 1]];
} 