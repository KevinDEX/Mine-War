
$( document ).ready(function() {


	minewar_canvas = $('#minewar-canvas')[0];
	drawingContext = minewar_canvas.getContext("2d");
	
		$(bomb_icon).on('load',function(){
			initGameboard();
			initPlacementButtons();
			initOrdersEngineButtons();
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
	
		var clickLoc = getMousePos(minewar_canvas,event);
			var hexClicked = pixel_to_hex(clickLoc.x, clickLoc.y, hex_size);
			
			var hexCenterX = gameboard[hexClicked.q][hexClicked.r].Hex.center.x;
			var hexCenterY = gameboard[hexClicked.q][hexClicked.r].Hex.center.y;
	
	
		switch(state) {
			case 'PLACE_MINE':
				gameboard[hexClicked.q][hexClicked.r].Occupants.push(new Mine(hexClicked.q,hexClicked.r,STATE_ORDERS_ACTIVE_PLAYER));
				state="";
				break;
			case 'PLACE_FLAG':
				gameboard[hexClicked.q][hexClicked.r].Occupants.push(new Flag(hexClicked.q,hexClicked.r,STATE_ORDERS_ACTIVE_PLAYER));
				state="";
				break;
			case 'PLACE_ROBOT':
				gameboard[hexClicked.q][hexClicked.r].Occupants.push(new Robot(hexClicked.q,hexClicked.r,STATE_ORDERS_ACTIVE_PLAYER));
				state="";
				break;
			case 'PLACE_SOLDIER':
				gameboard[hexClicked.q][hexClicked.r].Occupants.push(new Soldier(hexClicked.q,hexClicked.r,STATE_ORDERS_ACTIVE_PLAYER));
				state="";
				break;
		}
		
		switch(STATE_ORDER_WRITING_PHASE) {
			case ORDER_WRITING_PHASE.UNIT_SELECT:
				var robot;
				var soldier;
				robot = findPlayerUnitInHex(gameboard[hexClicked.q][hexClicked.r],STATE_ORDERS_ACTIVE_PLAYER,"Robot");
				soldier = findPlayerUnitInHex(gameboard[hexClicked.q][hexClicked.r],STATE_ORDERS_ACTIVE_PLAYER,"Soldier");
				var myUnit;
				if(soldier || robot){ myUnit = (soldier) ? soldier : robot; }
				if(myUnit) {ACTIVE_ORDER.unit = myUnit; }
				displayActiveOrder();
				STATE_ORDER_WRITING_PHASE = "";
			break;
			//case ORDER_WRITING_PHASE.SET_ORDER_TYPE:
			//		break;
			case ORDER_WRITING_PHASE.SET_ORDER_LOCATION:
				ACTIVE_ORDER.orderX = hexClicked.q;
				ACTIVE_ORDER.orderY = hexClicked.r;
				displayActiveOrder();
				STATE_ORDER_WRITING_PHASE = "";
			break;
		}
		
		//re-draw board after order
		initGameboard();
	});
	
	
	$('#btn_save_order').click(function(){saveOrder();});
	
});

function unit(player,x,y,order){

}

function Soldier(x,y,player){

	this.player;
	this.X = x;
	this.Y = y;
	//moveTo(x,y);
	//fireAt(x,y);
	//excavate();
}

function Robot(x,y,player){

	this.player;
	this.X = x;
	this.Y = y;
	//moveTo(x,y);
}

function Flag(x,y,player){

	this.player;
	this.X = x;
	this.Y = y;
}

function Mine(x,y,player){
   	this.player;
	this.X = x;
	this.Y = y;
}

var OrderType =  {
	
	MOVE : "MOVE",
	FIRE : "FIRE",
	HOLD : "HOLD",
	SUPPORT : "SUPPORT",
	RETREAT_MOVE : "RETREAT_MOVE",
	
	//stackable - secondary orders
	PICKUP_MINE : "PICKUP_MINE",
	PLACE_MINE : "PLACE_MINE"
	
	/** automatic actions **/
	/*
		
	*/
}

