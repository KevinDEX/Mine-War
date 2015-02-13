/*  Mine War - Order Handling Helpers   */

var occupiedHexs = [];
var orderResults = [];

function initOrdersByHexQueue(hex){
		
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
	
	return currentHexOrdersExec;
}

function runOrdersForHex(hex){

	currentHexOrders = initOrdersByHexQueue(hex);

	var winner;
		
		if(currentHexOrders.length > 1){
		
			for(var battleOrders = 0; battleOrders < currentHexOrders.length - 1;battleOrders++){
					if(currentHexOrders[battleOrders].calculatedStrength > currentHexOrders[battleOrders+1].calculatedStrength){
						
						// can't write order yet.  Give new hold order for won hex
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
							//create a new hold order at the old location and add to that hex's orders queue.  add the modified hex to "occupiedHexes" - if not there.
							writePostHexResolveHoldOrder(unitToBounce,unitToBounce.X,unitToBounce.Y);
							console.log(JSON.stringify(currentHexOrders[battleOrders+1]) + "fails");
						}
						
						var unitIndex = occupiedHexs[hex].Occupants.indexOf(currentHexOrders[battleOrders + 1].order.unit);
						occupiedHexs[hex].Occupants.splice(unitIndex,1);
						//remove failed orders	
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
						
						var unitToBounce = currentHexOrders[battleOrders].order.unit;
						var unitToBounce2 = currentHexOrders[battleOrders+1].order.unit;
						//remove failed orders	
						removeFailedOrderFromHex(unitToBounce.order,occupiedHexs[hex]);
						removeFailedOrderFromHex(unitToBounce2.order,occupiedHexs[hex]);
						//create a new hold order at the old location and add to that hex's orders queue.  add the modified hex to "occupiedHexes" - if not there.
						writePostHexResolveHoldOrder(unitToBounce,unitToBounce.X,unitToBounce.Y);
						writePostHexResolveHoldOrder(unitToBounce2,unitToBounce2.X,unitToBounce2.Y);
						
						
						bouncedUnitsCount = bouncedUnitsCount + 2;
						
						console.log(JSON.stringify(currentHexOrders[battleOrders]) + "fails");
						console.log(JSON.stringify(currentHexOrders[battleOrders+1]) + "fails");
					}
					else{
						//can't move fully yet, write hold order
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
							//bounce unit to old hex
							var unitToBounce = currentHexOrders[battleOrders].order.unit;
							var hexToBounceTo = tempBoard[currentHexOrders[battleOrders].order.unit.X][currentHexOrders[battleOrders].order.unit.Y];
							hexToBounceTo.Occupants.push(currentHexOrders[battleOrders].order.unit);
							//create a new hold order at the old location and add to that hex's orders queue.  add the modified hex to "occupiedHexes" - if not there.
							writePostHexResolveHoldOrder(unitToBounce,unitToBounce.X,unitToBounce.Y);
							console.log(JSON.stringify(currentHexOrders[battleOrders]) + "fails");
						}
						
						var unitIndex = occupiedHexs[hex].Occupants.indexOf(currentHexOrders[battleOrders].order.unit);
						occupiedHexs[hex].Occupants.splice(unitIndex,1);
						//remove the failed order
						removeFailedOrderFromHex(displacedUnit.order,occupiedHexs[hex]);
						
						diplacedUnitsCount++;
					}

				//}
				
			}	
		}
		else {
			//we only write new locations when there are only hold orders are left in queue for this hex
			if(canWriteFinalPositions){
				currentHexOrders[0].order.unit.x = currentHexOrders[0].order.orderX;
				currentHexOrders[0].order.unit.Y = currentHexOrders[0].order.orderY;
				console.log(JSON.stringify(currentHexOrders[0]) + "SUCCEEDS AND WRITTEN");
			}
			else{
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


