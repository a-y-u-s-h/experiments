let preload_state = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: 
  function Preload () {
    Phaser.Scene.call(this, {key: 'Preload'});
  },
  preload: ()  => {
    // Preload images for this state.
  }

  create: ()  => {
    console.log("Preload");
    game.scene.start("MainMenu");
  }

  update: ()  => {
    
  }
});

myGame.scenes.push(preload_state);