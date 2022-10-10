var canv, cont;
canv = document.getElementById("canv");
var spaceship = new Image();
var backgrd = new Image();
var dust1 = new Image();
var dust2 = new Image();
var enemy1 = new Image();
var enemy2 = new Image();
var enemy3 = new Image();
var bullet1 = new Image();
var bullet2 = new Image();
var heat1 = new Image();
var heat2 = new Image();

var shoot1 = new Audio("sound/shoot1.ogg");
var shoot2 = new Audio("sound/shoot2.ogg");
var death1 = new Audio("sound/death1.ogg");
var death2 = new Audio("sound/death2.ogg");
var music1 = new Audio("sound/music1.ogg");
var alert1 = new Audio("sound/alert1.ogg");

var dustBigCount = 0;
var dustSmallCount = 0;
var enemy1Count = 0;
var enemy2Count = 0;
var enemy3Count = 0;
var bullet1Count = 0;
var bullet2Count = 0;
var bullet3Count = 0;
var imagesLoaded = 0;
var c_dustCD = 400;
var c_dustCDS = 80;
var c_enemy1CD = 500;
var c_enemy2CD = 10000;
var c_enemy3CD = 500;
var time, start, elaps;
var c_bullet1CD = 300;
var c_bullet2CD = 50;
var c_bullet3CD = 300;
var dustCD = c_dustCD;
var dustCDS = c_dustCDS;
var enemy1CD = c_enemy1CD;
var enemy2CD = c_enemy2CD;
var enemy3CD = c_enemy3CD;
var bullet1CD = c_bullet1CD;
var bullet2CD = c_bullet2CD;
var bullet3CD = c_bullet3CD;
var dustBigArray = [];
var dustSmallArray = [];
var enemy1Array = [];
var enemy2Array = [];
var enemy3Array = [];
var bullet1Array = [];
var bullet2Array = [];
var bullet3Array = [];
var deadEnemy1Array = [];
var deadEnemy2Array = [];
var deadEnemy3Array = [];
var gamePause = 0;
var playerDead = 0;
var playerFlashing = 1;
var whiteoutOpacity = 1;
var bulletAmount = 0;
var blackinOpacity = 0;
var gameoverOpacity = 0;
var heat = 0;
var overheat = 0;
var playerScore = 0;
var killCount = 0;

function genDustBig(){
    var tempDustBig;
    for (let i = 0; i <= 1; i++) {
        tempDustBig = Object.create(dustA);
        dustBigCount++;
        if (dustBigCount % 2) {
            tempDustBig.x = Math.random()*396;
        }
        else {
            tempDustBig.x = Math.random()*396+396;
        }
        tempDustBig.init();
        dustBigArray.push(tempDustBig);
    }
}
function genDustSmall(y){
    // var tempDustSmall;
    y = (typeof y === 'undefined') ? -64 : y;
    for (let i = 0; i <= 0; i++) {
        var tempDustSmall = Object.create(dustB);
        tempDustSmall.init();
        dustSmallCount++;
        tempDustSmall.x = Math.random()*794;
        tempDustSmall.y = y;
        dustSmallArray.push(tempDustSmall);
    }
}
function genEnemy1(){
    var tempEnemy1;
    for (let i = 0; i <= 0; i++) {
        tempEnemy1 = Object.create(enemy1_obj);
        enemy1Count++;
        tempEnemy1.x = Math.random()*736;
        tempEnemy1.init();
        enemy1Array.push(tempEnemy1);
        tempEnemy1.objname = "enemy01object " + enemy1Count + "";
        tempEnemy1.isDead = 0;
        tempEnemy1.deadAnimation = 1;
        tempEnemy1.deadIndex = -1;
    }
}

function genEnemy2(){
    var tempEnemy2;
    for (let i = 0; i <= 0; i++) {
        tempEnemy2 = Object.create(enemy2_obj);
        enemy2Count++;
        tempEnemy2.x = Math.random()*736;
        tempEnemy2.init();
        enemy2Array.push(tempEnemy2);
        tempEnemy2.objname = "enemy02object " + enemy2Count + "";
        tempEnemy2.shootCD = 0;
        tempEnemy2.isDead = 0;
        tempEnemy2.deadAnimation = 1;
        tempEnemy2.deadIndex = -1;
    }
}