function OrderResult(){
	
	this.DISPLACE = "DISPLACE";
	this.BOUNCE = "BOUNCE";
	this.MOVE_SUCCESS = "MOVE_SUCCESS";
	this.HIT = "HIT";
	this.MISS = "MISS";
	this.MINE_HIT = "MINE_HIT";
	this.MINE_DEFUSE = "MINE_DEFUSE";
	this.TAKE_FLAG = "TAKE_FLAG";
	this.DROP_FLAG = "DROP_FLAG";
	this.SELF_DESTROYED = "SELF_DESTROYED";
	this.TARGET_DESTROYED = "TARGET_DESTROYED";
	this.ENEMY_DESTROYED = "TARGET_DESTROYED";
	this.FRIENDLY_DESTROYED = "TARGET_DESTROYED";
	this.FLAG_VICTORY = "FLAG_VICTORY";
}


function Order(){

   this.unit = null;
   this.orderType  = null;
   this.orderX = null;
   this.orderY = null;
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
		'-4': { '-4': null, '-3': null, '-2': null, '-1': null, '0': null, '1': null, '2': null, '3': null, '4': null, },
		'-3': { '-4': null, '-3': null, '-2': null, '-1': null, '0': null, '1': null, '2': null, '3': null, '4': null, },
		'-2': { '-4': null, '-3': null, '-2': null, '-1': null, '0': null, '1': null, '2': null, '3': null, '4': null, },
		'-1': { '-4': null, '-3': null, '-2': null, '-1': null, '0': null, '1': null, '2': null, '3': null, '4': null, },
		'0': { '-4': null, '-3': null, '-2': null, '-1': null, '0': null, '1': null, '2': null, '3': null, '4': null, },
		'1': { '-4': null, '-3': null, '-2': null, '-1': null, '0': null, '1': null, '2': null, '3': null, '4': null, },
		'2': { '-4': null, '-3': null, '-2': null, '-1': null, '0': null, '1': null, '2': null, '3': null, '4': null, },
		'3': { '-4': null, '-3': null, '-2': null, '-1': null, '0': null, '1': null, '2': null, '3': null, '4': null, },
		'4': { '-4': null, '-3': null, '-2': null, '-1': null, '0': null, '1': null, '2': null, '3': null, '4': null, }
	};


function initGameboard(){

	drawingContext.clearRect ( 0 , 0 , minewar_canvas.width, minewar_canvas.height );

	center_x = (hex_width * 9)/2;

	var offset_index = 0;
	var offset;
	
	for(var y=-4;y<=4;y++){
		for(var x=-4;x<=4;x++){

			var playerNum = 0;
			
			if(y<0){ playerNum = 1;}
			if(y>0){ playerNum = 2;}
			
			if(gameboard[x][y] == null){
				gameboard[x][y] = new GameboardHex(x,y,playerNum,null);
			}
			var p = new Point(center_x - (-x * horiz_space),(y * vert_space * -1 ) + center_y);
			gameboard[x][y].drawHex(p,hex_size,gameboard[x][y]);

		}
		center_x = center_x + (horiz_space / 2);
		}
	
	
	//state = 'PLACE_BOMB';
}

var state;

function initPlacementButtons(){
	
	$('#btn-place-mine').on('click',function(event)
		{ state = 'PLACE_MINE'});
		
	$('#btn-place-flag').on('click',function(event)
		{ state = 'PLACE_FLAG'});
		
	$('#btn-place-soldier').on('click',function(event)
		{ state = 'PLACE_SOLDIER'});
		
	$('#btn-place-robot').on('click',function(event)
		{ state = 'PLACE_ROBOT'});
}

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

function findPlayerUnitInHex(hex,player,UnitType){

	for(var curUnit in hex.Occupants){
		if(hex.Occupants[curUnit].constructor.name == UnitType){
			return hex.Occupants[curUnit];
		}
	}
	
	return null;
}

