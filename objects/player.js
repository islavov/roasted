Player = function (game, speed, bounce, velocity, xCord, yCord) {

    //  We call the Phaser.Sprite passing in the game reference
    //  We're giving it a random X/Y position here, just for the sake of this demo - you could also pass the x/y in the constructor
    Phaser.Sprite.call(this, game, xCord, yCord, 'chick');

    //this.anchor.setTo(0.5, 0.5);

    this.speed = speed;
    this.bounce = bounce;
    this.velocity = velocity;

    this.jumping = false;

    game.physics.arcade.enable(this);
    game.camera.follow(this);

    this.body.gravity.y = 400;
    this.body.mass = 12;
    this.body.collideWorldBounds = true;
    this.body.debug = true;

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

Player.prototype.Flip = function (orientation) {
    this.anchor.setTo(.5, 1); //so it flips around its middle
    this.scale.x = orientation; //facing default direction
}

Player.prototype.movePlayer = function (cursors) {

    //reset player velocity
    this.body.velocity.x = 0;
    var speed = this.speed;

    if (this.body.onFloor()){
        this.jumping = false;
    }


    if (cursors.left.isDown) {
        //  Move to the left
        this.body.velocity.x -= speed;
        this.Flip(1);
        //this.animations.play('left');
    }
    else if (cursors.right.isDown) {
        //  Move to the right
        this.body.velocity.x += speed;
        this.Flip(-1);

        //this.animations.play('right');
    }
    else {
        //  Stand still
        this.animations.stop();

        this.frame = 4;
    }
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && this.body.onFloor()) {
        this.body.velocity.y = -300;
        this.jumping = true;
    }

}

