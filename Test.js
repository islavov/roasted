var game = new Phaser.Game(640, 480, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
function preload() {

	game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	game.load.image('strawberry', 'assets/strawberry.png');
	game.load.tilemap('map', 'tilemaps/level2.json',null, Phaser.Tilemap.TILED_JSON);
	game.load.image('bricktile', 'tilemaps/tiles2.jpg');
	game.load.image('woodtile', 'tilemaps/tiles2_1.jpg');
	
	

}
var speed = 250;
var sprite;
var cursors;
var burning;
var nonburning;


var platforms;

function create() {
	//CreateMape
	game.stage.backgroundColor='#787878';
	map = game.add.tilemap('map');
	map.addTilesetImage('wood', 'woodtile');
	map.addTilesetImage('brick', 'bricktile');
	nonburning = map.createLayer('nonburning');
	burning = map.createLayer('burning');
	
	burning.resizeWorld();
	nonburning.resizeWorld();
	
	
	map.setCollisionBetween(1, 100000, true, 'burning');
	map.setCollisionBetween(1, 100000, true, 'nonburning');
	
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

	


    //  The powerups group contains the strawbery speed boost
	powerups = game.add.group();

    //  We will enable physics for any object that is created in this group

	powerups.enableBody=true;

	//create the strawberry
	strawberry = powerups.create(200, 336,'strawberry');
	
    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.1;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
	
	
	//camera to follow player
	game.camera.focusOnXY(player.x, player.y)
	
	
	 //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
	cursors = game.input.keyboard.createCursorKeys();
	
	
	
	game.physics.arcade.enable(this.burning);
	game.physics.arcade.enable(this.nonburning);

}
function update() {
     //  Collide the player and the stars with the platforms
     game.physics.arcade.collide(player, burning);
	 
	 game.physics.arcade.collide(player, nonburning);
	 cursors = game.input.keyboard.createCursorKeys();
	
	 //collide with strawbery
	
	 game.physics.arcade.collide(player, strawberry, collisionHandler, null, this);

	
	 //  Reset the players velocity (movement)
     player.body.velocity.x = 0;
 
     if (cursors.left.isDown)
     {
      // //  Move to the left
       player.body.velocity.x = -speed;
 
       player.animations.play('left');
     }
     else if (cursors.right.isDown)
     {
       //  Move to the right
       player.body.velocity.x = speed;
 
       player.animations.play('right');
     }
     else
     {
       //  Stand still
       player.animations.stop();
 
       player.frame = 4;
     }
    
     //  Allow the player to jump if they are touching the ground.
     if (cursors.up.isDown && player.body.onFloor())
     {
       player.body.velocity.y = -300;
	 }
	 if(cursors.down.isDown)
	 {
		player.body.velocity.y=350;
	 }
	
}

function collisionHandler (obj1, obj2) {

    //  The two sprites are colliding
	strawberry.body.velocity.y=300;

	speed = 500;
	timer = game.time.create(false);
	game.time.events.add(Phaser.Timer.SECOND * 5, updateSpeed, this);

	
}
function updateSpeed(){
speed = 150;
}

function render() {

    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 500);
}
