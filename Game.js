
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
        this.load.tilemap('level', 'tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    },

    create: function () {
        this.stage.backgroundColor = "#ffffff";
        this.map = this.add.tilemap("level");
        this.map.addTilesetImage("tiles");
        this.world.setBounds(0, 0, 1920, 1024);

        this.physics.startSystem(Phaser.Physics.ARCADE);
        noburnlayer = this.map.createLayer("nonburning");
        burnlayer = this.map.createLayer("burning");


        this.sprite = this.add.sprite(this.world.top, this.world.left, 'char');
        this.sprite.anchor.set(0.5);
        this.physics.arcade.enable(this.sprite);
        this.sprite.body.setSize(32, 32, 16, 16);

        //  We'll set a lower max angular velocity here to keep it from going totally nuts
        this.sprite.body.maxAngular = 500;

        //  Apply a drag otherwise the sprite will just spin and never slow down
        this.sprite.body.angularDrag = 50;

        this.camera.follow(this.sprite);
        this.cursors = this.input.keyboard.createCursorKeys();

    },

    update: function () {

        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;
        this.sprite.body.angularVelocity = 0;

        if (this.cursors.left.isDown)
        {
            this.sprite.body.angularVelocity = -300;
        }
        else if (this.cursors.right.isDown)
        {
            this.sprite.body.angularVelocity = 300;
        }

        if (this.cursors.up.isDown)
        {
            this.physics.arcade.velocityFromAngle(this.sprite.angle, 300, this.sprite.body.velocity);
        }
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

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
