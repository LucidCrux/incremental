var potionUsed = false;
var potionCD = 0;
var timeFrozen = false;

function showStuff() {
for (var key in slo.stuffToShow) {
	var obj = slo.stuffToShow[key];
	if (obj) {
		$('#' + key).show();
	}
	else {
		$('#' + key).hide();
	}
}
}

//object containing weapon types
var swordObject = {
	fists : {
		name: 'Fists',
		damage: 1
	},

	woodSword : {
		name: 'Wooden Sword',
		damage: 2
	},

	ironSword : {
		name: 'Iron Sword',
		damage: 4
	},
	diamondSword: {
		name: 'Diamond Sword',
		damage: 10
	},
	spiralSword: {
		name: 'The Spiral Drill Sword',
		damage: 100
	},
	candySword: {
		name: 'The Candy Sword',
		damage: 75
	},
	beastClawSword: {
		name: 'The Beasts Claw',
		damage: 50
	},
	sharkToothSword : {
		name: 'Shark Tooth Sword',
		damage: 20
	}
}

var armorObject = {
	noArmor : {
		name: 'No Armor',
		reduction: 0
	},
	ironArmor : {
		name: 'Iron Armor',
		reduction: 2
	},
	diamondArmor : {
		name: 'Diamond Armor',
		reduction: 5
	},
	knightsArmor : {
		name: 'Knights Armor',
		reduction: 20
	},
	astronautSuit : {
		name: 'Astronaut Suit',
		reduction: 100
	},
	jailOgreHide : {
		name: 'Jail Ogre Hide',
		reduction: 50
	}
}

//inventory

