//default is dark, inverse colors on button click
function inverseColors() {
	if (slo.gameState.inverse == false) {
		$('body').css('color', 'black');
		$('body').css('background-color', 'white');
		$('#ectoplasmDiv').css('border-color', 'black');
		$('#hp').css('color', 'white');
		slo.gameState.inverse = true;
	}
	else {
		$('body').css('color', 'white');
		$('body').css('background-color', 'black');
		$('#ectoplasmDiv').css('border-color', 'white');
		slo.gameState.inverse = false;
	}
}