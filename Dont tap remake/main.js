// constants
const startButton = "<div id='start_button'>Start</div>";
const optionsButton = "<div id='options_button'>Options</div>";
const hiscoresButton = "<div id='hiscores_button'>Hiscores</div>";

class Game {
	constructor(){
		this.gridSize = options.gridSize;
		this.clickForTime = options.clickForTime;
		this.score = 0;
		this.time = options.time;
		this.clicks = 0;
		this.running = false;
		this.redTiles = options.redTiles;
		this.scoreMultiplier = options.scoreMultiplier;
		this.tileSize = Math.floor(800 / this.gridSize - 2);
		this.blackTiles = [];
		this.grid = [];
		var i;
		for (i = 0; i < this.gridSize * this.gridSize; i++) {
			this.grid.push(new Tile());
		}
	}
	resetGrid(){
		var i;
		for (i = 0; i < this.grid.length; i++){
			this.grid[i].black = false;
			this.grid[i].red = false;
		}
	}
	tick(){
		game.time -= 1;
		document.getElementById("time").innerHTML = "Time: " + game.time.toString();
		if (game.time <= 0 && game.running) {
			gameOver();
		} else if(game.running){
			setTimeout(game.tick, 1000);
		}
	}
}
class Tile {
	constructor () {
		this.black = false;
		this.red = false;
	}
}
class Options {
	constructor (){
		this.gridSize = 4;
		this.clickForTime = 40;
		this.time = 10;
		this.redTiles = false;
		this.updateScoreMultiplier();
	}
	
	// change grid size by 1 or -1
	changeGridSize(change){
		
		// see if the gridsize can be changed, change if so
		if (1 < this.gridSize + change && this.gridSize + change < 11){
			this.gridSize += change;
		}
		
		// update score multiplier, if the score multiplier goes negative,
		// revert the change
		this.updateScoreMultiplier();
		if (this.scoreMultiplier < 0){
			this.gridSize -= change;
			this.updateScoreMultiplier();
		}
		
		// update the document
		document.getElementById("scoreMultiplier").innerHTML = 
		"Score multiplier: " + this.scoreMultiplier.toString();
		document.getElementById("gridSizeLabel").innerHTML = "Gridsize: " 
		+ this.gridSize.toString();
	}
	
	// change time size by 1 or -1
	changeTime(change){
		
		// see if the time can still change and change it if so
		if (4 < this.time + change && this.time + change < 31){
			this.time += change;
		}
		
		// update score multiplier, if the score multiplier goes negative,
		// revert the change
		this.updateScoreMultiplier();
		if (this.scoreMultiplier < 0){
			this.time -= change;
			this.updateScoreMultiplier();
		}
		
		// update the document
		document.getElementById("scoreMultiplier").innerHTML = 
		"Score multiplier: " + this.scoreMultiplier.toString();
		document.getElementById("timeLabel").innerHTML = "Time: " 
		+ this.time.toString();
	}
	
	// change the click amount by 5 or -5
	changeClicksForTime(change){
		
		// see if the click amount can be changed and change if it can
		if (4 < this.clickForTime + change && 
		this.clickForTime + change < 71){
			this.clickForTime += change;
		}
		
		// update score multiplier, if the score multiplier goes negative,
		// revert the change
		this.updateScoreMultiplier();
		if (this.scoreMultiplier < 0){
			this.clickForTime -= change;
			this.updateScoreMultiplier();
		}
		
		// update the document
		document.getElementById("scoreMultiplier").innerHTML = 
		"Score multiplier: " + this.scoreMultiplier.toString();
		document.getElementById("clicksLabel").innerHTML = "Clicks: "
		+ this.clickForTime.toString();
	}
	
	// toggle red tiles
	changeRedTiles() {
		this.redTiles = this.redTiles === false;
		if (this.redTiles){
			document.getElementsByClassName("onOffButton")[0].innerHTML = "On";
		} else {
			document.getElementsByClassName("onOffButton")[0].innerHTML = "Off";
		}
		this.updateScoreMultiplier();
		document.getElementById("scoreMultiplier").innerHTML =
		"Score multiplier: " + this.scoreMultiplier.toString();
	}
	
	// updates score multiplier
	updateScoreMultiplier(){
		this.scoreMultiplier = (this.gridSize - 3) + (this.clickForTime/10 - 3) + (3 - this.time/5);
		this.scoreMultiplier /= 3;
		this.scoreMultiplier += 0.4 * this.redTiles;
	}
}
var options = new Options();
var game = new Game();
document.getElementById("menu").onclick = function(){mainMenu();};
document.getElementById("reset").onclick = function(){resetGame();};
mainMenu();

