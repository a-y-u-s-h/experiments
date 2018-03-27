let main_menu_state = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: 
  function Preload () {
    Phaser.Scene.call(this, {key: 'MainMenu'});
  },
  preload: ()  => {
    // Preload images for this state.
  }

  create: ()  => {
    console.log("MainMenu");
    game.scene.start("MainMenu");
  }

  update: ()  => {
    
  }
});

myGame.scenes.push(main_menu_state);