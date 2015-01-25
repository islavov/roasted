/**
 * Created by islavov on 1/24/15.
 */

burningBlock = function(game, x, y, key, frame){
    Phaser.Sprite.call(this, game, x, y, key, frame);
    game.physics.arcade.enable(this);

    this.initialKey = key;
    this.isBurning = false;
    this.resistent = false;
    this.body.immovable = true;
}

burningBlock.prototype = Object.create(Phaser.Sprite.prototype);
burningBlock.prototype.constructor = burningBlock;
burningBlock.prototype.startBurn = function(){
    if (!this.isBurning && !this.resistent){
        this.isBurning = true;
        this.game.time.events.add(Phaser.Timer.SECOND/6, this.kill, this);
    }

};


powerUp = function(game, x, y, key, frame){
    Phaser.Sprite.call(this, game, x, y, key, frame);
    game.physics.arcade.enable(this);

    this.body.immovable = true

}

powerUp.prototype = Object.create(Phaser.Sprite.prototype);
powerUp.prototype.constructor = powerUp;
powerUp.prototype.apply = function(game, player){

}
powerUp.prototype.revert = function(game, player){

}

blockIce = function(game, x, y, key, frame){
    powerUp.call(this, game, x, y, key, frame);
};


blockIce.prototype = Object.create(powerUp.prototype);
blockIce.prototype.constructor = powerUp;
blockIce.prototype.apply = function(game, player){
    this.kill();
    for (var bidx in game.burning_blocks.children){
        var child = game.burning_blocks.children[bidx];
        child.loadTexture("f" + child.key);
        child.resistent = true;
    }
    this.game.time.events.add(Phaser.Timer.SECOND * 10, this.revert, this, game, player);



}
blockIce.prototype.revert = function(game, player){
    for (var bidx in game.burning_blocks.children){
        var child = game.burning_blocks.children[bidx];
        child.loadTexture(child.initialKey);
        child.resistent = false;
    }
}
