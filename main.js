/*************************************************************
 * main.js
 * 
 * Contains:
 * -Main game object: slo
 * -Save/load
 * -Game loops
 *************************************************************/

var slo = []; // Main game object, slo = space lich omega

//gamestate varble init
slo.gameState = {
	inverse: false,
	batteryOn: true,
	levelActive: false,
	previousLocation: levelInfo,
};


/******************************************************
 * Save and Load Related 
 ******************************************************/

//resets all objects back to original state
slo.resetGame = function() {
	var message = 'This will reset your entire playthrough, this is not reversible, are you sure?';
	if (confirm(message)) {
		slo.resetStuffToShow();
		slo.resetInventoryObjects();
		slo.resetPlayer();

		saveGame();
		$('#error').html('Please refresh the window for the entire reset to work');
		loadGame();

	}
};

slo.resetStuffToShow = function() {
	slo.stuffToShow = {
			mapButton: false,
			post_lich: false,
			wood_sword: true,
			iron_sword: false,
			diamond_sword: false,
			iron_armor: true,
			diamond_armor: false,
			mapListing: true,
			pool_use: true,
			den: false,
			wizard_button: false,
			camp_scenario: true,
			camp_use: false,
			man: false,
			figure: false,
			mine: false,
			depths: false,
			tower_map: false,
			upper: false,
			top: false,
			monk_button: false,
			den: false,
			wizard_button: false,
			armory: false,
			throne: false,
			lich: false,
			cabin: false,
			cabin_map: false,
			sewer: false,
			prison: false,
			tunnel: false,
			danger: false,
			laboratory: false,
			hanger: false,
			rest_perm: false,
			cave: false,
			castle: false,
			wizard_home: false,
			forest_map: false,
			lab_map: false,
			phase3: false,
			rocket_launch: false,
			miningPick_item: false,
			staff_item: false,
			lifeGem_item: false,
			hood_item: false,
			miniBear_item: false,
			skull_item: false,
			trollHair_item: false,
			skullStaff_item: false,
			stickySlime_item: false,
			pizza_item: false,
			robe_item: false,
			riotShield_item: false,
			tome_item: false,
			end_button: false,
			badEnd_button: false
		};
};

slo.resetInventoryObjects = function() {
	slo.inventoryObject = {
			weapon: swordObject.fists,
			armor: armorObject.noArmor,
			ironArmor: false,
			diamondArmor: false,
			knightsArmor: false,
			jailOgreHide: false,
			astronautSuit: false,
			healthPotion: 10,
			manaPotion: 0,
			seed: 0,
			map: false,
			battery: 0,
			rune: true,
			sin: false,
			ticket: false,
			bait: false,
			flippers: false,
			shipBase: true,
			shipTop: false,
			shipFuel: false,
			miningPick: false,
			staff: false,
			lifeGem: false,
			hood: false,
			miniBear: false,
			skull: false,
			trollHair: false,
			skullStaff: false,
			stickySlime: false,
			pizza: false,
			robe: false,
			riotShield: false,
			spiralSword: false,
			diamondSword: false,
			ironSword: false,
			woodSword: false,
			beastClaw: false,
			sharkTooth: false,
			tome: false
		};
};

slo.resetPlayer = function() {
	slo.player = {
			damage: swordObject.fists.damage,
			reduction: slo.inventoryObject.armor.reduction,
			armorEnchant: this.reduction * this.armorEnchantVal,
			swordEnchant: this.damage * this.swordEnchantVal,
			camp: false,
			power: 1,
			gears: 1,
			batteries: 0,
			money: 0,
			gunk: 0,
			swordEnchantVal: 0,
			armorEnchantVal: 0,
			swordEnchantCost: 1000,
			armorEnchantCost: 1000,
			monkVisit: false,
			postLich: false,
			restPrice: 0,
			thief: false,
			confess: false,
			demonVisit: false,
			swordHP: 0,
			health: 100.00,
			maxHealth: 100,
			bigFish: false,
			regenVal: 0.25,
			freedom: 1,
			num: 5,
			sin_Choosen: false,
			potionCost: 25,
			manaCost: 25,
			gearCost: 200,
			runeCost: 5,
			batteryCost: 2000,
			teleport: false,
			reset: false,
			freeze: false,
			berserk: false,
			shield: false,
			figure: false,
			extraMoneyGen: 1,
			maximum: 100000,
			parts: false
		};
};

