// ColoredTriangle.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute float a_PointSize;\n' + // Add a point size attribute
    'attribute vec4 a_Color;\n' +
    'varying vec4 v_Color;\n' +
    'void main() {\n' +
    ' gl_Position = a_Position;\n' +
    ' gl_PointSize = 20.0;\n' +
    ' v_Color = a_Color;\n' +
    '}\n';

// Fragment shader program
var FSHADER_SOURCE =
    '#ifdef GL_ES\n' +
    'precision mediump float;\n' +
    '#endif \n' +
    'varying vec4 v_Color;\n' +
    'void main() {\n' +
    ' gl_FragColor = v_Color;\n' +
    '}\n';

function main() {
    // Retrieve <canvas> element
    var canvas = document.getElementById('webgl');

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

    //
    var n = initVertexBuffers(gl);
    if (n < 0) {
        console.log('Failed to set the vertex information');
        return;
    }

    // Specify the color for clearing <canvas>
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    // gl.lineWidth(15.0);

    // Draw the rectangle
    gl.drawArrays(gl.POINTS, 0, n);
}

// function initVertexBuffers(gl) {
//     var verticesColors = new Float32Array([
//         // Vertex coordinates and color
//         -0.5, 0.5, 1.0, 0.0, 0.0,10.0,
//         -0.5, -0.5, 0.0, 1.0, 0.0,10.0,
//         0.5, -0.5, 0.0, 0.0, 1.0,10.0,
//         0.5, 0.5, 1.0, 1.0, 0.3,10.0,
//     ]);
//     var n = 4;

//     // Create a buffer object
//     var vertexColorBuffer = gl.createBuffer();
//     if (!vertexColorBuffer) {
//         console.log('Failed to create the buffer object');
//         return false;
//     }


//     // Bind the buffer object to target
//     gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
//     gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

//     var FSIZE = verticesColors.BYTES_PER_ELEMENT;
//     //Get the storage location of a_Position, assign and enable buffer
//     var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
//     if (a_Position < 0) {
//         console.log('Failed to get the storage location of a_Position');
//         return -1;
//     }
//     gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 6, 0);
//     gl.enableVertexAttribArray(a_Position);
//     // Enable the assignment of the buffer object

//     // Get the storage location of a_Position, assign buffer and enable
//     var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
//     if (a_Color < 0) {
//         console.log('Failed to get the storage location of a_Color');
//         return -1;
//     }
//     gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 2);
//     gl.enableVertexAttribArray(a_Color);
//     // Enable the assignment of the buffer object

//     // Get the location of the a_PointSize attribute and enable it as an instanced array
//     var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
//     gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, FSIZE * 6, FSIZE * 5);
//     gl.enableVertexAttribArray(a_PointSize);

//     // Unbind the buffer object
//     gl.bindBuffer(gl.ARRAY_BUFFER, null);

//     return n;
// }

function initVertexBuffers(gl) {
    var verticesColors = [];
    var n = 5000; // Number of vertices in the circle
    var radius = 0.5; // Radius of the circle
    var centerX = 0.0; // X coordinate of the center of the circle
    var centerY = 0.0; // Y coordinate of the center of the circle

    // Generate the vertices for the circle
    for (var i = 0; i < n; i++) {
        var radians = i * Math.PI / 10;
        var x = centerX + radius * Math.cos(radians);
        var y = centerY + radius * Math.sin(radians);
        verticesColors.push(x, y);
    }

    var n = verticesColors.length / 6;

    // Create a buffer object
    var vertexColorBuffer = gl.createBuffer();
    if (!vertexColorBuffer) {
        console.log('Failed to create the buffer object');
        return false;
    }

    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesColors),gl.STATIC_DRAW);

    var FSIZE = verticesColors.BYTES_PER_ELEMENT;
    //Get the storage location of a_Position, assign and enable buffer
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return -1;
    }
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 6, 0);
    gl.enableVertexAttribArray(a_Position);
    // Enable the assignment of the buffer object

    // Get the storage location of a_Position, assign buffer and enable
    var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    if (a_Color < 0) {
        console.log('Failed to get the storage location of a_Color');
        return -1;
    }
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 2);
    gl.enableVertexAttribArray(a_Color);
    // Enable the assignment of the buffer object

    // Get the location of the a_PointSize attribute and enable it as an instanced array
    var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, FSIZE * 6, FSIZE * 5);
    gl.enableVertexAttribArray(a_PointSize);

    // Unbind the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return n;
}

