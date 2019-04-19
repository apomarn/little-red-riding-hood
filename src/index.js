import "phaser";

import TheEnd from "./scenes/the-end";
import Victory from "./scenes/victory";
import Level1 from "./scenes/level-1";
import Level2 from "./scenes/level-2";
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
  scene: [LandingScene, Level1, Level2, Victory, TheEnd]
};

const game = new Phaser.Game(config);
