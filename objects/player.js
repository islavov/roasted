Player = function (game, speed, bounce, velocity, xCord, yCord) {

    //  We call the Phaser.Sprite passing in the game reference
    //  We're giving it a random X/Y position here, just for the sake of this demo - you could also pass the x/y in the constructor
    Phaser.Sprite.call(this, game, xCord, yCord, 'dude');

    //this.anchor.setTo(0.5, 0.5);

    this.speed = speed;
	this.bounce = bounce;
	this.velocity = velocity;
	
	game.physics.arcade.enable(this);
	
	this.body.gravity.y = 300;
    this.body.collideWorldBounds = true;

	
    //this.animations.add('left', [0, 1, 2, 3], 10, true);
    //this.animations.add('right', [5, 6, 7, 8], 10, true);
	 
    game.add.existing(this);

};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

	
	 Player.prototype.getSpeed = function () {
	  return this.speed;
	}
	 Player.prototype.setSpeed = function (addSpeed) {
	  this.speed = addSpeed;	
	}
		
	 Player.prototype.getVelocity = function () {
	 return this.velocity;
	};
	
	Player.prototype.movePlayer = function (cursors) {
	
	//reset player velocity
	player.body.velocity.x = 0;
	
	 if (cursors.left.isDown)
	 {
		//  Move to the left
	 this.body.velocity.x -= this.speed;
	 this.Flip(1);
	 //this.animations.play('left');
	 }
	 else if (cursors.right.isDown)
	 {
	 //  Move to the right
	 this.body.velocity.x += this.speed;
	 this.Flip(-1);
	 //this.animations.play('right');
	 }
	 else
	 {
	 //  Stand still
	 this.animations.stop();
	
	 this.frame = 4;
	 }
	 //  Allow the player to jump if they are touching the ground.
	 if (cursors.up.isDown && player.body.onFloor())
	 {
	 this.body.velocity.y = -300;
	 }
	 if(cursors.down.isDown)
	 {
	 this.body.velocity.y=350;
	 }
	 Player.prototype.Flip=function(orientation){
	this.anchor.setTo(.5, 1); //so it flips around its middle
	this.scale.x = orientation; //facing default direction
	this.scale.x = orientation; //flipped
 }
	 }