function mainMenu(){
	var gameScreen = document.getElementsByTagName("main")[0];
	
	// clear main and hide header
	gameScreen.innerHTML = "";
	document.getElementsByTagName("header")[0].style.display = "none";
	
	// create main menu buttons
	gameScreen.innerHTML += startButton;
	gameScreen.innerHTML += optionsButton;
	gameScreen.innerHTML += hiscoresButton;
	
	// add functions to the buttons
	document.getElementById("start_button").onclick = 
	function(){startGame();};
	document.getElementById("options_button").onclick = 
	function(){openOptions();};
	document.getElementById("hiscores_button").onclick = 
	function(){openHiscores();};
	
	game.running = false;
}
function startGame(){
	
	// create new game and show and update header
	game = new Game();
	document.getElementsByTagName("header")[0].style.display = "block";
	updateHeader();
	
	//clear main
	document.getElementsByTagName("main")[0].innerHTML = "";
	
	resetGame();
	
}
function openOptions(){
	
	// clear main
	var main = document.getElementsByTagName("main")[0]
	main.innerHTML = "";
	
	// add menu button
	main.innerHTML += "<div id='backtomenuSelection'></div>";
	var menuButton = document.getElementById("backtomenuSelection");
	menuButton.innerHTML += "<div id='backtomenu'>Back to menu</div>";
	
	// +, - and onoff buttons
	var plusButton = "<div class='plusButton'>+</div>";
	var minusButton = "<div class='minusButton'>-</div>";
	var onOffButton = "<div class='onOffButton'></div>";
	
	// add grid size selection
	main.innerHTML += "<div id='gridSizeSelection'></div>";
	var gridSizeSelection = document.getElementById("gridSizeSelection");
	var gridSizeLabel = "<h3 id='gridSizeLabel'>Gridsize: " + options.gridSize.toString() +"</h3>"
	gridSizeSelection.innerHTML += minusButton + gridSizeLabel + plusButton;
	
	// add time selection
	main.innerHTML += "<div id='timeSelection'></div>";
	var timeSelection = document.getElementById("timeSelection");
	var timeLabel = "<h3 id='timeLabel'>Time: " + options.time.toString() +"</h3>"
	timeSelection.innerHTML += minusButton + timeLabel + plusButton;
	
	// add clicks for more time selection
	main.innerHTML += "<div id='clicksSelection'></div>";
	var clicksSelection = document.getElementById("clicksSelection");
	var clicksLabel = "<h3 id='clicksLabel'>Clicks: " + options.clickForTime.toString() +"</h3>"
	clicksSelection.innerHTML += minusButton + clicksLabel + plusButton;
	
	// add red tile button
	main.innerHTML += "<div id='redTileSelection'></div>";
	var redTileSelection = document.getElementById("redTileSelection");
	var redTileLabel = "<h3 id='redTileLabel'>Red Tiles: </h3>";
	redTileSelection.innerHTML += redTileLabel + onOffButton;
	var redTiles;
	if (options.redTiles){
		redTiles = "On";
	} else {
		redTiles = "Off";
	}
	document.getElementsByClassName("onOffButton")[0].innerHTML = redTiles;
	
	// add score multiplier
	main.innerHTML += "<div id='scoreMultiplier'>Score multiplier: " + options.scoreMultiplier.toString() +"</div>";
	
	// set functions to buttons
	
	// back to menu button
	document.getElementById("backtomenu").onclick = function(){
		mainMenu();
	};
	
	// grid size buttons
	document.getElementsByClassName("plusButton")[0].onclick = function(){
		options.changeGridSize(1);
	};
	document.getElementsByClassName("minusButton")[0].onclick = function(){
		options.changeGridSize(-1);
	};
	
	// time buttons
	document.getElementsByClassName("plusButton")[1].onclick = function(){
		options.changeTime(1);
	};
	document.getElementsByClassName("minusButton")[1].onclick = function(){
		options.changeTime(-1);
	};
	
	// clicks buttons
	document.getElementsByClassName("plusButton")[2].onclick = function(){
		options.changeClicksForTime(5);
	};
	document.getElementsByClassName("minusButton")[2].onclick = function(){
		options.changeClicksForTime(-5);
	};
	
	// red tile button
	document.getElementsByClassName("onOffButton")[0].onclick = function(){
		options.changeRedTiles();
	};
}
function openHiscores(){
	console.log("hiscores");
}
function updateHeader() {
	document.getElementById("score").innerHTML = "Score: " + Math.round(game.score * 10)/10;
	document.getElementById("time").innerHTML = "Time: " + game.time.toString();
}

