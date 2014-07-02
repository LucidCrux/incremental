var batteryDisplay = true;
//master factory function for the event listener, pretty trashy atm
function factoryFunction(value) {
	if (value == 'place_one') {
		plantSeed();
	}
	else if (value == 'place_all') {
		plantAll();
	}
	else if (value == 'use_battery') {
		useBattery();
	}
	else if (value == 'make_flesh') {
		createFlesh();
	}
	if (batteryDisplay == false) {
		batteryEnable();
	}
}

function createFlesh() {
	var flesh = 0;
	
	if ((slo.player.money > 0 ) && (slo.player.gunk > 0)) {
		if (slo.player.money > slo.player.gunk) {
			flesh = slo.player.gunk;
		}
		else {
			flesh = slo.player.money;
		}
		if (flesh > 5000) {
			slo.player.num = 7.5;
		}
		if (flesh > 10000) {
			slo.player.num = 10;
		}
		if (flesh > 50000) {
			slo.player.num = 20;
		}
		if (flesh > 100000) {
			slo.player.num = 30;
		}
		if (flesh > 200000) {
			slo.player.num = 50; 
		}
			slo.player.money = slo.player.money - flesh;
			slo.player.gunk = slo.player.gunk - flesh;
			slo.player.maxHealth = slo.player.maxHealth + Math.round(flesh / slo.player.num);
			flesh = 0;
			slo.player.num = 5;
		if (slo.player.maxHealth > slo.player.maximum) {
			slo.player.maxHealth = slo.player.maximum;
		}
	}
}

//functions associated with the factory, placegears/usebatteries
function plantSeed() {
	if (slo.inventoryObject.seed > 0) {
		slo.player.gears++;
		slo.inventoryObject.seed--;
		$('#seeds_planted').html("Gears Placed: " + slo.player.gears);
	}
	else {
		error.innerHTML = 'you have no gears';
	}
}

function plantAll() {
	if (slo.inventoryObject.seed > 0) {
		slo.player.gears = slo.player.gears + slo.inventoryObject.seed;
		slo.inventoryObject.seed = 0;
		$('#seeds_planted').html("Gears Placed: " + slo.player.gears);
	}
	else {
 		error.innerHTML = 'you have no gears';
 	}
}

function batteryEnable() {
	if (slo.player.gears > 1) {
		$('#batteryButton').css('display', 'inline');
		batteryDisplay = true;
		slo.gameState.batteryOn = true;;
	}
}


function useBattery() {
	if (slo.inventoryObject.battery > 0) {
		slo.player.batteries++;
		slo.inventoryObject.battery--;
	}
	else {
 		error.innerHTML = 'you have no batteries';
 	}
}

function turnOffBattery() {
	if (slo.gameState.batteryOn == false) {
		slo.gameState.batteryOn = true;
		$('#blood_gen').html('gunk/s: ' + slo.player.batteries*2);
		$('#turn_off').html('Turn Off Machine');
	}
	else {
		slo.gameState.batteryOn = false;
		$('#blood_gen').html('The machine is off');
		$('#turn_off').html('Turn On Machine');
	}
}
