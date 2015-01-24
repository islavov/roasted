var game = new Phaser.Game(640, 480, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
function preload() {
	
	
	game.load.atlasJSONHash('dude', 'assets/chick1.png', 'assets/chick1.json');
	game.load.image('strawberry', 'assets/strawberry.png');
	game.load.image('icecube', 'assets/icecube.jpg');
	game.load.tilemap('map', 'tilemaps/level2.json',null, Phaser.Tilemap.TILED_JSON);
	game.load.image('bricktile', 'tilemaps/rock.jpg');
	game.load.image('woodtile', 'tilemaps/tileswood.jpg');
	
	

}
var speed = 250;
var sprite;
var cursors;
var burning;
var nonburning;
var velocity=0;
var flag = false;;


var platforms;

function create() {
	
    player = new Player(game, 150, 0.5, -350, 0, 5000 );
	
	createMap();
	
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
	
    //  The powerups group contains the strawbery speed boost
	powerups = game.add.group();

    //  We will enable physics for any object that is created in this group

	powerups.enableBody=true;

	//create the strawberry
	strawberry = powerups.create(100 , 5000,'strawberry');
	icecube = powerups.create(400, 5000, 'icecube');
	
	game.physics.arcade.enable(this.burning);
	game.physics.arcade.enable(this.nonburning);

}

function createMap()
{
	
	
	//CreateMap
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
}
function update() {
	
	player.animations.play('burn',24,true);
     //  Collide the player and the stars with the platforms
      game.physics.arcade.collide(player, burning);
	  //game.camera.follow(player);
	  game.physics.arcade.collide(player, nonburning);
	
	 //collide with strawberry
	
	 game.physics.arcade.collide(player, strawberry, collisionHandler, null, this);
	 game.physics.arcade.collide(player, icecube, collisionIceHandler, null, this);
	
	//Moving the player
	 player.movePlayer(game.input.keyboard.createCursorKeys(),velocity, flag);
	
     
}

function collisionHandler (obj1, obj2) {

    //  The two sprites are colliding
	strawberry.body.velocity.y=300;

	player.setSpeed(800);
	timer = game.time.create(false);
	game.time.events.add(Phaser.Timer.SECOND * 5, updateSpeed, this);
}

function collisionIceHandler (obj1, obj2) {
	velocity = 200;
	
	flag = true;
	timer = game.time.create(false);
	game.time.events.add(Phaser.Timer.SECOND * 5, updateVelocity, this);
}
function updateSpeed(){

player.setSpeed(150);

}

function updateVelocity(){
	flag = false;
}
function render() {

    //game.debug.cameraInfo(game.camera, 32, 32);
    //game.debug.spriteCoords(player, 32, 500);
}