function resetGame() {
	
	if (game.onReset){ // return if the game is already being reset
		return;
	}
	
	// code below checks if the game is running, sets the running to
	// false and calls this function again after a second
	
	// the on reset attribute is being used to see if the game is already
	// being reset
	if (game.running) {
		game.running = false;
		game.onReset = true;
		setTimeout(function(){game.onReset = false;}, 1000);
		setTimeout(resetGame, 1000); 
		return;
	}
	// reset game data and update header
	game.score = 0;
	game.clicks = 0;
	game.running = true;
	game.time = options.time;
	game.resetGrid();
	updateHeader();
	
	// the time handling
	setTimeout(game.tick, 1000);
	
	// draw empty grid
	var i;
	var j;
	var grid = "";
	for (i = 0; i < game.gridSize; i++){
		var row = "";
		for (j = 0; j < game.gridSize; j++){
			row += "<div class='tile'></div>"
		}
		grid += row;
	}
	document.getElementsByTagName("main")[0].innerHTML = grid;
	
	// set tile sizes
	tileList = document.getElementsByClassName("tile");
	var i;
	for (i = 0; i < tileList.length; i++){
		tileList[i].style.width = game.tileSize.toString() + "px";
		tileList[i].style.height = game.tileSize.toString() + "px";
		tileList[i].onclick = function(){gameOver();};
		tileList[i].onmouseover = "";
	}
	
	// set red tiles
	if (game.redTiles){
		var reds = [];
		var n;
		var i = 0;
		while (reds.length < Math.ceil(game.gridSize / 2) && i < 150){
			n = Math.floor(Math.random() * game.gridSize * game.gridSize);
			if (!game.grid[n].red){
				setRed(tileList[n]);
				game.grid[n].red = true;
				reds.push(game.grid[n]);
			}
		}
	}
	
	// set random tiles to black
	game.blackTiles = [];
	var num;
	var i = 0;
	while (game.blackTiles.length < game.gridSize - 1 && i < 150) {
		num = Math.floor(Math.random() * game.gridSize*game.gridSize);
		if (!game.grid[num].black && !game.grid[num].red){
			setActive(tileList[num], num);
			game.grid[num].black = true;
			game.blackTiles.push(game.grid[num]);
		}
		i++;
	}
}
function setActive(tile, num){
	tile.style.backgroundColor = "black";
	tile.style.borderColor = "lightgrey";
	tile.onclick = function(){score(tile, num);};
}
function setRed(tile){
	tile.style.backgroundColor = "red";
	tile.onmouseover = function(){gameOver();};
}
function gameOver(){
	
	// disable tiles and animations
	tileList = document.getElementsByClassName("tile");
	var i;
	for (i = 0; i < tileList.length; i++){
		tileList[i].onclick = null;
		tileList[i].style.animationName = "";
	}
	game.running = false;
	
	//these 2 lines prevent the timer from breaking if the game is 
	// manually reset right after a game over
	game.onReset = true;
	setTimeout(function(){game.onReset = false;}, 1000);
	
	// display gameover and score
	var score = "Score: " + (Math.round(game.score * 100)/100).toString();
	document.getElementsByTagName("main")[0].innerHTML += "<div id='gameover'>Gameover!<br>" + 
	score + "</div>";
	document.getElementById("gameover").style.height = "100%";
	document.getElementById("gameover").style.paddingTop = 
	(game.tileSize * game.gridSize / 2 - 0.5*game.tileSize).toString() + "px";
}
function score(tile, num){
	
	// reset tile style and onlick
	tile.style.backgroundColor = "white";
	tile.style.borderColor = "black";
	tile.onclick = function(){gameOver();};
	
	// show score animation
	tile.style.animationName = "score";
	setTimeout(function (){tile.style.animationName = "";}, 500);
	
	// game logic:
	
	// add score and click, if enough clicks, increase time
	game.score += game.scoreMultiplier;
	game.clicks += 1;
	if (game.clicks === game.clickForTime) {
		game.time += options.time;
		game.clicks = 0;
	}
	
	updateHeader();
	
	// remove tile from the black tiles list and set the tiles black to false
	game.blackTiles.pop(game.grid[num]);
	game.grid[num].black = false;
	
	// roll a new random black tile
	tileList = document.getElementsByClassName("tile");
	var newnum;
	var i = 0;
	while (game.blackTiles.length < game.gridSize - 1 && i < 500) {
		newnum = Math.floor(Math.random() * game.gridSize*game.gridSize);
		
		// cannot be the same tile
		if (newnum == num){
			i++;
			continue;
		}
		
		// if the random tile is not black, set it to black
		if (!game.grid[newnum].black && !game.grid[newnum].red){
			setActive(tileList[newnum], newnum);
			game.grid[newnum].black = true;
			game.blackTiles.push(game.grid[newnum]);
		}
		i++;
	}
}