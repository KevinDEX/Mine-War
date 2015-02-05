
$( document ).ready(function() {


	minewar_canvas = $('#minewar-canvas')[0];
	drawingContext = minewar_canvas.getContext("2d");
	
		$(bomb_icon).on('load',function(){
			initGameboard();
		});

	
	$(document).on('mousemove', function(event){
	
		var mousePos = getMousePos(minewar_canvas,event);
		var hexVal = pixel_to_hex(mousePos.x, mousePos.y, hex_size);
		
		$('#mouse-over-hex-label').text(hexVal.q + "," + hexVal.r);
		
		$('#mouse-x-label').text(mousePos.x);
		$('#mouse-y-label').text(mousePos.y);
		
		$('#center-x-coord-label').text(center_x);
		$('#center-y-coord-label').text(center_y);
	});
	
	$(minewar_canvas).on('click',function(event){
	
		if(state == 'PLACE_BOMB_1'){
			var clickLoc = getMousePos(minewar_canvas,event);
			var hexClicked = pixel_to_hex(clickLoc.x, clickLoc.y, hex_size);
			
			var hexCenterX = gameboard[hexClicked.q][hexClicked.r].Hex.center.x;
			var hexCenterY = gameboard[hexClicked.q][hexClicked.r].Hex.center.y;
			
			drawingContext.drawImage(bomb_icon,hexCenterX-(hex_size/2),hexCenterY-(hex_size/2),hex_size,hex_size);
		}
	});
	
});

function unit(player,x,y,order){

}

function Soldier(x,y){
	moveTo(x,y);
	fireAt(x,y);
	excavate();
}

function Robot(x,y){
	moveTo(x,y);
}

function Flag(x,y){

}

function Mine(x,y){
   
}


function order(){

   var orderType;
   var orderX;
   var orderY;
}


function executeTurn(){
	moveUnits();
	resolveCollisions();
	handleShots();
	explodeMines();
	disableMines();
	victoryCheck();
}

function moveUnits(){

}

function resolveCollisions(){

}

function handleShots(){

}

function explodeMines(){

}

function disableMines(){

}

function victoryCheck(){

}


function GameboardHex(x,y,visible,occupant){

this.X = x;
this.Y = y;
this.Visibility =  visible;
this.Occupants = [];
this.Hex;

this.drawHex = mwg_drawHex;

}



var gameboard = 
	{ 
		'-4': { '-4': {}, '-3': {}, '-2': {}, '-1': {}, '0': {}, '1': {}, '2': {}, '3': {}, '4': {}, },
		'-3': { '-4': {}, '-3': {}, '-2': {}, '-1': {}, '0': {}, '1': {}, '2': {}, '3': {}, '4': {}, },
		'-2': { '-4': {}, '-3': {}, '-2': {}, '-1': {}, '0': {}, '1': {}, '2': {}, '3': {}, '4': {}, },
		'-1': { '-4': {}, '-3': {}, '-2': {}, '-1': {}, '0': {}, '1': {}, '2': {}, '3': {}, '4': {}, },
		'0': { '-4': {}, '-3': {}, '-2': {}, '-1': {}, '0': {}, '1': {}, '2': {}, '3': {}, '4': {}, },
		'1': { '-4': {}, '-3': {}, '-2': {}, '-1': {}, '0': {}, '1': {}, '2': {}, '3': {}, '4': {}, },
		'2': { '-4': {}, '-3': {}, '-2': {}, '-1': {}, '0': {}, '1': {}, '2': {}, '3': {}, '4': {}, },
		'3': { '-4': {}, '-3': {}, '-2': {}, '-1': {}, '0': {}, '1': {}, '2': {}, '3': {}, '4': {}, },
		'4': { '-4': {}, '-3': {}, '-2': {}, '-1': {}, '0': {}, '1': {}, '2': {}, '3': {}, '4': {}, }
	};


function initGameboard(){

	var offset_index = 0;
	var offset;
	
	for(var y=-4;y<=4;y++){
		for(var x=-4;x<=4;x++){

			var playerNum = 0;
			
			if(y<0){ playerNum = 1;}
			if(y>0){ playerNum = 2;}
			
			gameboard[x][y] = new GameboardHex(x,y,playerNum,null);
			var p = new Point(center_x - (-x * horiz_space),(y * vert_space * -1 ) + center_y);
			gameboard[x][y].drawHex(p,hex_size,gameboard[x][y]);

		}
		center_x = center_x + (horiz_space / 2);
		}
	
	
	state = 'PLACE_BOMB_1';
}

var state;
/*

player1 - place flag;
player2 - place flag;

player1 - place 1st mine;
player1 - place 2nd mine;
player1 - place 3rd mine;

player2 - place 1st mine;
player2 - place 2nd mine;
player2 - place 3rd mine;

player1 - place soldier;
player2 - place soldier;

player1 - define moves;
player2 - define moves;

*/


function player(){

  var playerNum;
  var units = [];
  
}
