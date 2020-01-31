
var AM = new AssetManager();
function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, scale, reverse) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
    this.scale = scale;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if (this.isDone()) {
        return;
    }
    this.elapsedTime += tick;
    var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
    var vindex = 0;
    if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
        index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
        vindex++;
    }
    while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
        index -= Math.floor(this.spriteSheet.width / this.frameWidth);
        vindex++;
    }

    var locX = x;
    var locY = y;
    var offset = vindex === 0 ? this.startX : 0;
    ctx.drawImage(this.spriteSheet,
                  index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
                  this.frameWidth, this.frameHeight,
                  locX, locY,
                  this.frameWidth * this.scale,
                  this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

// no inheritance
function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet, this.x, this.y);
};

Background.prototype.update = function () {
};

// inheritance
function Standing(game, spritesheet) {
    this.animation = new Animation(spritesheet, 0, 0, 400, 400, 0.2, 8, true, 0.4, false);
    this.speed = 100;
    this.ctx = game.ctx;
    Entity.call(this, game, 250, 617);
}

Standing.prototype = new Entity();
Standing.prototype.constructor = Standing;

Standing.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x > 250) 
        this.x = 250;
    Entity.prototype.update.call(this);
}

Standing.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

// inheritance
function Spin(game, spritesheet) {
    this.animation = new Animation(spritesheet, 0, 0, 244, 137,0.1, 32, true, 1, false);
    this.speed = 200;
    this.ctx = game.ctx;
    Entity.call(this, game, 880, 635);
}

Spin.prototype = new Entity();
Spin.prototype.constructor = Spin;

Spin.prototype.update = function () {
    this.x -= this.game.clockTick * this.speed;
    if (this.x > 0) this.x = 880;
    Entity.prototype.update.call(this);
}

Spin.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

function CatMoon(game, spritesheet) {
    this.animation = new Animation(spritesheet, 0, 0, 500, 380, 0.14, 10, true, 0.7, false);
    this.speed = 115;
    this.ctx = game.ctx;
    Entity.call(this, game, 0, -10);
}

CatMoon.prototype = new Entity();
CatMoon.prototype.constructor = CatMoon;

CatMoon.prototype.update = function () {
    //this.x += this.game.clockTick * this.speed + 2;
    if (this.x < 0){
        this.x = 0;
    }
    if (this.x < 1125){
        this.x += this.game.clockTick * this.speed;
    }
    if (this.x >= 1125){
        this.x -= this.game.clockTick * this.speed;
        this.speed = -100;
    }
    Entity.prototype.update.call(this);
}

CatMoon.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

// spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, scale, reverse
function KissPower(game, spritesheet) {
    this.animation = new Animation(spritesheet, 0, 0, 244, 162, 0.14, 6, true, 1, false);
    this.speed = 100;
    this.ctx = game.ctx;
    Entity.call(this, game, 10, 590);
}

KissPower.prototype = new Entity();
KissPower.prototype.constructor = KissPower;

KissPower.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x > 1) this.x = 1;
    Entity.prototype.update.call(this);
}

KissPower.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

function CatRun(game, spritesheet) {
    this.animation = new Animation(spritesheet, 0, 0, 243, 110, 0.1, 12, true, 0.9, false);
    this.speed = 150;
    this.ctx = game.ctx;
    Entity.call(this, game, 698, 190);
}

CatRun.prototype = new Entity();
CatRun.prototype.constructor = CatRun;

CatRun.prototype.update = function () {
    this.x -= this.game.clockTick * this.speed;
    if (this.x < -100) this.x = 698;
    Entity.prototype.update.call(this);
}

CatRun.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

function Jumping(game) {
    this.jumpAnimation = new Animation(AM.getAsset("./img/jump.png"), 0, 0, 302, 306, 0.2, 7, true, 0.8, false);
    this.walkAnimation = new Animation(AM.getAsset("./img/walk.png"), 0, 0, 302, 278, 0.2, 7, true, 0.8, false);
    this.speed = 50;
    this.ctx = game.ctx;
    this.jumping = false;
    this.walking = true;
    Entity.call(this, game, 0, 350);
}

Jumping.prototype = new Entity();
Jumping.prototype.constructor = Jumping;

Jumping.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.walking){ // walking
        if(this.walkAnimation.isDone()){
            console.log("done walk");
            // elapsedTime resets the 
            this.walkAnimation.elapsedTime = 0;
            this.jumping = true;
            this.walking = false;
        }
    } 
    if (this.jumping) {
        if (this.jumpAnimation.isDone()) {
            this.jumpAnimation.elapsedTime = 0;
            this.jumping = false;
            this.walking = true;
        }
        var jumpDistance = this.jumpAnimation.elapsedTime / this.jumpAnimation.totalTime;
        var totalHeight = 50;

        if (jumpDistance > 0.5)
            jumpDistance = 1 - jumpDistance;

        //var height = jumpDistance * 2 * totalHeight;
        var height = totalHeight*(-4 * (jumpDistance * jumpDistance - jumpDistance));
        this.y = 350 - height;
        this.x += 1;
    }
    if (this.x > 1125){
        this.x = 0; 
        this.y = 350;
    }
    Entity.prototype.update.call(this);
}

Jumping.prototype.draw = function () {
    console.log("here" + this.x);
    if (this.walking){ // walking
        this.walkAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    } else if (this.jumping) { // jumping
        this.jumpAnimation.drawFrame(this.game.clockTick, this.ctx, this.x + 3, this.y - 44);
    }
    Entity.prototype.draw.call(this);
}




AM.queueDownload("./img/background2.jpg");
AM.queueDownload("./img/kisspower1.png");
AM.queueDownload("./img/cat.png");
AM.queueDownload("./img/catRun.png");
AM.queueDownload("./img/spin.png");
AM.queueDownload("./img/standing.png");
AM.queueDownload("./img/walk.png");
AM.queueDownload("./img/jump.png");
AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/background2.jpg")));
    gameEngine.addEntity(new KissPower(gameEngine, AM.getAsset("./img/kisspower1.png")));
    gameEngine.addEntity(new CatMoon(gameEngine, AM.getAsset("./img/cat.png")));
    gameEngine.addEntity(new CatRun(gameEngine, AM.getAsset("./img/catRun.png")));
    gameEngine.addEntity(new Spin(gameEngine, AM.getAsset("./img/spin.png")));
    gameEngine.addEntity(new Standing(gameEngine, AM.getAsset("./img/standing.png")));
    gameEngine.addEntity(new Jumping(gameEngine));
    console.log("All Done!");
});
