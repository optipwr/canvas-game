function Player(name){
	this.name = name;
	this.highscore = 0;
}


function newPlayer(){
	var playerNameDiv = document.getElementById('player-name');
	var playerName = playerNameDiv.value;
	playerArray.push(new Player(playerName));
	// console.log(playerName);
	document.getElementById('input-name').innerHTML = playerName;
}

// Add a countdown timer
// Start game button.

function startGame(){
	if (playerArray.length == 0){
		gameOn = false;
		alert("You must input a player name and click 'New Player' first!");
	}
	else{
	gameOn = true;
	//user started the game. Save the time. Save the time + 30 seconds.
	gameStart = Date.now();
	gameEnd = Date.now() + 30000;
	//start the interval
	timerInterval = setInterval(updateTimer, 1000);
	currentScore = 0;
	document.getElementById('currentScore').innerHTML = 0;
	}
}

function updateTimer(){
	var newNow = Date.now();
	// subtract the game end time from current time.
	var timeDifference = Math.ceil((gameEnd - newNow) / 1000);
	if(timeDifference < 0){
		clearInterval(timerInterval);
		gameOn = false;
		timeDifference = 0;
		document.getElementById('timer').innerHTML = "Game Over!";
	}
	else{
	document.getElementById('timer').innerHTML = timeDifference + " Seconds Remaining";
	}
}


var gameStart = 0;
var gameEnd = 0;
var timerInterval;
var currentScore = 0;
var playerArray = [];
var highScore = 0;


// Create the canvas tag with JS
var canvas = document.getElementById('game');
// Create a context for JS to play with (methods, properties etc.)
var context = canvas.getContext('2d');
// Give the canvas some height and width
canvas.width = 512;
canvas.height = 480;

// Add the canvas tag to the DOM
document.body.appendChild(canvas);

var backgroundImage = new Image();
backgroundImage.src = "canvas-game-assets/background.png";

var speedModifier = .5;
var gameOn = false;

// Make a var for our hero. He is an image!
var hero = new Image();
hero.src = "canvas-game-assets/Ranger-Front.gif";
var heroLocation = {
	x: 100,
	y: 100,
	bombPlace: false,
	bombTimer: false,
	explosion: false
}

// Make a var for our monster. He is an image!
var monster = new Image();
monster.src = "canvas-game-assets/Slime.gif";
var monsterLocation = {
	x: 380,
	y: 380,
	newX: 380,
	newY: 380
}

var newMonster = new Image();
newMonster.src = "canvas-game-assets/BlackFlan.gif";
var newMonsterLocation = {
	x: 400,
	y: 200,
	newX: 400,
	newY: 200,
	spawn: false
}

var bomb = new Image();
bomb.src = "canvas-game-assets/bomb.png";
var bombLocation = {
	x: "Herox",
	y: "Heroy"
}

var explosion = new Image();
explosion.src = "canvas-game-assets/explosion.png";

// An array to hold all the keys that are currently pressed down.
var keysDown = [];

addEventListener('keyup', function(event){
	delete keysDown[event.keyCode];
});


// We need a way to tell if the user has pushed an arrow key!
addEventListener('keydown', function(event){
	keysDown[event.keyCode] = true;

});

