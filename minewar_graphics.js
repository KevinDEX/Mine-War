
var minewar_canvas;
var drawingContext;

var hex_size = 20;
var hex_height = hex_size * 2;
var hex_width = Math.sqrt(3)/2 * hex_height;

//var center_x = (hex_width * 4) + (hex_width * 9)/2;
var center_x = (hex_width * 9)/2;
var center_y = (hex_height * 3.5);

var horiz_space = hex_width;
var vert_space = hex_height * 3/4;

var bomb_icon = new Image();
bomb_icon.src = "img/bomb.png";

function mwg_drawHex(center,size, gameboardHex){

var points = new Array(
	new hex_corner(center,size,0),
	new hex_corner(center,size,1),
	new hex_corner(center,size,2),
	new hex_corner(center,size,3),
	new hex_corner(center,size,4),
	new hex_corner(center,size,5));
	
	
	drawingContext.beginPath();
	
	if(gameboardHex.Visibility == 1){
		drawingContext.fillStyle='forestgreen';
	}
	else if (gameboardHex.Visibility == 2){
		drawingContext.fillStyle='firebrick';
	}
	else if (gameboardHex.Visibility == 0){
		drawingContext.fillStyle='dimgrey';
	}
	
	drawingContext.moveTo(points[0].x,points[0].y);
	for(var i=0;i<5;i++){
		drawingContext.lineTo(points[i+1].x,points[i+1].y);
	}
	drawingContext.lineTo(points[0].x,points[0].y);
	drawingContext.closePath();
	drawingContext.fill();
	drawingContext.stroke();

	gameboardHex.Hex = new Hex(center.x,center.y,center);
	//drawingContext.drawImage(bomb_icon,center.x-(hex_size/2),center.y-(hex_size/2),hex_size,hex_size);

}

function Point(X,Y){

    this.x = X;
	this.y = Y;
}

function hex_corner(center, size, i){

    this.angle = 2 * Math.PI / 6 * (i + 0.5);
	this.p = new Point(center.x + size * Math.cos(this.angle),
                 center.y + size * Math.sin(this.angle))
				 
    return this.p;
}

function pixel_to_hex(x, y, size){
	
	r = (y * 2/3 / size) * -1;
	
	y = y - (hex_width/2);
	
    q = ((x * Math.sqrt(3)/3 - y / 3) / size) + (3 - r-1);

	
    return hex_round(new Hex(q, r))
	
}


function Cube(x,y,z){
   this.x = x;
   this.y = y
   this.z = z;
}

function Hex(q,r,center){
   this.center = center;
   this.q = q;
   this.r = r
}

function cube_round(h){
    var rx = Math.round(h.x)
    var ry = Math.round(h.y)
    var rz = Math.round(h.z)

    var x_diff = Math.abs(rx - h.x)
    var y_diff = Math.abs(ry - h.y)
    var z_diff = Math.abs(rz - h.z)

    if ( (x_diff > y_diff) && (x_diff > z_diff) )
	{
        rx = -ry-rz;
	}
    else if (y_diff > z_diff)
        ry = -rx-rz;
    else{
        rz = -rx-ry;
	}

    return new Cube(rx, ry, rz)
}

function cube_to_hex(h){
    var q = h.x
    var r = h.z
    return new Hex(q, r)
}

function hex_to_cube(h){
    var x = h.q
    var z = h.r
    var y = -x-z
    return new Cube(x, y, z)
}

function hex_round(h){
    return cube_to_hex(cube_round(hex_to_cube(h)))
}


function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left - center_x,
          y: evt.clientY - rect.top - center_y
        };
}
