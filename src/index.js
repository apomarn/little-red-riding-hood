import "phaser";

import TheEnd from "../assets/scenes/TheEnd.js";
import Victory from "../assets/scenes/Victory.js";
import Game from "../assets/scenes/game";
import Game2 from "../assets/scenes/game2.js";
import LandingScene from "../assets/scenes/LandingScene.js";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: [LandingScene, Game, Game2, Victory, TheEnd]
};

const game = new Phaser.Game(config);
