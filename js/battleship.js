var model = {
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,
	ships: [ 	{ locations: [0, 0, 0], hits: ["", "", ""]  },
				{ locations: [0, 0, 0], hits: ["", "", ""]  },
				{ locations: [0, 0, 0], hits: ["", "", ""]  } 
	],
	missed: function(location) {
		var id = '#' + location;
		return $(id).hasClass('miss');
	},
	fire: function(guess) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			var index = parseInt(ship.locations.indexOf(guess));
			if (ship.hits[index] === "hit") {
				view.displayMessage("You waste your ammo, alredy hit that location!");
				return false;
			} else if (index >= 0) {
				ship.hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage("HIT!");

				if (this.isSunk(ship)) {
					view.displayMessage("You sank my battleship!");
					this.shipsSunk++;
				}
				return true;
			}	
		}
		view.displayMiss(guess);
		view.displayMessage("You missed.");
		return false;
	},
	isSunk: function(ship) {
		for (var i = 0; i < this.shipLength; i++) {
			if (ship.hits[i] !== "hit") {
				return false;
			}
		}
		return true;
	},
	generateShipLocations: function() {
		var locations;
		for (var i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip();
			} while (this.collision(locations));
			this.ships[i].locations = locations;
		}
		console.log("Ships array: ");
		console.log(this.ships);
	},
	generateShip: function() {
		var direction = Math.floor(Math.random() * 2);
		var row, col;
		
		if (direction === 1) { // horizontal
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
		} else { // vertical
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
			col = Math.floor(Math.random() * this.boardSize);
		}

	var newShipLocations = [];
	for (var i = 0; i < this.shipLength; i++) {
		if (direction === 1) {
			newShipLocations.push(row + "" + (col + i));
		} else {
			newShipLocations.push((row + i) + "" + col);
		}
	}
	return newShipLocations;
	}, 
	collision: function(locations) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = model.ships[i];
			for (var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	}

};

var view = {
	displayMessage: function(msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},
	displayHit: 	function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "hit");
	},
	displayMiss: 	function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "miss"); 
	},
	gameFinished:	function(msg) {
		var messageArea = document.getElementById("dialog-confirm-content");
		messageArea.innerHTML = msg;

		$(function() {
			$( "#dialog-confirm" ).dialog({
				resizable: false,
				height:300,
				modal: true,
				buttons: {
					"Start new game": function() {
						$( this ).dialog( "close" );
					},
					Cancel: function() {
						$( this ).dialog( "close" );
					}
				}
			});
		});
	},
	startNewGame: 	function(title, msg) {
		var messageArea = document.getElementById("dialog-confirm-content");
		messageArea.innerHTML = msg;
		$( "#dialog-confirm" ).attr('title', title);

		$( "#dialog-confirm" ).dialog({
			resizable: false,
			height:300,
			modal: true,
			buttons: {
				"Start new game": function() {
					$( this ).dialog( "close" );
				}
			}
		});
	}

};



var controller = {
	guess: 0,
	processGuess: function(guess) {
		if ( mouseClickGuess(guess) )
		{
			var location = mouseClickGuess(guess);
		}
		else
		{
			var location = parseGuess(guess);
		}

		if (location) {
			this.guess++;
			var hit = model.fire(location);
			if (hit && model.shipsSunk === model.numShips) {
				view.displayMessage("You sank all my battleships, in " + this.guess + " guesses.");
				view.gameFinished("You sank all my battleships, in " + this.guess + " guesses.");
			}
		}
	},
	handelMouseFire: function () {
	return alert("handelMouseFre");
	/*var fire = null;
	 var click = $( 'td').click(function() {
	 fire = $(this).attr('id');
	 if (fire)
	 {
	 alert(fire);
	 //controller.processGuess(fire);
	 }
	 else
	 {
	 return false;
	 }
	 });
	 if (!click)
	 {
	 //return false;
	 }*/
}
};

function mouseClickGuess(guess){
	var location = guess;
	if ( model.missed(location) )
	{
		view.displayMessage("You waste your ammo! Are you blind??? There is no ship!");
	}
	else
	{
		return location;
	}
}
function parseGuess(guess) {
			var alphabet = ["A", "B", "C", "D", "E", "F", "G"];


			if (guess === null || guess.length !== 2) {
				alert("Whoops, please enter a letter and number on the board.");
			} else {
				firstChar = guess.charAt(0);
				var row = alphabet.indexOf( firstChar.toUpperCase() );
				var column = guess.charAt(1);

				if (isNaN(row) || isNaN(column)) {
					alert("Whoops, that isn't on the board.");
				} else if (row < 0 || row >= model.boardSize || column < 1 || column > model.boardSize) {
					alert("Whoops, you miss whole area!");
				} else {
					var location = row + column;
					if ( model.missed(location) )
						{
						view.displayMessage("You waste your ammo! Are you blind??? There is no ship!");
						}
					else
						{
						return location;
						}
				}
			}
			return null
		}



		// event handler 
function handelMouseFire() {
	var fire = null;
	var click = $('td').click(function() {
		fire = $(this).attr('id');
		if (fire)
			{
			controller.processGuess(fire);
			}
		else
			{
			return false;
			}
		});
	if (!click)
	{
		//return false;
	}
}
function handleFireButton() {
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value;
	controller.processGuess(guess);

	guessInput.value = "";
}

function handleKeyPress(e) {
	var fireButton = document.getElementById("fireButton");
	// in IE9 and earlier, the event object doesn't get passed
	// to the event handler correctly, so we use window.event instead. 
	e = e || window.event;


	if (e.keyCode === 13) {
		fireButton.click();
		return false;
	}
}

	var aud = document.getElementById("backAudio");
	var soundOff = document.getElementById("soundOff");
	var soundOn;
	var volume = 0.15;

	function turnOffSound() {
		soundOff.value = "Sound ON";
		//soundOff.id = "soundOn";
		//soundOn = document.getElementById("soundOn");
    	return aud.volume = 0;
	}

	/*function turnOnSound() {
		soundOn.value = "Sound OFF";
		soundOn.id = "soundOff";
    	return aud.volume = 0.15;
	}*/




/*function init() {
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;

	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;

	model.generateShipLocations();
} */



window.onload = function() {

	handelMouseFire();


	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;

	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;

	model.generateShipLocations();


	soundOff.onclick = turnOffSound;
	//soundOn.onclick = turnOnSound;

	aud.volume = volume;
}

