
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
        this.load.image('tiles', 'tilemaps/tiles.png');
        this.load.image('bleft', 'assets/butterLeft.png', 32, 32);
        this.load.image('bright', 'assets/butterRight.png', 32, 32);
        this.load.image('bmiddle', 'assets/butterMiddle.png', 32, 32);
        this.load.image('fbleft', 'assets/ice_butter/ice_butter_left.png', 32, 32);
        this.load.image('fbright', 'assets/ice_butter/ice_butter_right.png', 32, 32);
        this.load.image('fbmiddle', 'assets/ice_butter/ice_butter_middle.png', 32, 32);
        this.load.atlasJSONHash('chick1', 'assets/chick1.png', 'assets/chick1.json');
		this.load.atlasJSONHash('chick2', 'assets/overburn.png', 'assets/overburn.json');
		this.load.atlasJSONHash('chick3', 'assets/roasted.png', 'assets/roasted.json');
		this.load.atlasJSONHash('chick4', 'assets/deadchick.png', 'assets/deadchick.json');
		this.load.atlasJSONHash('cubeice', 'assets/cubeice.png', 'assets/cubeice.json');
		this.load.atlasJSONHash('gas', 'assets/gas.png', 'assets/gas.json');
        this.load.tilemap('level', 'tilemaps/level3.json', null, Phaser.Tilemap.TILED_JSON);
		// this.load.audio('chirp1', 'sounds/cluck1.mp3');
		// this.load.audio('chirp2', 'sounds/cluck2.mp3');
		// this.load.audio('chirp3', 'sounds/cluck3.mp3');
    },

    create: function () {
        this.stage.backgroundColor = "#3f3f3f";
        this.map = this.add.tilemap("level");
        this.map.addTilesetImage("tiles");
        this.world.setBounds(0, 0, 640, 7030);
		
		// chirpLeft = game.add.audio('chirp1');
		// chirpRight = game.add.audio('chirp2');
		// chirpUp = game.add.audio('chirp3');
		
        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.nonburning = this.map.createLayer("nonburning");

        this.burning_blocks = this.game.add.group();
        this.powerups = this.game.add.group();

        this.map.createFromTiles(1, null, 'bleft', 'burning', this.burning_blocks, {"customClass": burningBlock});
        this.map.createFromTiles(2, null, 'bmiddle', 'burning', this.burning_blocks, {"customClass": burningBlock});
        this.map.createFromTiles(3, null, 'bright', 'burning', this.burning_blocks, {"customClass": burningBlock});
        this.map.setCollisionBetween(1, 40);

		this.player = new Player(this.game, 550, 0.1, -450, 0, this.world.height - 24);
		
		for( i=0; i<100; i++)
		{
			if ( i%2 == 0 )
			{
				var iceblock = new blockIce(this.game, this.game.world.randomX, this.game.world.randomY, "cubeice");
				this.powerups.add(iceblock);
			}
			else {
				var gastube = new gasTube(this.game, this.game.world.randomX, this.game.world.randomY, "gas");
				this.powerups.add(gastube);
			}
		}

	    this.physics.arcade.enable(this.nonburning);
	    this.physics.arcade.enable(this.burning_blocks);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.timerDisplay = this.game.add.text(0, 0, '',
            { font: "30pt Courier", fill: "#19cb65",
            stroke: "#119f4e", strokeThickness: 2 })
        this.timerDisplay.fixedToCamera = true;

    },

    update: function () {
        var that = this;
        this.physics.arcade.collide(this.player, this.burning_blocks, function(player, block){
            block.startBurn();
            player.body.blocked.down = player.body.touching.down;
        });
        this.physics.arcade.collide(this.player, this.nonburning);
        this.physics.arcade.collide(this.player, this.powerups, function(player, powerup){
            powerup.apply(that, player)
        });
		this.physics.arcade.collide(this.powerups, this.nonburning);
		//needs work
		this.physics.arcade.overlap(this.powerups, this.burning_blocks);

        this.player.updatePlayer(this.cursors);
        this.timerDisplay.setText(parseInt(this.player.lifespan / 1000) );
    },

    render: function (){
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