function itemEquip(item) {
	console.log(item + '  test');
	switch (item) {
		case 'miningPick':
			if (!slo.inventoryObject.miningPick) {
				slo.player.freedom = slo.player.freedom + 0.1;
				slo.inventoryObject.miningPick = true;
				slo.stuffToShow.miningPick_item = true;
			}
			
			break;
		case 'staff':
			if (!slo.inventoryObject.staff) {
				slo.player.swordEnchantVal = slo.player.swordEnchantVal + 0.05;
				slo.inventoryObject.staff = true;
				slo.stuffToShow.staff_item = true;
			}
			
			break;
		case 'lifeGem':
			if (!slo.inventoryObject.lifeGem) {
				slo.player.regenVal = slo.player.regenVal + 0.75;
				slo.inventoryObject.lifeGem = true;
				slo.stuffToShow.lifeGem_item = true;
			}
			
			break;
		case 'hood':
			if (!slo.inventoryObject.hood) {
				slo.player.swordEnchantVal = slo.player.swordEnchantVal + 0.1;
				slo.inventoryObject.hood = true;
				slo.stuffToShow.hood_item = true;
			}
			
			break;
		case 'miniBear':
			if (!slo.inventoryObject.miniBear) {
				slo.player.freedom = slo.player.freedom + 0.2;
				slo.inventoryObject.miniBear = true;
				slo.stuffToShow.miniBear_item = true;
			}

			break;
		case 'skull':
			if (!slo.inventoryObject.skull) {
				slo.player.swordHP = slo.player.swordHP + 0.1;
				slo.inventoryObject.skull = true;
				slo.stuffToShow.skull_item = true;
			}

			break;
		case 'trollHair':
			if (!slo.inventoryObject.trollHair) {
				slo.player.armorEnchantVal = slo.player.armorEnchantVal + 0.1;
				slo.inventoryObject.trollHair = true;
				slo.stuffToShow.trollHair_item = true;
			}
			break;
		case 'skullStaff':
			if (!slo.inventoryObject.skullStaff) {
				slo.player.swordEnchantVal = slo.player.swordEnchantVal + 0.05;
				slo.player.armorEnchantVal = slo.player.armorEnchantVal + 0.05;
				slo.player.regenVal = slo.player.regenVal + 2.5;
				slo.inventoryObject.skullStaff = true;
				slo.stuffToShow.skullStaff_item = true;
			}
			break;
		case 'stickySlime':
			if (!slo.inventoryObject.stickySlime) {
				slo.player.extraMoneyGen = 2;
				slo.inventoryObject.stickySlime = true;
				slo.stuffToShow.stickySlime_item = true;
			}
			else {
				$('#special_loot').html('---');
			}
			break;
		case 'pizza':
			if (!slo.inventoryObject.pizza) {
				slo.player.maxHealth = slo.player.maxHealth + 420;
				slo.inventoryObject.pizza = true;
				slo.player.maximum = 100420;
				slo.stuffToShow.pizza_item = true;
			}
			break;
		case 'robe':
			if (!slo.inventoryObject.robe) {
				slo.player.regenVal = slo.player.regenVal + 5;
				slo.inventoryObject.robe = true;
				slo.stuffToShow.robe_item = true;
			}
			break;
		case 'riotShield':
			if (!slo.inventoryObject.riotShield) {
				slo.player.armorEnchantVal = slo.player.armorEnchantVal + 0.25;
				slo.inventoryObject.riotShield = true;
				slo.stuffToShow.riotShield_item = true;
			}
			break;
		case 'beastClaw':
			if (!slo.inventoryObject.beastClaw) {
				slo.inventoryObject.beastClaw = true;
				equipSword();
			}
			break;
		case 'spaceSword':
			if (!slo.inventoryObject.spiralSword) {
				slo.inventoryObject.spiralSword = true;
				equipSword();
			}
			break;
		case 'sharkTooth':
			if (!slo.inventoryObject.sharkTooth) {
				slo.inventoryObject.sharkTooth = true;
				equipSword();
			}
			break;
		case 'tome':
			if (!slo.inventoryObject.tome) {
				slo.inventoryObject.tome = true;
				slo.player.regenVal = slo.player.regenVal + 1;
				slo.player.swordHP = slo.player.swordHP + 0.1;
				slo.player.maxHealth = slo.player.maxHealth + 500;
				slo.stuffToShow.tome_item = true;
			}
			break;
		case 'knightsArmor':
			if (!slo.inventoryObject.knightsArmor) {
				slo.inventoryObject.knightsArmor = true;
				equipArmor();
			}
			break;
		case 'jailOgreHide':
			if (!slo.inventoryObject.jailOgreHide) {
				slo.inventoryObject.jailOgreHide = true;
				equipArmor();
			}
			break;
		case 'astronautSuit':
			if (!slo.inventoryObject.astronautSuit) {
				slo.inventoryObject.astronautSuit = true;
				equipArmor();
			}
			break;
		case 'none':
			break;
	}
	showStuff();
}

function equipArmor() {
	if (slo.inventoryObject.astronautSuit) {
		slo.inventoryObject.armor = armorObject.astronautSuit;
		slo.player.reduction = armorObject.astronautSuit.reduction;
	}
	else if (slo.inventoryObject.jailOgreHide) {
		slo.inventoryObject.armor = armorObject.jailOgreHide;
		slo.player.reduction = armorObject.jailOgreHide.reduction;
	}
	else if (slo.inventoryObject.knightsArmor) {
		slo.inventoryObject.armor = armorObject.knightsArmor;
		slo.player.reduction = armorObject.knightsArmor.reduction;
	}
	else if (slo.inventoryObject.diamondArmor) {
		slo.inventoryObject.armor = armorObject.diamondArmor;
		slo.player.reduction = armorObject.diamondArmor.reduction;
	}
	else if (slo.inventoryObject.ironArmor) {
		slo.inventoryObject.armor = armorObject.ironArmor;
		slo.player.reduction = armorObject.ironArmor.reduction;
	}
}