function genEnemy3(){
    var tempEnemy3;
    for (let i = 0; i <= 0; i++) {
        tempEnemy3 = Object.create(enemy3_obj);
        enemy3Count++;
        tempEnemy3.x = Math.random()*736;
        tempEnemy3.init();
        enemy3Array.push(tempEnemy3);
        tempEnemy3.objname = "enemy03object " + enemy3Count + "";
        tempEnemy3.shootCD = 0;
        tempEnemy3.isDead = 0;
        tempEnemy3.deadAnimation = 1;
        tempEnemy3.deadIndex = -1;
    }
}

// function genDeadEnemy1(){
//     var tempDeadEnemy1;
//     var genDeadEnemy1X = 0;
//     var genDeadEnemy1Y = 0;
//     for (let i = 0; i <= 0; i++) {
//         tempDeadEnemy1 = Object.create(deadEnemy1_obj);
//         deadEnemy1Count++;
//         tempDeadEnemy1.x = genDeadEnemy1X;
//         tempDeadEnemy1.y = genDeadEnemy1Y;
//         tempDeadEnemy1.init();
//         bullet1Array.push(tempDeadEnemy1);
//     }
// }
function genBullet1(){
    var tempBullet1;
    for (let i = 0; i <= bulletAmount; i++) {
        tempBullet1 = Object.create(bullet1_obj);
        bullet1Count++;
        tempBullet1.x = plr.x + 16;
        tempBullet1.y = plr.y;
        tempBullet1.init();
        bullet1Array.push(tempBullet1);
    }
}
function genBullet2(){
    var tempBullet2;
    for (let i = 0; i <= 0; i++) {
        tempBullet2 = Object.create(bullet2_obj);
        bullet2Count++;
        tempBullet2.init();
        bullet2Array.push(tempBullet2);
    }
}
function genBullet3(){
    var tempBullet3;
    for (let i = 0; i <= 0; i++) {
        tempBullet3 = Object.create(bullet3_obj);
        bullet3Count++;
        tempBullet3.init();
        bullet3Array.push(tempBullet3);
    }
}


var Key = {
    _pressed: {},

    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    SHIFT: 16,
    P: 80,
    Z: 90,
    R: 82,
    X: 88,

    isDown: function(keyCode) {
        return this._pressed[keyCode];
    },

    onKeydown: function(event) {
        this._pressed[event.keyCode] = true;
    },

    onKeyup: function(event) {
        delete this._pressed[event.keyCode];
    }
};
window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

var isReset = 0;

var btnrPriority = 1;
var btndPriority = 1;
var holdRight = 0;
var holdLeft = 0;
var holdUp = 0;
var holdDown = 0;
const player = {
    x: 368,
    y: 504,
    imageLoaded: 0,
    playerSpeed: elaps/3,
    togglePause: 0,
    update() {
        // if (enemy1_obj.x > this.x && enemy1_obj.x < this.x + 64) alert("Сасат");
        if (Key.isDown(Key.P) && !gamePause && !this.togglePause) {
            gamePause = 1;
            this.togglePause = 1;
        }
        if (Key.isDown(Key.P) && gamePause && !this.togglePause) {
            gamePause = 0;
            this.togglePause = 1;
        }
        if (!Key.isDown(Key.P)) this.togglePause = 0;

        if (!gamePause) {
            if (Key.isDown(Key.SHIFT)) {
                this.playerSpeed = elaps / 6;
                if (overheat === 0) c_bullet1CD = 100;
                if (overheat === 1) c_bullet1CD = 500;
                if (overheat === 2) c_bullet1CD = 1000;
            }
            else {
                this.playerSpeed = elaps / 3;
                if (overheat === 0) c_bullet1CD = 200;
                if (overheat === 1) c_bullet1CD = 500;
                if (overheat === 2) c_bullet1CD = 1000;
            };
            if (Key.isDown(Key.RIGHT)) holdRight++;
            if (Key.isDown(Key.LEFT)) holdLeft++;
            if (Key.isDown(Key.LEFT) && Key.isDown(Key.RIGHT) && holdRight > holdLeft) {
                btnrPriority = 0;
                holdLeft = 0;
                holdRight = 0;
            }
            if (Key.isDown(Key.LEFT) && Key.isDown(Key.RIGHT) && holdRight < holdLeft) {
                btnrPriority = 2;
                holdLeft = 0;
                holdRight = 0;
            }
            if (!Key.isDown(Key.LEFT) && !Key.isDown(Key.RIGHT)) {
                btnrPriority = 1;
                holdLeft = 0;
                holdRight = 0;
            }
            if (Key.isDown(Key.RIGHT) && !Key.isDown(Key.LEFT) && btnrPriority < 1 && this.x <= 736) this.x += this.playerSpeed;
            if (!Key.isDown(Key.RIGHT) && Key.isDown(Key.LEFT) && btnrPriority > 1 && this.x >= 0) this.x -= this.playerSpeed;
            if (Key.isDown(Key.LEFT) && this.x >= 0 && btnrPriority <= 1) this.x -= this.playerSpeed;
            if (Key.isDown(Key.RIGHT) && this.x <= 736 && btnrPriority >= 1) this.x += this.playerSpeed;
            if (Key.isDown(Key.DOWN)) holdDown++;
            if (Key.isDown(Key.UP)) holdUp++;
            if (Key.isDown(Key.UP) && Key.isDown(Key.DOWN) && holdDown > holdUp) {
                btndPriority = 0;
                holdUp = 0;
                holdDown = 0;
            }
            if (Key.isDown(Key.UP) && Key.isDown(Key.DOWN) && holdDown < holdUp) {
                btndPriority = 2;
                holdUp = 0;
                holdDown = 0;
            }
            if (!Key.isDown(Key.UP) && !Key.isDown(Key.DOWN)) {
                btndPriority = 1;
                holdUp = 0;
                holdDown = 0;
            }
            if (Key.isDown(Key.DOWN) && !Key.isDown(Key.UP) && btndPriority < 1 && this.y <= 536) this.y += this.playerSpeed;
            if (!Key.isDown(Key.DOWN) && Key.isDown(Key.UP) && btndPriority > 1 && this.y >= 0) this.y -= this.playerSpeed;
            if (Key.isDown(Key.UP) && this.y >= 0 && btndPriority <= 1) this.y -= this.playerSpeed;
            if (Key.isDown(Key.DOWN) && this.y <= 536 && btndPriority >= 1) this.y += this.playerSpeed;
        }
    },
    draw() {
        if (imagesLoaded) cont.drawImage(spaceship, this.x, this.y);
    }
};
const plr = Object.create(player);

