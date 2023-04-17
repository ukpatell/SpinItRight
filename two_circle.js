// HelloPint2.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE = 
  'attribute vec4 a_Position;\n' + // attribute variable
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  gl_PointSize = 7.0;\n' +
  '}\n'; 

// Fragment shader program
var FSHADER_SOURCE = 
  'void main() {\n' +
  '  gl_FragColor = vec4(1.3, 1.0, 0.8, 1.0);\n' +
  '}\n';

// Variables
var g_points = []; 

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


  /// Specify the color for clearing <canvas>
  gl.clearColor(0.2, 0.1, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  draw_master_circle(gl, a_Position);
  draw_child_circle(gl, a_Position);
}


function draw_master_circle(gl,a_Position) {
  const radius = 0.4;    
  var points;    

  points = 5000;    

  let stepSize = ((Math.PI*10) / points);    

  for (let d = 0; d <= (Math.PI*10)-stepSize; d += stepSize) {      

    // Get co-ord
    var x = ((Math.sin(d) * radius) + 0.0);        
    var y = ((Math.cos(d) * radius) + 0.0) - 0.4;              

    // Store to arr
    g_points.push(x);        
    g_points.push(y);        
    g_points.push(2.0);    
  }    

  // Clear <canvas>    
  gl.clear(gl.COLOR_BUFFER_BIT);    
  var len = g_points.length;    

  for(var i = 0; i < len; i += 3) {        
    // Pass the position of a point to a_Position variable        
    gl.vertexAttrib3f(a_Position, g_points[i], g_points[i+1], 0.0);        
    gl.vertexAttrib1f(10.0,g_points[i+2]);        

    // Draw        
    gl.drawArrays(gl.POINTS, 0, 1);   
  }
}
function draw_master_circle(gl, a_Position) {
  const largeRadius = 0.4;    
  const smallRadius = 0.1;
  var points = 5000;    
  var g_large_points = [];
  var g_small_points = [];

  let stepSize = ((Math.PI*10) / points);    

  for (let d = 0; d <= (Math.PI*10)-stepSize; d += stepSize) {      
    // Get large circle co-ord
    var x = ((Math.sin(d) * largeRadius) + 0.0);        
    var y = ((Math.cos(d) * largeRadius) + 0.0) - 0.4;              
    // Store to large circle arr
    g_large_points.push(x);        
    g_large_points.push(y);        
    g_large_points.push(2.0);    

    // Get small circle co-ord
    var x_small = ((Math.sin(d) * smallRadius) + 0.0);        
    var y_small = ((Math.cos(d) * smallRadius) + 0.0) - 0.4;              
    // Store to small circle arr
    g_small_points.push(x_small);        
    g_small_points.push(y_small);        
    g_small_points.push(2.0);    
  }    

  // Clear <canvas>    
  gl.clear(gl.COLOR_BUFFER_BIT);    

  // Draw large circle
  var len = g_large_points.length;    
  for(var i = 0; i < len; i += 3) {        
    gl.vertexAttrib3f(a_Position, g_large_points[i], g_large_points[i+1], 0.0);        
    gl.vertexAttrib1f(10.0,g_large_points[i+2]);        
    gl.drawArrays(gl.POINTS, 0, 1);   
  }

  // Draw small circle
  len = g_small_points.length;
  for (var i = 0; i < len; i += 3) {
    gl.vertexAttrib3f(a_Position, g_small_points[i], g_small_points[i+1], 0.0);
    gl.vertexAttrib1f(10.0,g_small_points[i+2]);        
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}