function equipSword() {
	if (slo.inventoryObject.spiralSword) {
		slo.inventoryObject.weapon = swordObject.spiralSword;
		slo.player.damage = swordObject.spiralSword.damage;
	}
	else if (slo.inventoryObject.beastClaw) {
		slo.inventoryObject.weapon = swordObject.beastClawSword;
		slo.player.damage = swordObject.beastClawSword.damage;
	}
	else if (slo.inventoryObject.sharkTooth) {
		slo.inventoryObject.weapon = swordObject.sharkToothSword;
		slo.player.damage = swordObject.sharkToothSword.damage;
	}
	else if (slo.inventoryObject.diamondSword) {
		slo.inventoryObject.weapon = swordObject.diamondSword;
		slo.player.damage = swordObject.diamondSword.damage;
	}
	else if (slo.inventoryObject.ironSword) {
		slo.inventoryObject.weapon = swordObject.ironSword;
		slo.player.damage = swordObject.ironSword.damage;
	}
	else if (slo.inventoryObject.woodSword) {
		slo.inventoryObject.weapon = swordObject.woodSword;
		slo.player.damage = swordObject.woodSword.damage;
	}
}

var enchantDmg = 0;
var armorRed = 0;

function swordEnchantDmg() {
	enchantDmg = slo.player.damage * slo.player.swordEnchantVal;
	return enchantDmg;
}

function armorEnchantRed() {
	armorRed = slo.player.reduction * slo.player.armorEnchantVal;
	return armorRed;
}

function fixHP() {
	if (slo.player.health > slo.player.maxHealth) {
		slo.player.health = slo.player.maxHealth;
		updateHealthBar();
	}
    else if (slo.player.health < 0) {
		slo.player.health = 0;
	}
}

function useHealthPotion() {
	if (slo.inventoryObject.healthPotion == 0) {
		$('#error').html('No Health Potions ;-;');
	}
	else if (potionUsed) {
		$('#error').html('Potions are on Cooldown!');
	}
	else {
		if (slo.player.health >= slo.player.maxHealth) {
			$('#error').html('You already have full health dont be silly');
		}
		else {		
			slo.player.health = slo.player.health + slo.player.maxHealth*0.2;
			potionUsed = true;
			potionCD = 15;
			slo.inventoryObject.healthPotion--;
			updateHealthBar();
			inventoryList();
			$('#health_potion_button').html('Use HP(' + slo.inventoryObject.healthPotion + ')');
		}
	}
}

function useTeleportPotion() {
	if (slo.inventoryObject.teleportPotion == 0) {
		$('#error').html('No magic runes ;-;');
	}
	else if (potionUsed) {
		$('#error').html('Spells are on Cooldown!');
	}
	else {
		potionUsed = true;	
		potionCD = 15;
		level[i - 1] = '_';
		level[i] = '_';
		i = 0;
		level[0] = 'Y';		
	}
}

function useFreezePotion() {
	if (slo.inventoryObject.rune == 0) {
		$('#error').html('No magic runes ;-;');
	}
	else if (potionUsed) {
		$('#error').html('Spells are on Cooldown!');
	}
	else {
		potionUsed = true;
		potionCD = 10;
		timeFrozen = true;
		frozeTimer = 5;
	}
}
var oldPower;
var berserkUsed = false;
var shieldUsed = false;

function useShield() {
	if (potionUsed) {
		$('#error').html('Spells are on Cooldown!');
	}
	else {
		potionUsed = true;
		shieldUsed = true;
		oldReduction = slo.player.reduction;
		slo.player.reduction = 100000000;
		shieldTimer = 3;
		potionCD = 20;
	}
}

function useBerserk() {
	if (slo.inventoryObject.rune == 0) {
		$('#error').html('No magic runes ;-;');
	}
	else if (potionUsed) {
		$('#error').html('Spells are on Cooldown!');
	}
	else {
		berserkUsed = true;
		oldPower = slo.player.power;
		slo.player.power = slo.player.power*2;
		potionUsed = true;
		potionCD = 15;
		berserkTimer = 5;
	}
}

