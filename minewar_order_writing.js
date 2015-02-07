
/*** order writing engine  **/

var STATE_ORDERS_ACTIVE_PLAYER;

var STATE_ORDER_WRITING_PHASE;

var ACTIVE_ORDER;  //order currently being edited

var PLAYER_1_CURRENT_ORDERS = [];
var PLAYER_2_CURRENT_ORDERS = [];

var ORDER_WRITING_PHASE = {

	UNIT_SELECT : "UNIT_SELECT",
	SET_ORDER_TYPE : "SET_ORDER_TYPE",
	SET_ORDER_LOCATION :"SET_ORDER_LOCATION"

};

function initOrdersEngineButtons(){

$('#btn-select-player1').click(function() { STATE_ORDERS_ACTIVE_PLAYER = "PLAYER1";  $('#btn-select-player1').css('background-color','yellow'); $('#btn-select-player2').css('background-color','lightgray');});
$('#btn-select-player2').click(function() { STATE_ORDERS_ACTIVE_PLAYER = "PLAYER2";  $('#btn-select-player2').css('background-color','yellow');$('#btn-select-player1').css('background-color','lightgray');});

$('#btn-order-select-unit').click(function() { 
	ACTIVE_ORDER = new Order(); 
	STATE_ORDER_WRITING_PHASE = ORDER_WRITING_PHASE.UNIT_SELECT; 
	displayActiveOrder();
});

$('#btn-order-select-location').click(function() { 
	STATE_ORDER_WRITING_PHASE = ORDER_WRITING_PHASE.SET_ORDER_LOCATION; 
	displayActiveOrder();
});


$('#btn-order-move').click(function() { ACTIVE_ORDER.orderType = OrderType.MOVE;displayActiveOrder(); });
$('#btn-order-support').click(function() { ACTIVE_ORDER.orderType = OrderType.SUPPORT;displayActiveOrder(); });
$('#btn-order-hold').click(function() { ACTIVE_ORDER.orderType = OrderType.HOLD; displayActiveOrder();});
$('#btn-order-fire').click(function() { ACTIVE_ORDER.orderType = OrderType.FIRE; displayActiveOrder();});

$('#btn-order-pickupmine').click(function() { ACTIVE_ORDER.orderType = OrderType.PICKUP_MINE; displayActiveOrder();});
$('#btn-order-placemine').click(function() { ACTIVE_ORDER.orderType = OrderType.PLACE_MINE; displayActiveOrder();});
$('#btn-order-retreat').click(function() { ACTIVE_ORDER.orderType = OrderType.RETREAT_MOVE; displayActiveOrder();});


}

function displayActiveOrder(){

	$('#lbl-active-order-player').text(ACTIVE_ORDER.unit.player);
	if(ACTIVE_ORDER){
		if(ACTIVE_ORDER.unit) {$('#lbl-active-order-unit').text(ACTIVE_ORDER.unit.constructor.name + " " + ACTIVE_ORDER.unit.X + "," + ACTIVE_ORDER.unit.Y);}
		if(ACTIVE_ORDER.orderType) {$('#lbl-active-order-type').text(ACTIVE_ORDER.orderType);}
		if(ACTIVE_ORDER.orderX != undefined && ACTIVE_ORDER.orderY != undefined) {$('#lbl-active-order-loc').text(ACTIVE_ORDER.orderX + ","+ ACTIVE_ORDER.orderY);}
	}
}

function displaySavedOrders(){

	

}


function saveOrder(){

	if(ACTIVE_ORDER.player = 'PLAYER1'){
		PLAYER_1_CURRENT_ORDERS.push(ACTIVE_ORDER);
		$('#saved_orders').append('<tr id=p1order'+(PLAYER_1_CURRENT_ORDERS.length-1)+'><td>'+ACTIVE_ORDER.unit.player+'</td>'
			+'<td>'+ACTIVE_ORDER.unit.constructor.name + " " + ACTIVE_ORDER.unit.X + "," + ACTIVE_ORDER.unit.Y+'</td>'
			+'<td>'+ACTIVE_ORDER.orderType+'</td>'
			+'<td>'+ACTIVE_ORDER.orderX + ","+ ACTIVE_ORDER.orderY+'</td>'
			+'<td><input type="button" value="Delete" onclick="PLAYER_1_CURRENT_ORDERS.pop('+(PLAYER_1_CURRENT_ORDERS.length-1)+');$(\'#p1order'+(PLAYER_1_CURRENT_ORDERS.length-1)+'\').remove();" /></tr>');
	}
	
	else if(ACTIVE_ORDER.player = 'PLAYER2'){
		PLAYER_2_CURRENT_ORDERS.push(ACTIVE_ORDER);
		$('#saved_orders').append('<tr id=p2order'+(PLAYER_2_CURRENT_ORDERS.length-1)+'><td>'+ACTIVE_ORDER.unit.player+'</td>'
			+'<td>'+ACTIVE_ORDER.unit.constructor.name + " " + ACTIVE_ORDER.unit.X + "," + ACTIVE_ORDER.unit.Y+'</td>'
			+'<td>'+ACTIVE_ORDER.orderType+'</td>'
			+'<td>'+ACTIVE_ORDER.orderX + ","+ ACTIVE_ORDER.orderY+'</td>'
			+'<td><input type="button" value="Delete" onclick="PLAYER_2_CURRENT_ORDERS.pop('+(PLAYER_2_CURRENT_ORDERS.length-1)+');$(\'#p2order'+(PLAYER_2_CURRENT_ORDERS.length-1)+'\').remove();" /></tr>');
	}
	
	
	ACTIVE_ORDER = null;
	$('#lbl-active-order-unit').text("");
	$('#lbl-active-order-type').text("");
	$('#lbl-active-order-loc').text("");
	$('#lbl-active-order-player').text("");
	displayActiveOrder();
}

