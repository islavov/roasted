/**
 * Created by islavov on 1/24/15.
 */

burningBlock = function(game, x, y, key, frame){
    Phaser.Sprite.call(this, game, x, y, key, frame);
    game.physics.arcade.enable(this);

    this.isBurning = false;
    this.body.immovable = true;
}

burningBlock.prototype = Object.create(Phaser.Sprite.prototype);
burningBlock.prototype.constructor = burningBlock;
burningBlock.prototype.startBurn = function(){
    if (!this.isBurning){
        this.isBurning = true;
        this.game.time.events.add(Phaser.Timer.SECOND/6, this.kill, this);
    }

};