var resetSpellUsed = false;

function resetSpells() {
	if (slo.inventoryObject.rune == 0) {
		$('#error').html('No magic runes ;-;');
	}
	else if (resetSpellUsed) {
		$('#error').html('You can only cast reset once per level!');
	}
	else {
		potionCD = 0;
		potionUsed = false;
		resetSpellUsed = true;
		$('#potionCDText').html('Potion/Spell CD: ' + potionCD);
	}
}

//updated inventory list for use when navigating to inventory screen
function inventoryList() {
	$('#inventoryItems').html("Health Potions: " + slo.inventoryObject.healthPotion + "<br>"
							+ "Mana Potions: " + slo.inventoryObject.manaPotion + "<br>"
							+ "Gears: " + slo.inventoryObject.seed + "<br>"
							+ "Weapon: " + slo.inventoryObject.weapon.name + "<br>"
							+ "Armor: " + slo.inventoryObject.armor.name + "<br>"
							+ "Batteries: " + slo.inventoryObject.battery );
}

function playerInfoUpdate() {
	$('#playerInfo').html("Damage: " + slo.player.damage + " <br>"
						+ "Sword Enchant: " + Math.round(slo.player.swordEnchantVal*100) + "%" + "<br>"
						+ "Combined Damage: " + Math.round((slo.player.swordEnchantVal*slo.player.damage + slo.player.damage)*slo.player.power) + "<br>"
						+ "Armor: " + slo.player.reduction + " <br>"
						+ "Armor Enchant: " + Math.round(slo.player.armorEnchantVal*100) + "%" + "<br>"
						+ "Combined Armor: " + Math.round(slo.player.armorEnchantVal*slo.player.reduction + slo.player.reduction) + "<br>"
						+ "Max Health: " + slo.player.maxHealth + " <br>"
						+ "Sword Healing: " + slo.player.swordHP*100 + "%" + "<br>"
						+ "Extra Loot Multiplier: " + Math.round((slo.player.freedom*100) -100) + "%");
};

//buys item if you have enough money else error
function itemBuy(item) {
	var itemBought = false;
	if (slo.player.money < itemPrice) {
		storeStatus('Hey! you need more money than that punk');
	}
	else {
		slo.player.money = slo.player.money - itemPrice;
		itemBought = true;
		//removes the item from store if it has a secondary value
	}
	return itemBought;
}

function storeStatus(text) {
	$('#location_text').html(text);
}

//updates the cost on the button of the store items if it scales
function storePriceUpdate() {
	$('#battery_buy').html(slo.player.batteryCost);
	$('#rune_buy').html(slo.player.runeCost);
	$('#hp_buy').html(slo.player.potionCost);
	$('#gear_buy').html(slo.player.gearCost);
	$('#mana_buy').html(slo.player.manaCost);
}


