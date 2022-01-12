const gameScreen = document.getElementById("gamescreen");
const score = document.getElementById("score");
const maxBS = 100;
const minBS = 40;
const time = new Date();

class Game {
    constructor() {
        document.getElementById("play").onclick = () => { this.reStart(); };
    }

    reStart() {
        document.getElementById("play").setAttribute("onclick", null);
        document.getElementById("countdown").style.display = "flex";
        document.getElementById("countdownnum").setAttribute("innerHTML", "");
        this.pScore = 0;
        this.time = 0;
        this.speed = 60;
        this.blocks = [];
        this.countDown = 4;
        this.doCountDown();
    }

    doCountDown() {
        this.countDown--;
        document.getElementById("countdownnum").innerHTML = this.countDown;
        
        if (this.countDown == 0) {
            document.getElementById("countdown").style.display = "none";
            this.run();
            return;
        }
        setTimeout(() => {this.doCountDown();}, 1000);
    }

    // start of the main game loop
    run() {
        this.running = true;
        this.createBlock();
        this.updateTime();
        this.update();
    }
    createBlock() {
        if (!this.running) return;
        let size = minBS + Math.random() * (maxBS - minBS);
        let block = document.createElement("DIV");
        let num = Math.round(Math.random());
        block.setAttribute("class", ["green", "red"][num]);
        block.onmouseover = [() => { this.addscore(block); }, () => { this.gameOver(block); }][num];
        block.style.width = size.toString() + "px";
        block.style.height = size.toString() + "px";
        block.style.left = (Math.random() * (800 - size)).toString() + "px";
        block.style.top = "0px";
        gameScreen.appendChild(block);
        this.blocks.push(block);
        console.log(this.blocks.length);
        setTimeout(() => { this.createBlock(); }, 1000 * this.speed / 60);
    }
    updateTime() {
        if (!this.running) return;
        this.time++;
        setTimeout(() => { this.updateTime(); }, 1000);
    }
    update() {
        if (!this.running) return;
        this.blocks.forEach(block => {
            if (parseInt(block.style.top) > 600 - parseInt(block.style.height)) {
                console.log(block.className);
                if (block.className === "green") {
                    this.gameOver(block);
                    return;
                }
                this.blocks = this.blocks.filter(elem => { return elem !== block;});
                gameScreen.removeChild(block);
            }
            block.style.top = (parseInt(block.style.top) + 10).toString() + "px";
        });
        setTimeout(() => { this.update(); }, 20);
    }
    addscore(block) {
        this.blocks = this.blocks.filter(elem => { return block !== elem; });
        gameScreen.removeChild(block);
        this.pScore++;
        document.getElementById("score").innerHTML = this.pScore;
        if (this.speed > 20) this.speed--;
    }
    gameOver(block) {
        this.running = false;
        block.style.animationName = "flashing";
        block.style.animationIterationCount = 5;
        block.style.animationDuration = "1s";
        this.blocks.forEach(elem => { elem.onmouseover = "";});
        document.getElementById("play").onclick = () => { this.reset(); };
        console.log("ded");
    }
    reset() {
        this.blocks.forEach(block => { gameScreen.removeChild(block); });
        this.reStart();
    }
}

const gaem = new Game();