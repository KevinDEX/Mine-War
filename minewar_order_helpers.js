/*  Mine War - Order Handling Helpers   */

var occupiedHexs = [];
var orderResults = [];

function initOrdersByHexQueue(hex){
	
	//for(var hex in occupiedHexs){
		
		var currentHexOrdersExec = [];
	
		for(var curOrder in occupiedHexs[hex].Orders){
			var curOrderExec = new OrderExecution();
			curOrderExec.order = occupiedHexs[hex].Orders[curOrder];
			
			if(curOrderExec.order.unit.constructor.name == "Soldier"){
				curOrderExec.calculatedStrength = 1;
			}
			else if(curOrderExec.order.unit.constructor.name == "Robot"){
				curOrderExec.calculatedStrength = 2;
			}
			
			orderResults.push(curOrderExec);
			currentHexOrdersExec.push(curOrderExec);
		}
	//}
	
	
	return currentHexOrdersExec;
}

function runOrdersForHex(hex){

	currentHexOrders = initOrdersByHexQueue(hex);

	var winner;
		
		if(currentHexOrders.length > 1){
		
			for(var battleOrders = 0; battleOrders < currentHexOrders.length - 1;battleOrders++){
				//if(battleOrders < currentHexOrders.length-1){
					if(currentHexOrders[battleOrders].calculatedStrength > currentHexOrders[battleOrders+1].calculatedStrength){
						//winner = currentHexOrders[battleOrders].order.unit;
						
						// can't write order yet.  Give new hold order for won hex
						//currentHexOrders[battleOrders].order.unit.X = currentHexOrders[battleOrders].order.orderX;
						//currentHexOrders[battleOrders].order.unit.Y = currentHexOrders[battleOrders].order.orderY;
						//writePostHexResolveHoldOrder(currentHexOrders[battleOrders].order.unit,currentHexOrders[battleOrders].order.orderX,currentHexOrders[battleOrders].order.orderY);
						if( occupiedHexs.indexOf(tempBoard[currentHexOrders[battleOrders].order.orderX][currentHexOrders[battleOrders].order.orderY]) < 0 || 
							occupiedHexs.indexOf(tempBoard[currentHexOrders[battleOrders].order.orderX][currentHexOrders[battleOrders].order.orderY]) == hex){
							
							occupiedHexs.push(tempBoard[currentHexOrders[battleOrders].order.orderX][currentHexOrders[battleOrders].order.orderY]);
						}
						console.log(JSON.stringify(currentHexOrders[battleOrders]) + "succeeds");
						
						var displacedUnit = currentHexOrders[battleOrders+1].order.unit
						var losingOrder = currentHexOrders[battleOrders+1].order;
						
						
						if(displacedUnit.X == losingOrder.orderX && displacedUnit.Y == losingOrder.orderY){
							diplacedUnits.push(currentHexOrders[battleOrders + 1].order.unit);
						}
						else{
							//bounce unit to old hex
							var unitToBounce = currentHexOrders[battleOrders+1].order.unit;
							var hexToBounceTo = tempBoard[currentHexOrders[battleOrders+1].order.unit.X][currentHexOrders[battleOrders+1].order.unit.Y];
							hexToBounceTo.Occupants.push(currentHexOrders[battleOrders+1].order.unit);
							//remove the failed order  
							//currentHexOrders.splice(battleOrders+1,1);
							//removeFailedOrderFromHex(unitToBounce.order,occupiedHexs[hex]);
							//create a new hold order at the old location and add to that hex's orders queue.  add the modified hex to "occupiedHexes" - if not there.
							/*var newHoldOrder = new Order();
							newHoldOrder.unit = unitToBounce;
							newHoldOrder.orderX = unitToBounce.X;
							newHoldOrder.orderY = unitToBounce.Y;
							newHoldOrder.orderType = OrderType.HOLD;
							hexToBounceTo.Orders.push(newHoldOrder);
							if( occupiedHexs.indexOf(hexToBounceTo) < 0 ){
								occupiedHexs.push(hexToBounceTo);
							}*/
							writePostHexResolveHoldOrder(unitToBounce,unitToBounce.X,unitToBounce.Y);
							console.log(JSON.stringify(currentHexOrders[battleOrders+1]) + "fails");
						}
						
						//diplacedUnits.push(currentHexOrders[battleOrders + 1].order.unit);
						//tempBoard[currentHexOrders[battleOrders+1].order.unit.X][currentHexOrders[battleOrders+1].order.unit.Y].Occupants.push(currentHexOrders[battleOrders+1].order.unit);
						var unitIndex = occupiedHexs[hex].Occupants.indexOf(currentHexOrders[battleOrders + 1].order.unit);
						occupiedHexs[hex].Occupants.splice(unitIndex,1);
						removeFailedOrderFromHex(displacedUnit.order,occupiedHexs[hex]);
						
						diplacedUnitsCount++;
					}
					else if (currentHexOrders[battleOrders].calculatedStrength == currentHexOrders[battleOrders+1].calculatedStrength)
					{
						//bounce both units
						tempBoard[currentHexOrders[battleOrders].order.unit.X][currentHexOrders[battleOrders].order.unit.Y].Occupants.push(currentHexOrders[battleOrders].order.unit);
						tempBoard[currentHexOrders[battleOrders+1].order.unit.X][currentHexOrders[battleOrders+1].order.unit.Y].Occupants.push(currentHexOrders[battleOrders+1].order.unit);
						var unit1Index = occupiedHexs[hex].Occupants.indexOf(currentHexOrders[battleOrders].order.unit);
						occupiedHexs[hex].Occupants.splice(unit2Index,1);
						var unit2Index = occupiedHexs[hex].Occupants.indexOf(currentHexOrders[battleOrders].order.unit);
						occupiedHexs[hex].Occupants.splice(unit1Index,1);
						
						//remove failed orders
						//var hexToBounceTo = tempBoard[currentHexOrders[battleOrders].order.unit.X][currentHexOrders[battleOrders].order.unit.Y];
						//var hexToBounceTo2 = tempBoard[currentHexOrders[battleOrders+1].order.unit.X][currentHexOrders[battleOrders+1].order.unit.Y];
						var unitToBounce = currentHexOrders[battleOrders].order.unit;
						var unitToBounce2 = currentHexOrders[battleOrders+1].order.unit;
						//currentHexOrders.splice(battleOrders+1,1);
						//currentHexOrders.splice(battleOrders,1);
						removeFailedOrderFromHex(unitToBounce.order,occupiedHexs[hex]);
						removeFailedOrderFromHex(unitToBounce2.order,occupiedHexs[hex]);
						writePostHexResolveHoldOrder(unitToBounce,unitToBounce.X,unitToBounce.Y);
						writePostHexResolveHoldOrder(unitToBounce2,unitToBounce2.X,unitToBounce2.Y);
						// create new hold orders
						/*var newHoldOrder = new Order();
							newHoldOrder.unit = unitToBounce;
							newHoldOrder.orderX = unitToBounce.X;
							newHoldOrder.orderY = unitToBounce.Y;
							newHoldOrder.orderType = OrderType.HOLD;
							hexToBounceTo.Orders.push(newHoldOrder);
							if( occupiedHexs.indexOf(hexToBounceTo) < 0 ){
								occupiedHexs.push(hexToBounceTo);
							}
						
						
						var newHoldOrder2 = new Order();
							newHoldOrder2.unit = unitToBounce2;
							newHoldOrder2.orderX = unitToBounce2.X;
							newHoldOrder2.orderY = unitToBounce2.Y;
							newHoldOrder2.orderType = OrderType.HOLD;
							hexToBounceTo2.Orders.push(newHoldOrder2);
							if( occupiedHexs.indexOf(hexToBounceTo2) < 0 ){
								occupiedHexs.push(hexToBounceTo2);
							}*/
						
						bouncedUnitsCount = bouncedUnitsCount + 2;
						
						console.log(JSON.stringify(currentHexOrders[battleOrders]) + "fails");
						console.log(JSON.stringify(currentHexOrders[battleOrders+1]) + "fails");
					}
					else{
						//can't move fully yet, write hold order
						//currentHexOrders[battleOrders + 1].order.unit.X = currentHexOrders[battleOrders].order.orderX;
						//currentHexOrders[battleOrders + 1].order.unit.Y = currentHexOrders[battleOrders].order.orderY;
						//writePostHexResolveHoldOrder(currentHexOrders[battleOrders].order.unit,currentHexOrders[battleOrders].order.orderX,currentHexOrders[battleOrders].order.orderY);
						if( occupiedHexs.indexOf(tempBoard[currentHexOrders[battleOrders+1].order.orderX][currentHexOrders[battleOrders+1].order.orderY]) < 0 ||
							occupiedHexs.indexOf(tempBoard[currentHexOrders[battleOrders+1].order.orderX][currentHexOrders[battleOrders+1].order.orderY]) == hex){
							
							occupiedHexs.push(tempBoard[currentHexOrders[battleOrders+1].order.orderX][currentHexOrders[battleOrders+1].order.orderY]);
						}
						console.log(JSON.stringify(currentHexOrders[battleOrders+1]) + "succeeds");
						
						var displacedUnit = currentHexOrders[battleOrders].order.unit
						var losingOrder = currentHexOrders[battleOrders].order;
						
						
						if(displacedUnit.X == losingOrder.orderX && displacedUnit.Y == losingOrder.orderY){
							diplacedUnits.push(currentHexOrders[battleOrders].order.unit);
						}
						else{
							//tempBoard[currentHexOrders[battleOrders].order.unit.X][currentHexOrders[battleOrders].order.unit.Y].Occupants.push(currentHexOrders[battleOrders].order.unit);
							//bounce unit to old hex
							var unitToBounce = currentHexOrders[battleOrders].order.unit;
							var hexToBounceTo = tempBoard[currentHexOrders[battleOrders].order.unit.X][currentHexOrders[battleOrders].order.unit.Y];
							hexToBounceTo.Occupants.push(currentHexOrders[battleOrders].order.unit);
							//remove the failed order
							//currentHexOrders.splice(battleOrders,1);
							//removeFailedOrderFromHex(unitToBounce.order,occupiedHexs[hex]);
							//create a new hold order at the old location and add to that hex's orders queue.  add the modified hex to "occupiedHexes" - if not there.
							writePostHexResolveHoldOrder(unitToBounce,unitToBounce.X,unitToBounce.Y);
							console.log(JSON.stringify(currentHexOrders[battleOrders]) + "fails");
						}
						
						var unitIndex = occupiedHexs[hex].Occupants.indexOf(currentHexOrders[battleOrders].order.unit);
						occupiedHexs[hex].Occupants.splice(unitIndex,1);
						removeFailedOrderFromHex(displacedUnit.order,occupiedHexs[hex]);
						
						diplacedUnitsCount++;
					}

				//}
				
			}	
		}
		else {
			//we only write new locations when there are only hold orders are left in queue
			if(canWriteFinalPositions){
				currentHexOrders[0].order.unit.x = currentHexOrders[0].order.orderX;
				currentHexOrders[0].order.unit.Y = currentHexOrders[0].order.orderY;
				console.log(JSON.stringify(currentHexOrders[0]) + "SUCCEEDS AND WRITTEN");
			}
			else{
				//writePostHexResolveHoldOrder(currentHexOrders[0].order.unit,currentHexOrders[0].order.orderX,currentHexOrders[0].order.orderY);
				occupiedHexs.push(tempBoard[currentHexOrders[0].order.orderX][currentHexOrders[0].order.orderY]);
				console.log(JSON.stringify(currentHexOrders[0]) + "PENDING");
			}
		}		
		
		occupiedHexs[hex] = null;
	

}


function writePostHexResolveHoldOrder(unit,x,y){

	var hexToHold = tempBoard[x][y];
	var newHoldOrder = new Order();
	newHoldOrder.unit = unit;
	newHoldOrder.orderX = x;
	newHoldOrder.orderY = y;
	newHoldOrder.orderType = OrderType.HOLD;
	hexToHold.Orders.push(newHoldOrder);
	if( occupiedHexs.indexOf(hexToHold) < 0 ){
		occupiedHexs.push(hexToHold);
	}
}

function removeFailedOrderFromHex(order,hex){

	var orderIndex = hex.Orders.indexOf(order);
	hex.Orders.splice(orderIndex,1);
}