const whiteout_obj = {
        update() {
            whiteoutOpacity -= elaps/800;
        },
        draw() {
            cont.rect(0, 0, 800, 600);
            cont.fillStyle = "rgba(255, 255, 255, " + whiteoutOpacity + ")";
            cont.fill();
        }
    };
const whiteout = Object.create(whiteout_obj);

const blackin_obj = {
    update() {
        blackinOpacity += elaps/1000;
    },
    draw() {
        cont.rect(0, 0, 800, 600);
        cont.fillStyle = "rgba(0, 0, 0, " + blackinOpacity + ")";
        cont.fill();
    }
};
const blackin = Object.create(blackin_obj);

const gameover_obj = {
    update() {
        gameoverOpacity += elaps/1000;
        if (Key.isDown(Key.R)) {
            cont.clearRect(0, 0, 800, 600);
            isReset = 1;
        }
    },
    draw() {
        cont.font = "35px Verdana";
        cont.textAlign = "center";
        cont.fillStyle = "rgba(255, 255, 255," + gameoverOpacity + ")";
        cont.fillText("GAME OVER", 400, 300);
        cont.fillText("Press R to restart", 400, 400);
    }
};
const gameover = Object.create(gameover_obj);

var btnxPriority = 1;


const bullet1_obj = {
    x: plr.x,
    y: plr.y,
    imageLoaded: 0,
    speeddd: 0,
    speedx: 0,
    init() {
        heat += elaps*2;
        if ((Key.isDown(Key.Z) && !Key.isDown(Key.X) && btnxPriority > 1) || (Key.isDown(Key.Z) && btnxPriority <= 1)) {
            this.speeddd = elaps*4;
            if (Key.isDown(Key.SHIFT)) {
                if (bullet1Count % 2) this.speedx = Math.random()*elaps;
                else this.speedx = -(Math.random()*elaps);
            };
        }
        if ((Key.isDown(Key.X) && !Key.isDown(Key.Z) && btnxPriority < 1) || (Key.isDown(Key.X) && btnxPriority >= 1)) {
            this.speddd = 0;
            if (bullet1Count % 2) this.speedx = elaps*4;
            else this.speedx = -elaps*4;
            if (Key.isDown(Key.SHIFT) && !Key.isDown(Key.Z)) {
                if (bullet1Count % 3) this.speeddd = Math.random()*elaps;
                else this.speeddd = -(Math.random()*elaps);
            }
            if (Key.isDown(Key.SHIFT) && Key.isDown(Key.Z)) {
                if (bullet1Count % 2) this.speedx = (Math.random()*elaps)*2;
                else this.speedx = -(Math.random()*elaps)*2;
            }
        };
        shoot1.load();
        shoot1.play();
        // if (Key.isDown(Key.SHIFT)) {
        //     if (bullet1Count % 2) this.speedx = Math.random()*elaps;
        //     else this.speedx = -(Math.random()*elaps);
        // };
        if (Key.isDown(Key.X)) bulletAmount = 1;
        else bulletAmount = 0;
    },
    update() {
        this.y -= (this.speeddd)/8;
        this.x += this.speedx/8;
    },
    draw() {
        if (imagesLoaded) cont.drawImage(bullet1, this.x, this.y);
    }
};