// This is where we will update the hero based on what's true in keysDown.
function update() {
	if(39 in keysDown){
		if(heroLocation.x <= 450) {
			heroLocation.x += (10 * speedModifier);
		}
	}
	if(37 in keysDown){
		if(heroLocation.x >= 26) {
		heroLocation.x -= (10 * speedModifier);
		}
	}
	if(38 in keysDown){
		if(heroLocation.y >= 32) {
		heroLocation.y -= (10 * speedModifier);
		}
	}
	if(40 in keysDown){
		if(heroLocation.y <= 410) {
		heroLocation.y += (10 * speedModifier);
		}
	}
	if(32 in keysDown){
		hero.bombPlace = true;
		hero.bombTimer = true;
		//These 2 commands below disaassociate heroLocation and add to bombLocation so that that bomb does not follow.
		bombLocation.x = heroLocation.x;
		bombLocation.y = heroLocation.y;
	}
	if(39 in keysDown){
		hero.src = "canvas-game-assets/Ranger-Right.gif";
	}
	else if(37 in keysDown){
		hero.src = "canvas-game-assets/Ranger-Left.gif";
	}
	else {
		hero.src = "canvas-game-assets/Ranger-Front.gif";
	}

	if(
		(heroLocation.x <= monsterLocation.x + 32)
		&& (heroLocation.y <= monsterLocation.y + 32)
		&& (monsterLocation.x <= heroLocation.x + 32)
		&& (monsterLocation.y <= heroLocation.y + 32)	
	){
		console.log("The monster jumped up and bit you");
		gameOn = false;
		gameEnd = 0;
	}

	if (newMonsterLocation.spawn == true){
		if(
			(heroLocation.x <= newMonsterLocation.x + 32)
			&& (heroLocation.y <= newMonsterLocation.y + 32)
			&& (newMonsterLocation.x <= heroLocation.x + 32)
			&& (newMonsterLocation.y <= heroLocation.y + 32)
		){
			console.log("The monster jumped up and bit you");
			gameOn = false;
			gameEnd = 0;
		}
	}
	if(
		(bombLocation.x <= monsterLocation.x + 32)
		&& (bombLocation.y <= monsterLocation.y + 32)
		&& (monsterLocation.x <= bombLocation.x + 32)
		&& (monsterLocation.y <= bombLocation.y + 32)
	){
		console.log("The Bomb Destroyed the Monster!")
		document.getElementById('currentScore').innerHTML = currentScore += 1;
		if(currentScore > highScore) {
			highScore = currentScore;
			document.getElementById('highScore').innerHTML = highScore;
		}
		var currentPlayerIndex = playerArray.length - 1;
		if (currentScore > playerArray[currentPlayerIndex].highscore){
			playerArray[currentPlayerIndex].highscore = currentScore;
		}

		hero.bombPlace = false;
		hero.explosion = true;
	}
	if (newMonsterLocation.spawn == true){
		if(
			(bombLocation.x <= newMonsterLocation.x + 32)
			&& (bombLocation.y <= newMonsterLocation.y + 32)
			&& (newMonsterLocation.x <= bombLocation.x + 32)
			&& (newMonsterLocation.y <= bombLocation.y + 32)
		){
			console.log("The Bomb Destroyed the Monster!")
			document.getElementById('currentScore').innerHTML = currentScore += 1;
			if(currentScore > highScore) {
				highScore = currentScore;
				document.getElementById('highScore').innerHTML = highScore;
			}
			var currentPlayerIndex = playerArray.length - 1;
			if (currentScore > playerArray[currentPlayerIndex].highscore){
				playerArray[currentPlayerIndex].highscore = currentScore;
			}

			hero.bombPlace = false;
			hero.explosion = true;
		}
	}


}
function monsterFun() {
	if((monsterLocation.newX == monsterLocation.x) && (monsterLocation.newY == monsterLocation.y)) {
		monsterLocation.newX = Math.floor(Math.random() * 430);
		monsterLocation.newY = Math.floor(Math.random() * 430);
		// If I want the monster to chase the hero. use below code instead of above code.
		// monsterLocation.newX = heroLocation.x
		// monsterLocation.newY = heroLocation.y
	}
	else {
		if(monsterLocation.newX > monsterLocation.x) {
			monsterLocation.x += Math.ceil(Math.random()* 3);
		}
		if(monsterLocation.newX < monsterLocation.x) {
			monsterLocation.x -= Math.ceil(Math.random()* 3);
		}
		if(monsterLocation.newY > monsterLocation.y) {
			monsterLocation.y += Math.ceil(Math.random()* 3);
		}
		if(monsterLocation.newY < monsterLocation.y) {
			monsterLocation.y -= Math.ceil(Math.random()* 3);
		}
	}

}
function newMonsterFun() {
	if((newMonsterLocation.newX == newMonsterLocation.x) && (newMonsterLocation.newY == newMonsterLocation.y)) {
		newMonsterLocation.newX = Math.floor(Math.random() * 440);
		newMonsterLocation.newY = Math.floor(Math.random() * 440);
		// If I want the monster to chase the hero. use below code instead of above code.
		// monsterLocation.newX = heroLocation.x
		// monsterLocation.newY = heroLocation.y
	}
	else {
		if(newMonsterLocation.newX > newMonsterLocation.x) {
			newMonsterLocation.x += Math.ceil(Math.random()* 3);
		}
		if(newMonsterLocation.newX < newMonsterLocation.x) {
			newMonsterLocation.x -= Math.ceil(Math.random()* 3);
		}
		if(newMonsterLocation.newY > newMonsterLocation.y) {
			newMonsterLocation.y += Math.ceil(Math.random()* 3);
		}
		if(newMonsterLocation.newY < newMonsterLocation.y) {
			newMonsterLocation.y -= Math.ceil(Math.random()* 3);
		}
	}

}


// KEEP DRAW AT THE BOTTOM
function draw(){
	if(gameOn){
		update();
		monsterFun();
		newMonsterFun();
	}
	
	context.drawImage(backgroundImage, 0,0);
	context.drawImage(hero, heroLocation.x, heroLocation.y);
	context.drawImage(monster, monsterLocation.x, monsterLocation.y);

	if (hero.bombPlace == true){
		context.drawImage(bomb, bombLocation.x, bombLocation.y);
	}
	if (hero.bombTimer == true){
		hero.bombTimer = false;
		setTimeout(function(){
			hero.bombPlace = false;
		}, 6000);
		
	}
	if (hero.explosion == true){
		context.drawImage(explosion, bombLocation.x, bombLocation.y);
		bombLocation.x = 900;
		bombLocation.y = 900;
		hero.explosion = false;
		newMonsterLocation.spawn = true;
		// setTimeout(function(){
		// 	hero.explosion = false;
		// }, 1000);
	}
	if (newMonsterLocation.spawn == true){
		context.drawImage(newMonster, newMonsterLocation.x, newMonsterLocation.y);
	}
	requestAnimationFrame(draw);
}

draw();

