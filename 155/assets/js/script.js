let config =  {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: myGame.scenes
}

// Initiate the game with the config

let game =  new Phaser.Game(config);