var bullet2Sequence = 0;
const bullet2_obj = {
    imageLoaded: 0,
    speeddd: 0,
    speedx: 0,
    init() {
        if (enemy2Array[bullet2Sequence] === undefined) bullet2Sequence = 0;
        this.x = enemy2Array[bullet2Sequence].x + 16;
        this.y = enemy2Array[bullet2Sequence].y + 32;
        if (Math.random() >= 0.5) this.speedx = Math.random()*elaps;
        else this.speedx = -(Math.random()*elaps);
        this.speeddd = -elaps*8;
        shoot2.load();
        shoot2.play();
        if (bullet2Sequence < enemy2Array.length) bullet2Sequence++;
    },
    update() {
        this.y -= (this.speeddd)/24;
        this.x += this.speedx/12;
        if (bullet2Sequence >= enemy2Array.length) bullet2Sequence = 0;
    },
    draw() {
        if (imagesLoaded) cont.drawImage(bullet2, this.x, this.y);
    }
};

var bullet3Sequence = 0;
const bullet3_obj = {
    imageLoaded: 0,
    speeddd: 0,
    speedx: 0,
    init() {
        if (enemy3Array[bullet3Sequence] === undefined) bullet3Sequence = 0;
        this.x = enemy3Array[bullet3Sequence].x + 16;
        this.y = enemy3Array[bullet3Sequence].y + 32;
        this.speeddd = (this.y - plr.y)*elaps;
        this.speedx = (plr.x + 16 - this.x)*elaps;
        shoot2.load();
        shoot2.play();
        if (bullet3Sequence < enemy3Array.length) bullet3Sequence++;
    },
    update() {
        this.y -= (this.speeddd)/800;
        this.x += this.speedx/800;
        if (bullet3Sequence >= enemy3Array.length) bullet3Sequence = 0;
    },
    draw() {
        if (imagesLoaded) cont.drawImage(bullet2, this.x, this.y);
    }
};

const overheatAlert = {
    frameAnimation: 1,
    update() {
        this.frameAnimation += 0.5;
        if (heat >= 0 && heat < 2000 && !Key.isDown(Key.Z) && !Key.isDown(Key.X)) heat -= (3*elaps)/10;
        if (heat >= 2000 && !Key.isDown(Key.Z) && !Key.isDown(Key.X)) heat -= (elaps)/10;
        if (heat >= 2000 && heat < 2200) overheat = 1;
        else if (heat >= 2200) overheat = 2;
        else overheat = 0;
    },
    draw() {
        alert1.loop = true;
        if (overheat >= 1) alert1.play();
        else {
            alert1.pause();
            alert1.currentTime = 0;
        }
        if (overheat >= 1 && this.frameAnimation % 2) cont.drawImage(heat1, plr.x, plr.y - 32);
        else if (overheat >= 1) cont.drawImage(heat2, plr.x, plr.y - 32);

    }
};

const enemy1_obj = {
    x: Math.random()*736,
    y: -64,
    imageLoaded: 0,
    speeddd: 0,
    speedx: 0,
    init() {
        this.speeddd = Math.random()*4;
    },
    update() {
        this.y += (this.speeddd+elaps*1.3)/3;
        if (plr.x >= this.x) this.speedx = elaps * 1.5;
        else if (plr.x <= this.x + 32) this.speedx = -(elaps * 1.5);
        this.x += this.speedx/20;
    },
    draw() {
        if (imagesLoaded) cont.drawImage(enemy1, this.x, this.y);
    }
};

const enemy2_obj = {
    x: Math.random()*736,
    y: -64,
    imageLoaded: 0,
    speeddd: 0,
    speedx: 0,
    init() {
        this.speeddd = Math.random()*4;
    },
    update() {
        this.y += (this.speeddd+elaps*1.3)/16;
    },
    draw() {
        if (imagesLoaded) cont.drawImage(enemy2, this.x, this.y);
    }
};

