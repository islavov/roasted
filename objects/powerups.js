PowerUp = function (game, xCord, yCord, name) {
    Phaser.Sprite.call(this, game, xCord, yCord, name);
	
	game.physics.arcade.enable(this);
	game.add.existing(this);

    this.animations.add("ice");
    this.animations.play("ice", 24, true);
	
    this.collided = false;
    this.body.immovable = true;
	}
	
PowerUp.prototype = Object.create(Phaser.Sprite.prototype);
PowerUp.prototype.constructor = PowerUp;

PowerUp.prototype.startBurn = function(){
    if (!this.collided){
        this.collided = true;
        this.game.time.events.add(Phaser.Timer.SECOND/10, this.kill, this);
    }

};
	