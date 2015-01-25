var BasicGame = {};

BasicGame.Boot = function (game) {

	
};

BasicGame.Boot.prototype = {

    init: function () {

        //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
        this.input.maxPointers = 1;

        //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            //  If you have any desktop specific settings, they can go in here
            this.scale.pageAlignHorizontally = true;
        }
        else
        {
            //  Same goes for mobile settings.
            //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
        }

    },

    preload: function () {

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
		this.load.atlasJSONHash('loading', 'assets/title.png', 'assets/title.json');

        this.load.image('tiles', 'tilemaps/tiles.png');
        this.load.image('bleft', 'assets/butterLeft.png', 32, 32);
        this.load.image('bright', 'assets/butterRight.png', 32, 32);
        this.load.image('bmiddle', 'assets/butterMiddle.png', 32, 32);
        this.load.image('fbleft', 'assets/ice_butter/ice_butter_left.png', 32, 32);
        this.load.image('fbright', 'assets/ice_butter/ice_butter_right.png', 32, 32);
        this.load.image('fbmiddle', 'assets/ice_butter/ice_butter_middle.png', 32, 32);

        this.load.image('menuScreen', 'assets/startScreen/startScreenBg.png');
        this.load.image('menuAnyKey', 'assets/startScreen/anyKeyText.png');

        this.load.image('deadScreen', 'assets/deadScreen/deadScreenBg.png');
        this.load.image('deadAnyKey', 'assets/deadScreen/tryAgainText.png');

        this.load.atlasJSONHash('chick1', 'assets/chick1.png', 'assets/chick1.json');
		this.load.atlasJSONHash('chick2', 'assets/overburn.png', 'assets/overburn.json');
		this.load.atlasJSONHash('chick3', 'assets/roasted.png', 'assets/roasted.json');
		this.load.atlasJSONHash('chick4', 'assets/deadchick.png', 'assets/deadchick.json');

        this.load.atlasJSONHash('cubeice', 'assets/cubeice.png', 'assets/cubeice.json');
		this.load.atlasJSONHash('water', 'assets/watercup.png', 'assets/watercup.json');
		this.load.atlasJSONHash('gas', 'assets/gas.png', 'assets/gas.json');

        this.load.tilemap('level', 'tilemaps/level3.json', null, Phaser.Tilemap.TILED_JSON);


        this.load.audio('chirp1', 'sounds/cluck1.mp3');
		this.load.audio('chirp2', 'sounds/cluck2.mp3');
		this.load.audio('chirp3', 'sounds/cluck3.mp3');
		this.load.audio('success', 'sounds/success.mp3');
		this.load.audio('microwave', 'sounds/microwave.mp3');
		this.load.audio('dnb', 'sounds/background.mp3');


    },

    create: function () {

        //  By this point the preloader assets have loaded to the cache, we've set the game settings
		
		var title = this.add.sprite(0, 0, 'loading');
		title.animations.add('load');
		title.animations.play('load',24,true);

        //  So now let's start the real preloader going

        this.game.time.events.add(Phaser.Timer.SECOND * 2, this.gotoMainMenu, this);

    },
	
	gotoMainMenu: function () {
		this.game.state.start('MainMenu');
	}

};