const enemy3_obj = {
    x: Math.random()*736,
    y: -64,
    imageLoaded: 0,
    speeddd: 0,
    speedx: 0,
    init() {
        this.speeddd = Math.random()*4;
    },
    update() {
        this.y += (this.speeddd+elaps*1.3)/6;
        if (plr.x >= this.x) this.speedx = elaps*2;
        else if (plr.x <= this.x + 32) this.speedx = -(elaps*2);
        this.x += this.speedx/20;
    },
    draw() {
        if (imagesLoaded) cont.drawImage(enemy3, this.x, this.y);
    }
};

const dustA = {
    x: Math.random()*784,
    y: -64,
    imageLoaded: 0,
    speeddd: 0,
    speedx: 0,
    init() {
        this.speeddd = Math.random()*4;
        if (dustBigCount % 2) this.speedx = Math.random()*8+elaps;
        else this.speedx = -(Math.random()*8+elaps);
    },
    update() {
        this.y += (this.speeddd+elaps)/4;
        this.x += this.speedx/150;
    },
    draw() {
        if (imagesLoaded) cont.drawImage(dust1, this.x, this.y);
    }
};
// const dustBig = Object.create(dustA);

const dustB = {
    x: Math.random()*792,
    y: -64,
    imageLoaded: 0,
    speeddd: 0,
    speedx: 0,
    init() {
        this.speeddd = Math.random()*2;
        if (dustBigCount % 2) this.speedx = Math.random()*4+elaps;
        else this.speedx = -(Math.random()*4+elaps);
    },
    update() {
        this.y += (this.speeddd+elaps)/12;
        this.x += this.speedx/2500;
    },
    draw() {
        if (imagesLoaded) cont.drawImage(dust2, this.x, this.y);
    }
};

const musicPlayer_obj = {
    init() {
        music1.loop = true;
        music1.play();
    },
};
const musicPlayer = Object.create(musicPlayer_obj);

const pauseDraw = {
    draw() {
        cont.font = "35px Verdana";
        cont.textAlign = "center";
        cont.lineWidth = 6;
        cont.strokeStyle = "rgba (0, 0, 0, 1)";
        if (gamePause === 1) cont.strokeText("PAUSED", 400, 300);
        cont.fillStyle = "rgba(255, 255, 255, 1)";
        if (gamePause === 1) cont.fillText("PAUSED", 400, 300);
    }
};

const playerScoreDraw = {
    draw() {
        cont.font = "25px Verdana";
        cont.textAlign = "left";
        cont.lineWidth = 6;
        cont.strokeStyle = "rgba (0, 0, 0, 1)";
        cont.strokeText("SCORE: " + Math.floor(playerScore) + "", 10, 30);
        cont.fillStyle = "rgba(255, 255, 255, 1)";
        cont.fillText("SCORE: " + Math.floor(playerScore) + "", 10, 30);
    }
};

const killCountDraw = {
    draw() {
        cont.font = "25px Verdana";
        cont.textAlign = "right";
        cont.lineWidth = 6;
        cont.strokeStyle = "rgba (0, 0, 0, 1)";
        cont.strokeText("KILLS: " + Math.floor(killCount) + "", 790, 30);
        cont.fillStyle = "rgba(255, 255, 255, 1)";
        cont.fillText("KILLS: " + Math.floor(killCount) + "", 790, 30);
    }
};

spaceship.onload = function() {
    imagesLoaded = imagesLoaded || 1;
};
dust1.onload = function() {
    imagesLoaded = imagesLoaded || 1;
};
dust2.onload = function() {
    imagesLoaded = imagesLoaded || 1;
};
backgrd.onload = function () {
    cont.drawImage (backgrd, 0, 0);
};
enemy1.onload = function () {
    imagesLoaded = imagesLoaded || 1;
};
enemy2.onload = function () {
    imagesLoaded = imagesLoaded || 1;
};
enemy3.onload = function () {
    imagesLoaded = imagesLoaded || 1;
};
bullet1.onload = function () {
    imagesLoaded = imagesLoaded || 1;
};
bullet2.onload = function () {
    imagesLoaded = imagesLoaded || 1;
};
heat1.onload = function () {
    imagesLoaded = imagesLoaded || 1;
};