//load game using local storage, runs necessary functions so that everything is the same it was before quitting
slo.loadGame = function() {
	if (!localStorage['player_save']) return;
	var player_data = JSON.parse(atob(localStorage['player_save']));
	slo.player = slo.player_data;
	var inventory_data = JSON.parse(atob(localStorage['inventory_save']));
	slo.inventoryObject = inventory_data;
	var show_data = JSON.parse(atob(localStorage['show_save']));
	slo.stuffToShow = show_data;
	showStuff();
	updateWizardButtons();
	equipSword();
	$('#blood').html('You have ' + slo.player.gunk + ' gunk');
	$('#hp').html(slo.player.health + '/' + slo.player.maxHealth);
	if (slo.player.money > 1000) {
		$('#click_button').hide();
	}
	if (slo.player.camp) {
		campgroundAfterScenario();
	}
	if (slo.player.postLich) {
		Store.ascii = Store.ascii3;
		Main.special = '#future_special';
		Map.special = '#future_map';
		$('#post_lich').show();
		Wizard.text = 'Wow I havent seen you in awhile!';
		Main.text = 'what happened..?'
	}
};

//save game to local storage
slo.saveGame = function() {
	localStorage['player_save'] = btoa(JSON.stringify(slo.player));
	localStorage['inventory_save'] = btoa(JSON.stringify(slo.inventoryObject));
	localStorage['show_save'] = btoa(JSON.stringify(slo.stuffToShow));
};

slo.saveLoop = function() {
	if (slo.gameState.levelActive || shieldUsed || berserkUsed) {
		console.log('cant save in level');
	}
	else {
		saveGame();
		console.log('game saved');
	}
	setTimeout(saveLoop, 5000);
};

/****************************************************
 * Game Loops
 ****************************************************/
//main game loop, adds resources and hp
slo.mainLoop = function() {
	ectoplasmGenerator(slo.player.gears);
	if (slo.player.health < slo.player.maxHealth) {
		healthRegen();
		updateHealthBar();
	}
	fixHP();
	if (slo.gameState.batteryOn == true) {
		bloodGenerator(slo.player.batteries);
	}
	setTimeout(mainLoop, 1000);
};

//quest loop, called if level is active
slo.questLoop = function(monster) {
	if (bearCave) {
		dropBearFall();
	}
	if (timeFrozen == false) {
		moveInLevel(monster);		
	}


	if (timeFrozen) {
		frozeTimer--;
		$('#error').html('Time Frozen: ' + frozeTimer);
		if (frozeTimer == 0) {
			timeFrozen = false;
		}
	}
	if (shieldUsed) {
		shieldTimer--;
		$('#error').html('Shield Left: ' +  shieldTimer);
		if (shieldTimer == 0) {
			shieldUsed = false;
			slo.player.reduction = oldReduction;
		}
	} 
	if (berserkUsed) {
		berserkTimer--;
		$('#error').html('Berserk Left: ' + berserkTimer);
		if (berserkTimer == 0) {
			berserkUsed = false;
			slo.player.power = oldPower;
		}
	}

	if (potionUsed) {
		potionCD--;
		$('#potionCDText').html("Potion Cooldown: " + potionCD);
		if (potionCD == 0) {
			potionUsed = false;
			$('#error').html('');
		}
	}

	if (slo.gameState.levelActive == false) {
		potionCD = 0;
		potionUsed = false;
		return;
	}

	setTimeout(function() {
		questLoop(monster);
	}, 500);
};

//not current being called
slo.animateLoop = function() {
	smokeAnimate();
	blinkAnimate();

	setTimeout(animateLoop, 750);
};

/************************************************
 * GUI Related
 ************************************************/
slo.updateHealthBar = function() {
	$('#hp').html(slo.player.health.toFixed(2) + '/' + slo.player.maxHealth);
	$('#hp').css('width', slo.player.health / slo.player.maxHealth * 100 + '%');
}

slo.healthRegen = function() {
	slo.player.health = slo.player.health + slo.player.regenVal;
}

//generates ectoplasm on click
slo.ectoplasmClick = function(num) {
	slo.player.money = slo.player.money + num;
	document.getElementById('ectoplasm').innerHTML = "You have " + slo.player.money + " gold";
};

//generates ectoplasm overtime, passing in gears placed
slo.ectoplasmGenerator = function(num) {
	slo.player.money = slo.player.money + num*slo.player.extraMoneyGen;
	document.getElementById('ectoplasm').innerHTML = "You have " + slo.player.money + " gold";
	$('#ecto_gen').html('gold/s: ' + num);
	if (slo.player.money > 1000) {
		$('#click_button').hide();
	}
	else if (slo.player.money < 1000) {
		$('#click_button').show();
	}
};

