import "phaser";

import TheEnd from "./scenes/the-end";
import Victory from "./scenes/victory";
import Game from "./scenes/level-1";
import Game2 from "./scenes/level-2";
import LandingScene from "./scenes/landing";

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
