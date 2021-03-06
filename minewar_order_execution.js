/**** minewar order execution   ***/


var ORDER_EXECUTION_STATE;


function executeTurn(){

	//create a copy of the gameboard
	this.tempBoard = JSON.parse( JSON.stringify( gameboard ) );
	for(var u in player1.units){
		if(player1.units[u].constructor.name == "Mine" || player1.units[u].constructor.name == "Flag"){
			tempBoard[player1.units[u].X][player1.units[u].Y].Occupants.push(player1.units[u]);
		}
	}

	moveUnits(this.tempBoard);
	resolveCollisions(this.tempBoard);
	handleShots(this.tempBoard);
	explodeMines(this.tempBoard);
	disableMines(this.tempBoard);
	victoryCheck(this.tempBoard);
	//secondaryPhase(this.tempBoard);
	
	player1.orders = [];
	player2.orders = [];
	$('#saved_orders').find('tr').remove();
	
}


function moveUnits(tempBoard){

	//player1
	for(var curOrder in player1.orders){
		
		var myUnit = player1.orders[curOrder].unit;
	
		if(player1.orders[curOrder].orderType = OrderType.MOVE){
			//remove unit from old location
			var myUnitIndexInHexUnits = gameboard[player1.orders[curOrder].unit.X][player1.orders[curOrder].unit.Y].Occupants.indexOf(myUnit);
			tempBoard[player1.orders[curOrder].unit.X][player1.orders[curOrder].unit.Y].Occupants.splice(myUnitIndexInHexUnits,1);	
			
			//insert unit at new location
			tempBoard[player1.orders[curOrder].orderX][player1.orders[curOrder].orderY].Occupants.push(player1.orders[curOrder].unit);

		}
		else if (player1.orders[curOrder].orderType = OrderType.HOLD)
		{
			tempBoard[player1.orders[curOrder].orderX][player1.orders[curOrder].orderY].Occupants.push(player1.orders[curOrder].unit);
		}
		
		if(occupiedHexs.indexOf(tempBoard[player1.orders[curOrder].orderX][player1.orders[curOrder].orderY])  < 0 ){
			occupiedHexs.push(tempBoard[player1.orders[curOrder].orderX][player1.orders[curOrder].orderY]);
		}
		tempBoard[player1.orders[curOrder].orderX][player1.orders[curOrder].orderY].Orders.push(player1.orders[curOrder]);
	}
	
	for(var curOrder in player2.orders){
		
		var myUnit = player2.orders[curOrder].unit;
	
		if(player2.orders[curOrder].orderType = OrderType.MOVE){
			//remove unit from old location
			var myUnitIndexInHexUnits = gameboard[player2.orders[curOrder].unit.X][player2.orders[curOrder].unit.Y].Occupants.indexOf(myUnit);
			tempBoard[player2.orders[curOrder].unit.X][player2.orders[curOrder].unit.Y].Occupants.splice(myUnitIndexInHexUnits,1);	
			
			//insert unit at new location
			tempBoard[player2.orders[curOrder].orderX][player2.orders[curOrder].orderY].Occupants.push(player2.orders[curOrder].unit);

		}
		else if (player2.orders[curOrder].orderType = OrderType.HOLD)
		{
			tempBoard[player2.orders[curOrder].orderX][player2.orders[curOrder].orderY].Occupants.push(player2.orders[curOrder].unit);
		}
		
		if(occupiedHexs.indexOf(tempBoard[player2.orders[curOrder].orderX][player2.orders[curOrder].orderY])  < 0 ){
			occupiedHexs.push(tempBoard[player2.orders[curOrder].orderX][player2.orders[curOrder].orderY]);
		}
		tempBoard[player2.orders[curOrder].orderX][player2.orders[curOrder].orderY].Orders.push(player2.orders[curOrder]);
	}
		
	gameboard = tempBoard;
	initGameboard();

}

var diplacedUnits = [];
var bouncedUnitsCount = 0;
var diplacedUnitsCount = 0;

var canWriteFinalPositions = false;

function resolveCollisions(){	
	
	var initialMoveCount = occupiedHexs.length;
	for(var hex = 0; hex < occupiedHexs.length; hex++){
		runOrdersForHex(hex);
		if(hex == initialMoveCount){
			canWriteFinalPositions = true;
		}
	}
		
	gameboard = tempBoard;
	initGameboard();
	
	alert(diplacedUnits.length + " units were displaced, " + bouncedUnitsCount + " were bounced");
		
	
}


function evaluateOrdersAtHex(hexOrders){


}


function handleShots(){

}

function explodeMines(){

}

function disableMines(){

}

function victoryCheck(){

}


function OrderExecution(){
 return {

	order:null,
	baseStrength:null,
	baseSupport:null,
	calculatedStrength:null,
	orderResults : [],
	secondaryOptions : [],
	
	};
}


var OrderResult = {
	
	DISPLACE : "DISPLACE",
	BOUNCE : "BOUNCE",
	MOVE_SUCCESS : "MOVE_SUCCESS",
	HIT : "HIT",
	MISS : "MISS",
	MINE_HIT : "MINE_HIT",
	MINE_DEFUSE : "MINE_DEFUSE",
	TAKE_FLAG : "TAKE_FLAG",
	DROP_FLAG : "DROP_FLAG",
	SELF_DESTROYED : "SELF_DESTROYED",
	TARGET_DESTROYED : "TARGET_DESTROYED",
	ENEMY_DESTROYED : "TARGET_DESTROYED",
	FRIENDLY_DESTROYED : "TARGET_DESTROYED",
	FLAG_VICTORY : "FLAG_VICTORY"
}

var OrderExecState = {

	WRITE_PRIMARY : "WRITE_PRIMARY",
	CALC_MOVES : "CALC_MOVES",
	RESOLVE_MOVES : "RESOLVE_MOVES",
	MAKE_SHOTS : "MAKE_SHOTS",
	EXPLODE_MINES : "EXPLODE_MINES",
	REMOVE_MINES : "REMOVE_MINES",
	VICTORY_CHECK : "VICTORY_CHECK",
	WRITE_SECONDARY : "WRITE_SECONDARY",
	CALC_SECONDARY : "CALC_SECONDARY",
	RESOLVE_SECONDARY : "RESOLVE_SECONDARY",
	END_TURN : "END_TURN"

}