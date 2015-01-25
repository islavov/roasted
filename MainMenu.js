
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

        this.stage.backgroundColor = "#3f3f3f";
        this.map = this.add.tilemap("level");
        this.map.addTilesetImage("tiles");
        this.layer1 = this.map.createLayer("nonburning");
        this.layer2 = this.map.createLayer("burning");

        this.layer1.alpha = 0.0;
        this.layer2.alpha = 0.0;

        var sprite = this.add.sprite(0, 0, 'menuScreen');
        sprite.fixedToCamera = true;

        this.anykey = this.add.sprite(100, 240, 'menuAnyKey');
        this.anykey.alpha = 0;
        this.anykey.fixedToCamera = true;
        this.alphadirection = 1;


        this.world.setBounds(0, 0, 640, 7030);
        this.camera.setPosition(0, 7000);

        var that = this;
        originaCallback = this.game.input.keyboard.onDownCallback;
        this.game.input.keyboard.onDownCallback = function (e){
            that.game.input.keyboard.onDownCallback = originaCallback;
            that.startGame();
        }
    },


	update: function () {

        if (this.layer1.alpha < 0.6){
            this.layer1.alpha = this.layer1.alpha + 0.01
        }
        if (this.layer2.alpha < 0.6){
            this.layer2.alpha = this.layer2.alpha + 0.01
        }
        this.game.camera.y--;

		//	Do some nice funky main menu effect here

        if (this.alphadirection == 1){
            if (this.anykey.alpha >= 1){
                this.alphadirection = 0;
            }
            this.anykey.alpha = this.anykey.alpha + 0.05;
        }

        if (this.alphadirection == 0){
            if (this.anykey.alpha <= 0){
                this.alphadirection = 1;
            }
            this.anykey.alpha = this.anykey.alpha - 0.05;
        }


	},

	startGame: function () {

		//	And start the actual game
		this.state.start('Game');

	}

};
