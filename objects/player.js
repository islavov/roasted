Player = function (game, speed, bounce, velocity, xCord, yCord) {

    Phaser.Sprite.call(this, game, xCord, yCord, 'chick1');

    this.speed = speed;
    this.velocity = velocity;
    game.physics.arcade.enable(this);
	this.flag = false;
    this.lifespan = 30000;

    this.body.gravity.y = 730;
    this.body.bounce.set(0.1);
    this.body.tilePadding.set(32);
    this.anchor.setTo(.5, 1); //so it flips around its middle
    this.scale.x = -1;
    this.body.collideWorldBounds = true;

    game.add.existing(this);

    this.animations.add("burn");
    this.animations.play("burn", 24, true);

    game.camera.follow(this, Phaser.Camera.FOLLOW_PLATFORMER);
    this.lastPositionY = this.position.y;

};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.kill = function(){
    this.loadTexture('chick4');
    this.animations.add('dead');
    this.animations.play('dead', 16, true);
    this.lifespan = 0;
	microwave.play();
//    this.game.state.start('Game');

}

Player.prototype.updateSpeed = function(newSpeed) {
	this.speed = newSpeed;
	}
Player.prototype.updateLifespan = function(addLifespan) {
	this.lifespan += addLifespan;
		if(this.lifespan >= 30000) this.lifespan = 30000;
	}
Player.prototype.updateVelocity = function(newVelocity){
	this.velocity = newVelocity;
}
Player.prototype.updateFlag = function(){
	this.flag = !this.flag;
}	
Player.prototype.updatePlayer = function(cursors){
    this.updateState();
    if (this.lifespan <= 0){
        this.body.velocity.x = 0;
        return
    }

    this.movePlayer(cursors);
}

Player.prototype.updateState = function() {
	if (this.lifespan > 10000 && this.lifespan < 20000 && this.key != 'chick2')
	{
		this.loadTexture('chick2');
		this.animations.add('overburn');
		this.animations.play('overburn', 30, true);
	}
	else if ( this.lifespan > 0 && this.lifespan < 10000  && this.key != 'chick3' )
	{
		this.loadTexture('chick3');
		this.animations.add('roasted');
		this.animations.play('roasted', 60, true);
	}
}
Player.prototype.Flip = function (orientation) {
    this.scale.x = orientation; //facing default direction
}

Player.prototype.movePlayer = function (cursors) {

    //reset player velocity
    if (!this.flag) {
        this.body.velocity.x = 0;
    }

    if (cursors.left.isDown) {
        //  Move to the left
		chirpLeft.play();
		this.velocity *= -1;
        this.body.velocity.x = -this.speed;
        this.Flip(1);
		
    }
    else if (cursors.right.isDown) {
        //  Move to the right
		chirpRight.play();
        this.body.velocity.x = this.speed;
        this.Flip(-1);
    }
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && this.body.onFloor()) {
        this.body.velocity.y = -450;
		chirpUp.play();

    }
    if (this.lastPositionY > this.position.y){
        this.game.camera.follow(this, Phaser.Camera.FOLLOW_PLATFORMER);
        this.lastPositionY = this.position.y;
    }
    if (this.lastPositionY < this.position.y) {
        this.game.camera.unfollow();
    }
    if (this.game.camera.y && this.body.position.y > this.game.camera.view.y + this.game.camera.view.height){
        this.kill();
		microwave.play();
    }
}