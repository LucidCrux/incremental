//takes slo.players choice and asks them to confirm, then applies their choice affects and slo.player.sinChoosen becomes true for the monk encounter
function chooseSin(choice) {
	var message = "You can only pick one and thats what you are going with?";
	if (confirm(message)) {
		switch (choice) {
			case "lust":
				slo.player.freedom = slo.player.freedom + 0.5;
				$('#error').html('You choose lust. Monsters drop more money');
				break;
			case "gluttony":
				slo.player.regenVal = slo.player.regenVal + 3;
				$('#error').html('You choose Gluttony. You heal faster');
				break;
			case "greed":
				slo.player.money = slo.player.money * 2;
				$('#error').html('You choose Greed. You gain extra money');
				break;
			case "sloth":
				slo.player.gears = slo.player.gears + 3;
				slo.player.batteries = slo.player.batteries + 3;
				$('#error').html('You choose Sloth. You generate resources faster');
				break;
			case "wrath":
				slo.player.swordEnchantVal = slo.player.swordEnchantVal + 0.25;
				$('#error').html('You choose Wrath. You deal more damage')
				break;
			case "envy":
				slo.player.freedom = slo.player.freedom + 0.1;
				slo.player.batteries = slo.player.batteries + 1;
				slo.player.gears = slo.player.gears + 1;
				slo.player.swordEnchantVal = slo.player.swordEnchantVal + 0.075
				slo.player.armorEnchantVal = slo.player.armorEnchantVal + 0.075;
				$('#error').html('You choose Envy. You get a little of everything')
				break;
			case "pride":
				slo.player.armorEnchantVal = slo.player.armorEnchantVal + 0.25;
				$('#error').html('You choose pride. You can take more damage now')
				break;
		}
		slo.player.sinChoosen = true;
		$('#choiceWrap').hide();
	}
}
