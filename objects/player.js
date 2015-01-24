Player = function (game, speed, bounce, velocity, xCord, yCord) {

    Phaser.Sprite.call(this, game, xCord, yCord, 'chick');

    this.speed = speed;
    this.velocity = velocity;
    game.physics.arcade.enable(this);
    this.body.gravity.y = 300;
    this.body.bounce.set(0.1);
    this.body.tilePadding.set(32);
    this.body.collideWorldBounds = true;

    game.add.existing(this);
    this.animations.add("burn");
    this.animations.play("burn", 24, true);

    game.camera.follow(this, Phaser.Camera.FOLLOW_PLATFORMER);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;


Player.prototype.getSpeed = function () {
    return this.speed;
}
Player.prototype.setSpeed = function (addSpeed) {
    this.speed = addSpeed;
}
Player.prototype.setVelocity = function (velocity) {
    this.velocity.x = velocity;
}
Player.prototype.getVelocity = function () {
    return this.velocity;
};

Player.prototype.Flip = function (orientation) {
    this.anchor.setTo(.5, 1); //so it flips around its middle
    this.scale.x = orientation; //facing default direction
}

Player.prototype.movePlayer = function (cursors, velocity, flag) {

    //reset player velocity
    if (!flag) {
        this.body.velocity.x = 0;
    }

    if (cursors.left.isDown) {
        //  Move to the left
        velocity *= -1;
        this.body.velocity.x = -this.speed;
        this.Flip(1);
    }
    else if (cursors.right.isDown) {
        //  Move to the right
        this.body.velocity.x = this.speed;
        this.Flip(-1);
    }
    else {
        //  Stand still
        this.animations.stop();

        this.frame = 4;
    }
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && this.body.onFloor()) {
        this.body.velocity.y = -300;
    }
}