//generatres blood overtime, passing in batteries in use
slo.bloodGenerator = function(num) {
	if (num * 2 <= slo.player.money) {
	slo.player.gunk = slo.player.gunk + num*2;
	slo.player.money = slo.player.money - num*2;
	$('#blood').html("You have " + slo.player.gunk + " gunk");
	$('#blood_gen').html('gunk/s: ' + num*2);
	}
}

slo.lightFire = function() {
	$('#cabin_rest').show();
	$('#location_text').html('The fire is roaring.  You may now rest here freely.');
}

slo.magicDoor = function() {
	if (slo.inventoryObject.rune == true) {
		$('#rune_true').css('display', 'inline');
		$('#rune_false').css('display', 'none');
		$('#magic_door').css('color', '#4FE8D6');
	}
	else {
		$('#rune_false').css('display', 'inline-block');
		$('#rune_true').css('display', 'none');
	}
}

slo.locationSwitch = function(location) {
		$(previousLocation.special).hide();
		slo.gameState.previousLocation = location;
		$('#error').html('');
		$('#location_ascii').hide();
		$('#location_text').hide();
		$(location.special).fadeIn('slow');
		$('#location_ascii').html(location.ascii).fadeIn('slow');
		$('#location_text').html(location.text).fadeIn('slow');
}

//loads dom elements & event listeners
window.onload = function() {
	loadGame();
	mainLoop();
	saveLoop();
	locationSwitch(Main);
	$('#ascii_text').html(cavern.ascii);

	var reflectingPool = document.getElementById('reflectingPool');
	var store = document.getElementById('store');
	var main = document.getElementById('main');
	var error = document.getElementById('error');
	var inventory = document.getElementById('inventory');
	var fieldButton = document.getElementById('fieldButton');
	var mapButton = document.getElementById('mapButton');

	var locationTo;
	var locationFrom;

 	// event listener to switch location

	$('.location_button, .location_ascii').click(function() {
		if (slo.gameState.levelActive) {
			$('#error').html('You must leave quest first');
			return;
		}
		var buttonValue = $(this).attr('value');
		var locationVal = locationObject[buttonValue];
		if (buttonValue == 'DemonWizardElder' && slo.player.demonVisit) {
			$('#error').html('The Demon Wizard Elder does not allow repeat visits');
			return;
		}
		locationSwitch(locationVal);
		if (buttonValue == 'Mountain') {
			magicDoor();
		}
		else if (buttonValue == 'Inventory') {
			inventoryList();
			playerInfoUpdate();
		}
		else if (buttonValue == 'Book') {
			showLab();
		}
		else if (buttonValue == 'DemonWizardElder') {
			noDemon();
		}
		else if (buttonValue == 'Store') {
			storePriceUpdate();
		}
		else if (buttonValue == 'Cabin') {
			spaceShipCheck();
		}
	});

	$('.monk_button').click(function() {
		var buttonValue = $(this).attr('value');
		if (buttonValue == 'greet') {
			monkCheck();
		}
		else {
			$('#greet_monk').hide();
			monkAction(buttonValue);
		}
	})

	$('.wizard_button').click(function() {
		var buttonValue = $(this).attr('value');
		wizardExplain(buttonValue);
	})

	//telescope event listener
	$('.tele_button').click(function() {
		var buttonValue = $(this).attr('value');
		telescope(buttonValue);
	})


	//lich event listener
	$('.lich_button').click(function() {
		var buttonValue = $(this).attr('value');
		lichEncounter(buttonValue);
	})

	$('.enchantButton').click(function() {
		var buttonValue = $(this).attr('value');
		wizardEnchant(buttonValue);
	})

	//event listener to buy store items
	$('.store_button').click(function() {
		var buttonValue = $(this).attr('value');
		var split = buttonValue.split(',');
		storeItems(split);

	});

	$('.pool_button').click(function() {
		var buttonValue = $(this).attr('value');
		reflectingPoolChoice(buttonValue);
	})

	$('.potion_button').click(function() {
		var buttonValue = $(this).attr('value');
		useHealthPotion();
	});

	$('#leave_quest').click(function() {
		leaveQuest();
	});

	$('#invert_button').click(function() {
		inverseColors();
	});

	$('.factory_button').click(function() {
		var buttonValue = $(this).attr('value');
		factoryFunction(buttonValue);
	})
}