
BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = {

    cursors: null,

    preload: function(){
        this.load.image('tiles', 'tilemaps/tiles.png', 64, 64);
        this.load.image('char', 'images/charmanderd.png', 64, 64);
        this.load.image('wood', 'images/wood.png', 64, 64);
        this.load.tilemap('level', 'tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    },

    create: function () {
        this.stage.backgroundColor = "#ffffff";
        this.map = this.add.tilemap("level");
        this.map.addTilesetImage("tiles");
        this.world.setBounds(0, 0, 1920, 1024);

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.nonburning = this.map.createLayer("nonburning");

        this.burning_blocks = this.game.add.group();

        this.map.createFromTiles(4, null, 'wood', 'burning', this.burning_blocks, {"customClass": burningBlock});
        this.map.setCollisionBetween(1, 40);


        this.player = this.add.sprite(64, this.world.height - 128, 'char');


        this.physics.arcade.enable(this.player);
	    this.physics.arcade.enable(this.nonburning);
	    this.physics.arcade.enable(this.burning_blocks);

        this.player.body.setSize(32, 32, 16, 16);
        this.player.body.bounce.y = 0.1;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;



        this.camera.follow(this.player);
        this.cursors = this.input.keyboard.createCursorKeys();

    },

    update: function () {
        this.physics.arcade.collide(this.player, this.burning_blocks, function(player, block){
            block.startBurn();
            player.body.blocked.down = player.body.touching.down;
        });
        this.physics.arcade.collide(this.player, this.nonburning);

        //  Reset the players velocity (movement)
        this.player.body.velocity.x = 0;

        if (this.cursors.left.isDown) {
            // //  Move to the left
            this.player.body.velocity.x = -450;
        }
        else if (this.cursors.right.isDown) {
            //  Move to the right
            this.player.body.velocity.x = 450;
        }

        //  Allow the player to jump if they are touching the ground.
        if (this.cursors.up.isDown && this.player.body.onFloor()) {
            this.player.body.velocity.y = -300;
        }
        if (this.cursors.down.isDown) {
            this.player.body.velocity.y = 350;
        }
    },

    render: function (){
        this.debug;
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