/***Store Functionality:
	Takes input based on button clicked for each item, passes into itemBuy(),
which checks if player has enough money, if true, then add the item to inventory/remove
money, if false, then display error. Removes bought sword and shows better sword  ****/
function storeItems(item) {
	switch (item[0]) {
		case "diamondSword":
			this.itemPrice = 10000;
			var itemBought = itemBuy(item);
			if (itemBought == true) {
				slo.inventoryObject.diamondSword = true;
				equipSword();
				$('#diamond_sword').hide();
				slo.stuffToShow.diamond_sword = false;
				storeStatus('Not made out of blood diamonds but will cause blood~');
			}
			break;
		case "woodSword":
			this.itemPrice = 100;
			var itemBought = itemBuy(item);
			if (itemBought == true) {
				slo.inventoryObject.woodSword = true;
				equipSword();
				$('#iron_sword').show();
				slo.stuffToShow.iron_sword = true;
				storeStatus('This thing wont do much but its better than fists');
				$('#wood_sword').hide();
				slo.stuffToShow.wood_sword = false;
			}
			break;
		case "ironSword":
			this.itemPrice = 1000;
			var itemBought = itemBuy(item);
			if(itemBought == true) {
				slo.inventoryObject.ironSword = true;
				equipSword();
				storeStatus('Now this will show them');
				$('#iron_sword').hide();
				$('#diamond_sword').show();
				slo.stuffToShow.iron_sword = false;
				slo.stuffToShow.diamond_sword = true;
			}
			break;
		case "ironArmor":
			this.itemPrice = 500;
			var itemBought = itemBuy(item);
			if (itemBought == true) {
				slo.inventoryObject.ironArmor = true;
				equipArmor();
				storeStatus('Better than nothing I guess');
				$('#iron_armor').hide();
				slo.stuffToShow.iron_armor = false;
				$('#diamond_armor').show();
				slo.stuffToShow.diamond_armor = true;
			}
			break;
		case 'diamondArmor':
			this.itemPrice = 5000;
			var itemBought = itemBuy(item);
			if (itemBought == true) {
				slo.inventoryObject.diamondArmor = true;
				equipArmor();
				storeStatus('This took 9 diamonds to make, dont ruin it!');
				$('#diamond_armor').hide();
				slo.stuffToShow.diamond_armor = false;
			}
			break;
		case "healthPotion":
			this.itemPrice = slo.player.potionCost;
			var itemBought = itemBuy(item);
			if (itemBought == true) {
				slo.player.potionCost = slo.player.potionCost + Math.floor(slo.player.potionCost/5);
				slo.inventoryObject.healthPotion++;
				storeStatus('Heres a Healh Potion, hope you wont need it..');
			}
			break;
		case "manaPotion":
			this.itemPrice = slo.player.manaCost;
			var itemBought = itemBuy(item);
			if (itemBought == true) {
				slo.player.manaCost = slo.player.manaCost + Math.floor(slo.player.manaCost/5);
				slo.inventoryObject.manaPotion++;
				storeStatus('You know you dont even have mana right?');
				if (slo.inventoryObject.manaPotion > 10) {
					storeStatus('Really. I am telling you the truth, these are worthless to you');
					if (slo.inventoryObject.manaPotion > 20) {
						storeStatus('Your determination to be a magic user inspires me ;-;  Please, take this tome, maybe it can help you');
						itemEquip('tome');
					}
				}
			}
			break;
		case "seed":
			this.itemPrice = slo.player.gearCost;
			var itemBought = itemBuy(item);
			if (itemBought == true) {
				slo.inventoryObject.seed++;
				slo.player.gearCost = slo.player.gearCost + Math.floor(slo.player.gearCost/7);
				storeStatus('Gear huh? Might want to checkout the factory.');
			}
			break;
		case "map":
			this.itemPrice = 50;
			var itemBought = itemBuy(item);
			if (itemBought == true) {
				slo.inventoryObject.map = true;
				$('#mapButton').show();
				slo.stuffToShow.mapButton = true;
				$('#mapListing').hide();
				slo.stuffToShow.mapListing = false;
				storeStatus('Hey! Dont open that map in my store!');
			}
			break;
		case "battery":
			this.itemPrice = slo.player.batteryCost;
			var itemBought = itemBuy(item);
			if (itemBought == true) {
				slo.player.batteryCost = slo.player.batteryCost + Math.floor(slo.player.batteryCost/5);
				$('#')
				slo.inventoryObject.battery++;
				storeStatus('Battery! What could you use this for?');				
			}
			break;
		case "rune":
			this.itemPrice = slo.player.runeCost;
			var itemBought = itemBuy(item);
			if (itemBought == true) {
				slo.inventoryObject.rune = true;
				storeStatus('Magic Rune! It is glowing strangely.');
				slo.player.runeCost = slo.player.runeCost + Math.floor(slo.player.runeCost/5);				
			}
	}
	storePriceUpdate();
}