spaceship.src = "images/spaceship.png";
backgrd.src = "images/background.png";
dust1.src = "images/dust1.png";
dust2.src = "images/dust2.png";
enemy1.src = "images/enemy1.png";
enemy2.src = "images/enemy2.png";
enemy3.src = "images/enemy3.png";
bullet1.src = "images/bullet1.png";
bullet2.src = "images/bullet2.png";
heat1.src = "images/heat1.png";
heat2.src = "images/heat2.png";

shoot1.src = "sound/shoot1.ogg";
shoot2.src = "sound/shoot2.ogg";
music1.src = "sound/music1.ogg";
alert1.src = "sound/alert1.ogg";

function drawing() {
    cont = canv.getContext("2d");
    cont.clearRect(0,0,800,600);
    time = new Date();
    elaps = time-start;
    start = time;
    // if (document.hasFocus()) gamePause = 0;
    // else gamePause = 1;
    // gamePause = gamePause || !document.hasFocus();

    if (!gamePause && !playerDead) playerScore += elaps/500;

    dustCD -= elaps;
    if (dustCD <= 0 && !gamePause) {
        dustCD = c_dustCD;
        genDustBig();
    }
    dustCDS -= elaps;
    if (dustCDS <= 0 && !gamePause) {
        dustCDS = c_dustCDS;
        genDustSmall();
    }
    enemy1CD -= elaps;
    if (enemy1CD <= 0 && !gamePause) {
        enemy1CD = c_enemy1CD;
        genEnemy1();
    }
    enemy2CD -= elaps;
    if (enemy2CD <= 0 && !gamePause && enemy2Array.length <= 2) {
        enemy2CD = c_enemy2CD;
        genEnemy2();
    }
    enemy3CD -= elaps;
    if (enemy3CD <= 0 && !gamePause) {
        enemy3CD = c_enemy3CD;
        genEnemy3();
    }
    bullet1CD -= elaps;
    if (bullet1CD <= 0 && !gamePause && Key.isDown(Key.Z) && !playerDead) {
        bullet1CD = c_bullet1CD;
        genBullet1();
    }
    if (bullet1CD <= 0 && !gamePause && Key.isDown(Key.X) && !playerDead) {
        bullet1CD = c_bullet1CD;
        genBullet1();
    }

    if (!gamePause) {
        if (c_enemy1CD >= 100) c_enemy1CD -= elaps / 150;
        if (c_enemy2CD >= 500) c_enemy2CD -= elaps / 300;
        if (c_enemy3CD >= 1500) c_enemy3CD -= elaps / 500;
        if (c_dustCD >= 50) c_dustCD -= elaps / 1000;
        if (c_dustCDS >= 1) c_dustCDS -= elaps / 2000;
    }

    if (!playerDead) plr.update();
    if (!gamePause) whiteout.update();
    if (playerDead) blackin.update();
    if (blackinOpacity >= 1) gameover.update();
    if (!gamePause) overheatAlert.update();

    backgrd.onload();
    dustBigArray.forEach(tempDust => {
        if (!gamePause) tempDust.update();
        tempDust.draw();
        if (tempDust.y > 800) {
            dustBigArray.shift();
        }
    });
    dustSmallArray.forEach(tempDust => {
        if (!gamePause) tempDust.update();
        tempDust.draw();
        if (tempDust.y > 800) {
            dustSmallArray.shift();
        }
    });
    bullet2Array.forEach(tempBullet02 => {
        if (!gamePause) tempBullet02.update();
        tempBullet02.draw();
        if (tempBullet02.y < -1000 || tempBullet02.x < -2000 || tempBullet02.x > 2000) {
            bullet2Array.shift();
        }
        if (plr.y + 24 < tempBullet02.y + 24 &&
            plr.y + 40 > tempBullet02.y + 8 &&
            plr.x + 24< tempBullet02.x + 24 &&
            plr.x + 40 > tempBullet02.x + 8) {
            if (!playerDead) death1.play();
            playerDead = 1;
        }
    });

    bullet3Array.forEach(tempBullet03 => {
        if (!gamePause) tempBullet03.update();
        tempBullet03.draw();
        if (tempBullet03.y < -1000 || tempBullet03.x < -2000 || tempBullet03.x > 2000) {
            bullet3Array.shift();
        }
        if (plr.y + 24 < tempBullet03.y + 24 &&
            plr.y + 40 > tempBullet03.y + 8 &&
            plr.x + 24< tempBullet03.x + 24 &&
            plr.x + 40 > tempBullet03.x + 8) {
            if (!playerDead) death1.play();
            playerDead = 1;
        }
    });
    enemy1Array.forEach(tempEnemy01 => {
        if (!gamePause && !tempEnemy01.isDead) tempEnemy01.update();
        if (tempEnemy01.deadAnimation % 2) tempEnemy01.draw();
        if (tempEnemy01.y > 1000) enemy1Array.shift();
        if (plr.y + 24 < tempEnemy01.y + 64 &&
            plr.y + 40 > tempEnemy01.y &&
            plr.x + 24< tempEnemy01.x + 48 &&
            plr.x + 40 > tempEnemy01.x + 16 && !tempEnemy01.isDead) {
            if (!playerDead) death1.play();
            playerDead = 1;
        }
    });
    enemy2Array.forEach(tempEnemy02 => {
        var c_shootCD = 100;
        tempEnemy02.shootCD -= elaps;
        if (tempEnemy02.shootCD <= 0 && !gamePause && !playerDead) {
            tempEnemy02.shootCD = c_shootCD;
            bullet2Array.forEach(tempBullet02 => {
                tempBullet02.initialX = tempEnemy02.x;
                tempBullet02.initialY = tempEnemy02.y;
            });
            genBullet2();
        }
        if (!gamePause && !tempEnemy02.isDead) tempEnemy02.update();
        if (tempEnemy02.deadAnimation % 2) tempEnemy02.draw();
        if (tempEnemy02.y > 700) enemy2Array.shift();
        if (plr.y + 24 < tempEnemy02.y + 64 &&
            plr.y + 40 > tempEnemy02.y &&
            plr.x + 24< tempEnemy02.x + 48 &&
            plr.x + 40 > tempEnemy02.x + 16 && !tempEnemy02.isDead) {
            if (!playerDead) death1.play();
            playerDead = 1;
        }
    });
    enemy3Array.forEach(tempEnemy03 => {
        var c_shootCD = 800;
        tempEnemy03.shootCD -= elaps;
        if (tempEnemy03.shootCD <= 0 && !gamePause && !playerDead) {
            tempEnemy03.shootCD = c_shootCD;
            bullet2Array.forEach(tempBullet03 => {
                tempBullet03.initialX = tempEnemy03.x;
                tempBullet03.initialY = tempEnemy03.y;
            });
            genBullet3();
        }
        if (!gamePause && !tempEnemy03.isDead) tempEnemy03.update();
        if (tempEnemy03.deadAnimation % 2) tempEnemy03.draw();
        if (tempEnemy03.y > 665) enemy3Array.shift();
        if (plr.y + 24 < tempEnemy03.y + 64 &&
            plr.y + 40 > tempEnemy03.y &&
            plr.x + 24< tempEnemy03.x + 48 &&
            plr.x + 40 > tempEnemy03.x + 16 && !tempEnemy03.isDead) {
            if (!playerDead) death1.play();
            playerDead = 1;
        }
    });

    bullet1Array.forEach(tempBullet01 => {
        if (!gamePause) tempBullet01.update();
        tempBullet01.draw();
        if (tempBullet01.y < -1000 || tempBullet01.x < -2000 || tempBullet01.x > 2000) {
            bullet1Array.shift();
        }
    });

    enemy1Array.forEach(tempEnemy01 => {
            if (tempEnemy01.isDead) {
                tempEnemy01.speeddd = 0;
                tempEnemy01.deadAnimation += 1;
            }
            bullet1Array.forEach(tempBullet01 => {
                    if (tempBullet01.y + 8 < tempEnemy01.y + 64 &&
                        tempBullet01.y + 24 > tempEnemy01.y &&
                        tempBullet01.x + 8 < tempEnemy01.x + 48 &&
                        tempBullet01.x + 24 > tempEnemy01.x + 16) {
                        deadEnemy1Array.push(tempEnemy01);
                        tempEnemy01.deadIndex = enemy1Array.indexOf(tempEnemy01);
                        // tempEnemy01.y = 900;
                        enemy1Array.splice(tempEnemy01.deadIndex,1);
                        tempEnemy01.isDead = 1;
                        playerScore += 1;
                        killCount++;
                        death2.load();
                        death2.play();
                    }
            });
        });
        deadEnemy1Array.forEach(tempEnemy01 => {
            if (tempEnemy01.deadAnimation % 2) tempEnemy01.draw();
           tempEnemy01.deadAnimation += 1;
            if (tempEnemy01.deadAnimation >= 10 ) deadEnemy1Array.shift();
        });

        enemy2Array.forEach(tempEnemy02 => {
            if (tempEnemy02.isDead) {
                tempEnemy02.speeddd = 0;
                tempEnemy02.deadAnimation += 1;
            }
            bullet1Array.forEach(tempBullet01 => {
                if (tempBullet01.y + 8 < tempEnemy02.y + 64 &&
                    tempBullet01.y + 24 > tempEnemy02.y &&
                    tempBullet01.x + 8 < tempEnemy02.x + 48 &&
                    tempBullet01.x + 24 > tempEnemy02.x + 16) {
                    deadEnemy2Array.push(tempEnemy02);
                    tempEnemy02.deadIndex = enemy2Array.indexOf(tempEnemy02);
                    enemy2Array.splice(tempEnemy02.deadIndex,1);
                    tempEnemy02.isDead = 1;
                    playerScore += 3;
                    killCount++;
                    death2.load();
                    death2.play();
                }
            });
        });
        deadEnemy2Array.forEach(tempEnemy02 => {
            if (tempEnemy02.deadAnimation % 2) tempEnemy02.draw();
            tempEnemy02.deadAnimation += 1;
            if (tempEnemy02.deadAnimation >= 10 ) deadEnemy2Array.shift();
        });

        enemy3Array.forEach(tempEnemy03 => {
            if (tempEnemy03.isDead) {
                tempEnemy03.speeddd = 0;
                tempEnemy03.deadAnimation += 1;
            }
            bullet1Array.forEach(tempBullet01 => {
                if (tempBullet01.y + 8 < tempEnemy03.y + 64 &&
                    tempBullet01.y + 24 > tempEnemy03.y &&
                    tempBullet01.x + 8 < tempEnemy03.x + 48 &&
                    tempBullet01.x + 24 > tempEnemy03.x + 16) {
                    deadEnemy3Array.push(tempEnemy03);
                    tempEnemy03.deadIndex = enemy3Array.indexOf(tempEnemy03);
                    // tempEnemy01.y = 900;
                    enemy3Array.splice(tempEnemy03.deadIndex,1);
                    tempEnemy03.isDead = 1;
                    playerScore += 5;
                    killCount++;
                    death2.load();
                    death2.play();
                }
            });
        });
        deadEnemy3Array.forEach(tempEnemy03 => {
            if (tempEnemy03.deadAnimation % 2) tempEnemy03.draw();
            tempEnemy03.deadAnimation += 1;
            if (tempEnemy03.deadAnimation >= 10 ) deadEnemy3Array.shift();
        });


        if (playerDead) playerFlashing += 1;
    if (playerFlashing % 2) plr.draw();

    overheatAlert.draw();
    pauseDraw.draw();
    blackin.draw();
    gameover.draw();
    playerScoreDraw.draw();
    killCountDraw.draw();
    whiteout.draw();

    musicPlayer.init();

    console.log(bullet2Sequence);
    // console.log(enemy2Array.length);

    if (isReset) init();
    else window.requestAnimationFrame(drawing);
}

function init() {
    time = new Date();
    start = time;
    genDustBig();
    genDustSmall();
    for (let i = -64; i <= 600; i += 4) {
        genDustSmall(i);
    }

    dustBigCount = 0;
    dustSmallCount = 0;
    enemy1Count = 0;
    enemy2Count = 0;
    enemy3Count = 0;
    bullet1Count = 0;
    bullet2Count = 0;
    bullet3Count = 0;
    c_enemy1CD = 700;
    //500 50
    //5000 200
    //1500 150
    c_enemy2CD = 4000;
    c_enemy3CD = 5000;
    dustCD = c_dustCD;
    dustCDS = c_dustCDS;
    enemy1CD = c_enemy1CD;
    enemy2CD = c_enemy2CD;
    enemy3CD = c_enemy3CD;
    bullet1CD = c_bullet1CD;
    dustBigArray = [];
    dustSmallArray = [];
    enemy1Array = [];
    enemy2Array = [];
    enemy3Array = [];
    bullet1Array = [];
    bullet2Array = [];
    bullet3Array = [];
    deadEnemy1Array = [];
    deadEnemy2Array = [];
    deadEnemy3Array = [];
    gamePause = 0;
    plr.x = 368;
    plr.y = 504;
    playerDead = 0;
    playerFlashing = 1;
    whiteoutOpacity = 1;
    heat = 0;
    overheat = 0;
    blackinOpacity = 0;
    gameoverOpacity = 0;
    playerScore = 0;
    killCount = 0;

    window.requestAnimationFrame(drawing);
    isReset = 0;
}

init();